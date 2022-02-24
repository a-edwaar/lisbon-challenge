import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Favourites } from "../types/favourites";

// useFavourites - hookup useState with localStorage
const useFavourites = (
  key = "faves"
): [Favourites, Dispatch<SetStateAction<Favourites>>] => {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return {};
    }
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : {};
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useFavourites;
