import { AttorneyRole, Side } from "../generated/graphql";

export const sideSymbol: Record<Side, string> = {
  [Side.Pl]: "π",
  [Side.Def]: "∆",
};

export const sideText: Record<Side, string> = {
  [Side.Pl]: "Pl./Pros.",
  [Side.Def]: "Defense",
};

export const attorneyRoleText: Record<AttorneyRole, string> = {
  [AttorneyRole.Opener]: "Opener",
  [AttorneyRole.Middle]: "Middle",
  [AttorneyRole.Closer]: "Closer",
};
