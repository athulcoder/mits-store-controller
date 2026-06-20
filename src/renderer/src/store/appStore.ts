import { create } from "zustand";
import { AppState } from "../types/app-state";

interface Store {

  state: AppState | null;

  setState: (
    state: AppState
  ) => void;

  initialize: () => Promise<void>;
}

export const useAppStore =
create<Store>((set) => ({

  state: null,

  setState: (state) =>
    set({ state }),

  initialize: async () => {

    const state =
      await window.api.getState();

    set({
      state
    });

    window.api.onStateUpdated(
      (newState) => {

        set({
          state: newState
        });
      }
    );
  }
}));