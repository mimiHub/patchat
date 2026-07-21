// src/hooks/useClickOutside.js
import { useEffect } from "react";

export function useClickOutside(ref, onOutsideClick, active = true) {
  useEffect(() => {
    if (!active) return;

    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onOutsideClick, active]);
}