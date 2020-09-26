import { useRouter } from "next/router";
import { Side, Speech } from "generated/graphql";
import { BallotScore } from "../BallotScore";
import { useSpeechScore } from "../useScores";

const openingRow = 2;

const offset = 1;
const sideTitle = 1;
const witness = 4;
const caseInChiefTitle = 1;
const caseInChief = caseInChiefTitle + 3 * witness;
const closingRow = offset + sideTitle + caseInChief * 2 + 1;

interface SpeechScoreProps {
  side: Side;
  speech: Speech;
  children: React.ReactNode;
  onValidityChanged: (valid: boolean) => void;
}
export const SpeechScore: React.FC<SpeechScoreProps> = ({
  side,
  speech,
  children,
  onValidityChanged,
}) => {
  const { score, onChange } = useSpeechScore(side, speech);

  const row = speech === Speech.Opening ? openingRow : closingRow;

  return (
    <BallotScore
      score={score}
      onChange={onChange}
      row={row}
      onValidityChanged={onValidityChanged}
    >
      {children}
    </BallotScore>
  );
};
