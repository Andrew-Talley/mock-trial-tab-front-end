import { BallotScore } from "./BallotScore";
import { Side, Role, ExamType } from "../../pages/generated/graphql";
import { sideSymbol } from "../../helpers/sideSymbol";
import { useExamScoreQuery, useUpdateExamMutation } from "./ballot.generated";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function getScoreLabel(
  side: Side,
  direct: boolean,
  witness: boolean,
  num: number
) {
  if (witness) {
    return `Witness #${num} ${direct ? "Direct" : "Cross"}`;
  }
  if (direct) {
    return `Direct Exam of ${sideSymbol[side]} #${num}`;
  }

  const witnessSide = side === Side.Pl ? Side.Def : Side.Pl;

  return `Cross Exam of ${sideSymbol[witnessSide]} #${num}`;
}

interface ExamScoreProps {
  side: Side;
  direct: boolean;
  witness: boolean;
  witnessNum: number;
  row: number;
  onValidityChanged: (valid: boolean) => void;
}
export const ExamScore: React.FC<ExamScoreProps> = ({
  side,
  direct,
  witness,
  witnessNum,
  row,
  onValidityChanged,
}) => {
  const { tournament, ballot } = useRouter().query as Record<string, string>;

  const [{ data }] = useExamScoreQuery({
    variables: {
      tournament,
      ballot,
      side,
      witnessNum,
      role: witness ? Role.Witness : Role.Attorney,
      type: direct ? ExamType.Direct : ExamType.Cross,
    },
  });

  const gqlScore = data?.tournament.ballot.side.exam;

  const [score, setScore] = useState<number>();
  useEffect(() => {
    setScore(gqlScore);
  }, [gqlScore]);

  const [_, updateExamScore] = useUpdateExamMutation();

  const onChange = (score: number) => {
    setScore(score);
    updateExamScore({
      ballot,
      side,
      witnessNum,
      witness,
      cross: !direct,
      score,
    });
  };

  return (
    <BallotScore
      onValidityChanged={onValidityChanged}
      score={score}
      onChange={onChange}
      row={row}
    >
      {getScoreLabel(side, direct, witness, witnessNum)}
    </BallotScore>
  );
};
