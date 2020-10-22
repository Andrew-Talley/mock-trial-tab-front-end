import { createContext } from "react";

export type AuthContextType = {
  name: string | null;
  tournament: string | null;
  teamNumber: number | null;
  admin: boolean;
};
export const AuthContext = createContext<AuthContextType>({
  name: null,
  tournament: null,
  teamNumber: null,
  admin: false,
});
