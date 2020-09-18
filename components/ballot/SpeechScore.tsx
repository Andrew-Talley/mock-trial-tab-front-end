import { Side, Speech } from "../../generated/graphql";
import { BallotScore } from "./BallotScore";
import {
  useSpeechScoreQuery,
  useUpdateSpeechMutation,
} from "./ballot.generated";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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
  const { tournament, ballot } = useRouter().query as Record<string, string>;
  const [{ data }, refetch] = useSpeechScoreQuery({
    variables: {
      tournament,
      ballot,
      side,
      speech,
    },
  });

  const [score, setScore] = useState<number>();

  const gqlScore = data?.tournament.ballot.side.speech;

  useEffect(() => {
    setScore(gqlScore);
  }, [gqlScore]);

  const [_, update] = useUpdateSpeechMutation();

  const row = speech === Speech.Opening ? openingRow : closingRow;

  const onChange = (score: number) => {
    setScore(score);
    update({
      ballot,
      side,
      speech,
      score,
    }).then(() => refetch());
  };

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
