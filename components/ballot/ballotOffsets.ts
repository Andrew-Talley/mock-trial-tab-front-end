const title = 1;
const startOfPlCaseInChief = 3;
const caseInChiefTitle = 1;
const witnessSize = 4;
const caseInChief = caseInChiefTitle + 3 * witnessSize;
const startOfDefCaseInChief = startOfPlCaseInChief + caseInChief;
const closings = startOfDefCaseInChief + caseInChief;

export const BALLOT_OFFSETS = {
  title,
  startOfPlCaseInChief,
  caseInChiefTitle,
  witnessSize,
  startOfDefCaseInChief,
  closings,
};
