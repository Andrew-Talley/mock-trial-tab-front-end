import { ExamType, Role, Side } from "generated/graphql";
import { BallotScore } from "../BallotScore";
import { useExamScore } from "../useScores";
import { NoteBallotPanel } from "./NoteBallotPanel";
import { Notes } from "./Notes";
import { useExamNotes } from "./useNotes";

const ExamNotes: React.FC<ExamPanelProps> = ({
  witnessNum,
  side,
  role,
  type,
}) => {
  const [notes, setNotes] = useExamNotes(side, witnessNum, role, type);

  return <Notes notes={notes} onChange={setNotes} />;
};

function labelForExam(role: Role, type: ExamType) {
  const isCross = type === ExamType.Cross;
  const isWitness = role === Role.Witness;

  if (isWitness) {
    return `Witness (${isCross ? "Cross Examination" : "Direct Examination"})`;
  }

  if (isCross) {
    return `Crossing Attorney`;
  }

  return `Directing Attorney`;
}

interface ExamPanelProps {
  witnessNum: number;
  side: Side;
  role: Role;
  type: ExamType;
}
const ExamPanel: React.FC<ExamPanelProps> = (props) => {
  const { witnessNum, side, role, type } = props;

  const [score, setScore] = useExamScore(side, witnessNum, role, type);

  return (
    <NoteBallotPanel side={side}>
      <h4>{labelForExam(role, type)}</h4>
      <div>
        <span>Score: </span>
        <BallotScore score={score} onChange={setScore} row={1} />
      </div>
      <ExamNotes {...props} />
    </NoteBallotPanel>
  );
};

interface ExamBallotProps {
  caseInChiefSide: Side;
  witnessNum: number;
}
export const ExamBallot: React.FC<ExamBallotProps> = ({
  caseInChiefSide,
  witnessNum,
}) => {
  const crossingSide = caseInChiefSide === Side.Pl ? Side.Def : Side.Pl;

  return (
    <div>
      <h3>Witness #{witnessNum}</h3>
      <div className="d-flex flex-wrap">
        <ExamPanel
          side={caseInChiefSide}
          role={Role.Attorney}
          type={ExamType.Direct}
          witnessNum={witnessNum}
        />
        <ExamPanel
          side={caseInChiefSide}
          role={Role.Witness}
          type={ExamType.Direct}
          witnessNum={witnessNum}
        />
        <ExamPanel
          side={crossingSide}
          role={Role.Attorney}
          type={ExamType.Cross}
          witnessNum={witnessNum}
        />
        <ExamPanel
          side={caseInChiefSide}
          role={Role.Witness}
          type={ExamType.Cross}
          witnessNum={witnessNum}
        />
      </div>
    </div>
  );
};
