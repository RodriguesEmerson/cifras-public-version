

import { create } from "zustand";

type State = {
   isAvoidClickModalVisible: boolean;
   isSearchModalVisible: boolean;
   isCookiesConsentModalVisible: boolean;
}

type Actions = {
   setAvoidClickModalVisibility: (visibility: boolean) => void;
   setIsCookiesConsentModalVisibility: (visibility: boolean) => void;
   setSearchModalVisibility: (visibility: boolean) => void;
}

export const useGlobalModalsVisibility = create<State & Actions>((set) => ({
   isAvoidClickModalVisible: false,
   isSearchModalVisible: false,
   isCookiesConsentModalVisible: false,

   setAvoidClickModalVisibility: (visibility: boolean) => set(() => ({
      isAvoidClickModalVisible: visibility
   })),
   setSearchModalVisibility: (visibility: boolean) => set(() => ({
      isSearchModalVisible: visibility
   })),
   setIsCookiesConsentModalVisibility: (visibility: boolean) => set(() => ({
      isCookiesConsentModalVisible: visibility
   })),
}))