import { useRouter } from "next/router";
import { Side, Speech } from "generated/graphql";
import { BallotScore } from "../BallotScore";
import { useSpeechScore } from "../useScores";
import { BALLOT_OFFSETS } from "./ballotOffsets";

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

  const row =
    speech === Speech.Opening
      ? BALLOT_OFFSETS.openings
      : BALLOT_OFFSETS.closings;

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
