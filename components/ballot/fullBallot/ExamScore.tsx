import { BallotScore } from "../BallotScore";
import { Side, Role, ExamType } from "../../../generated/graphql";
import { sideSymbol } from "helpers/enumsToString";
import { useExamScore } from "../useScores";
import { WitnessInfo } from "helpers/useWitnessInfo";

function getScoreLabel(
  witness: boolean,
  direct: boolean,
  { info }: WitnessInfo
) {
  if (witness) {
    return `${info?.witnessName} ${direct ? "DX" : "CX"} (${
      info?.student?.name
    })`;
  }

  if (direct) {
    return `Attorney DX of ${info?.witnessName} (${info?.director?.student?.name})`;
  }

  return `CX of ${info?.witnessName} (${info?.crosser?.student?.name})`;
}

interface ExamScoreProps {
  side: Side;
  direct: boolean;
  witness: boolean;
  witnessNum: number;

  info: WitnessInfo;

  row: number;
  onValidityChanged: (valid: boolean) => void;
}
export const ExamScore: React.FC<ExamScoreProps> = ({
  side,
  direct,
  witness,
  witnessNum,
  info,
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
      {getScoreLabel(witness, direct, info)}
    </BallotScore>
  );
};
