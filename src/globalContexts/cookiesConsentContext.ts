
import { create } from "zustand";

type CookiesConsentDataType = {
   necessariesCookies: boolean;
   youtubeCookies: boolean;
   analyticsCookies: boolean;
   timestamp: number;
}

type State = {
   cookiesConsent: CookiesConsentDataType | null;
}

type Actions = {
   setCookiesConsent: (cookiesConsentData: CookiesConsentDataType) => void;
}

export const useCookiesConsentContext = create<State & Actions>((set) => ({
   cookiesConsent: null,

   setCookiesConsent: (cookiesConsentData: CookiesConsentDataType) => set(() => ({
      cookiesConsent: cookiesConsentData
   })),
}))