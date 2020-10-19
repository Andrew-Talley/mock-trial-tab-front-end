import { ExamType, Role, Side } from "generated/graphql";
import { OPP_SIDE } from "helpers/opp-side";
import { useWitnessInfo } from "helpers/useWitnessInfo";
import { BallotContext } from "pages/tournament/[tournament]/ballot/[ballot]/[page]";
import { useContext } from "react";
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

function useGetExamLabel({ witnessNum, side, role, type }: ExamPanelProps) {
  const { matchup } = useContext(BallotContext);
  const caseInChiefSide =
    role === Role.Attorney && type === ExamType.Cross ? OPP_SIDE[side] : side;
  const { info, fetching, error } = useWitnessInfo(
    caseInChiefSide,
    witnessNum,
    matchup
  );

  return fetching
    ? "Loading..."
    : error
    ? "Error loading student"
    : role === Role.Witness
    ? `${info.witnessName} (${info.student?.name})`
    : type === ExamType.Direct
    ? info.director?.student?.name
    : info.crosser?.student?.name;
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
  const studentName = useGetExamLabel(props);

  return (
    <NoteBallotPanel side={side}>
      <h4 className={side === Side.Def ? "text-white" : undefined}>
        {labelForExam(role, type)}
      </h4>
      <h6
        {...(side === Side.Def
          ? { style: { color: "#f4f4f4" } }
          : { className: "text-secondary" })}
      >
        {studentName}
      </h6>
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
