import { BallotScore } from "../BallotScore";
import { Side, Role, ExamType } from "../../../generated/graphql";
import { sideSymbol } from "helpers/sideSymbol";
import { useExamScore } from "../useScores";

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
  const role = witness ? Role.Witness : Role.Attorney;
  const examType = direct ? ExamType.Direct : ExamType.Cross;
  const [score, onChange] = useExamScore(side, witnessNum, role, examType);

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
