import { useEffect } from "react";

export function useKey(key, action) {
  //Listening to a key press globally
  useEffect(() => {
    const callback = (e) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [action, key]);
}
