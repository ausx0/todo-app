import { createContext } from "react";
import { Ii18nContextProps } from "../interfaces";

export const I18nContext = createContext<Ii18nContextProps | undefined>(
  undefined
);
