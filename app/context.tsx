// context.tsx
import { createContext } from "react";
import type {
  ServerStyleContextData,
  ClientStyleContextData
} from "./types";

export const ServerStyleContext = createContext<ServerStyleContextData[] | null>(null);

export const ClientStyleContext = createContext<ClientStyleContextData | null>(null);
