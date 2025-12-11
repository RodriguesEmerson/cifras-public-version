import { CifrasListsType } from "@/types/CifraListsTypes";
import { create } from "zustand";

type State = {
   storedCifrasData: {
      list: CifrasListsType[];
      count: number;
   } | null;

}

type Actions = {
   setStoredCifrasData: (list: CifrasListsType[], count: number) => void;
   clearStoredCifrasData: () => void;
}

export const useCifraListStorage = create<State & Actions>((set) => ({
   storedCifrasData: null,

   setStoredCifrasData: (list: CifrasListsType[], count: number) => set(() => ({
      storedCifrasData: {list: list, count: count}
   })),
   clearStoredCifrasData: () => set(() => ({
      storedCifrasData: null
   }))
   
}))