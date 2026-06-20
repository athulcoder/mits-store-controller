import { useEffect } from "react";
import { useAppStore } from "../store/appStore";

export function useInitializeApp() {

  const initialize =
    useAppStore(
      state => state.initialize
    );

  useEffect(() => {

    initialize();

  }, [initialize]);
}