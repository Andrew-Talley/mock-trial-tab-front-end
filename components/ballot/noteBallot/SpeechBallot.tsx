import { Scalars, Speech, Side, Role, AttorneyRole } from "generated/graphql";
import { Notes } from "./Notes";
import { useSpeechScore } from "../useScores";
import { BallotScore } from "../BallotScore";
import { NoteBallotPanel } from "./NoteBallotPanel";
import { useSpeechNotes } from "./useNotes";
import { useGetAttorneyQuery } from "../ballot.generated";
import { useContext } from "react";
import { BallotContext } from "pages/tournament/[tournament]/ballot/[ballot]/[page]";
import { sideSymbol } from "helpers/enumsToString";

interface SpeechNotesProps {
  side: Side;
  speech: Speech;
}
export const SpeechNotes: React.FC<SpeechNotesProps> = ({ side, speech }) => {
  const [notes, setNotes] = useSpeechNotes(side, speech);

  return <Notes notes={notes} onChange={setNotes} />;
};

const ROLE_FOR_SPEECH: Record<Speech, AttorneyRole> = {
  [Speech.Opening]: AttorneyRole.Opener,
  [Speech.Closing]: AttorneyRole.Closer,
};

interface SingleSpeechProps {
  speech: Speech;
  side: Side;
}
const SingleSpeech: React.FC<SingleSpeechProps> = ({ speech, side }) => {
  const { tournament, matchup } = useContext(BallotContext);
  const { score, onChange } = useSpeechScore(side, speech);
  const [{ data, fetching, error }] = useGetAttorneyQuery({
    variables: {
      tournament,
      matchup,
      side,
      role: ROLE_FOR_SPEECH[speech],
    },
  });

  const nameMessage = error
    ? "Failed to load name"
    : !data || fetching
    ? "Loading..."
    : data.tournament.matchup.team.attorney?.student?.name;

  return (
    <NoteBallotPanel side={side}>
      <h3>
        {sideSymbol[side]} - {nameMessage}
      </h3>
      <div>
        <span className="mr-2">Score:</span>
        <BallotScore score={score} onChange={onChange} row={1} />
      </div>
      <SpeechNotes side={side} speech={speech} />
    </NoteBallotPanel>
  );
};

interface SpeechBallotProps {
  speech: Speech;
}
export const SpeechBallot: React.FC<SpeechBallotProps> = ({ speech }) => {
  return (
    <div>
      <h1 className="text-center">
        {speech === Speech.Opening
          ? "Opening Statements"
          : "Closing Statements"}
      </h1>
      <div className="d-flex">
        <SingleSpeech side={Side.Pl} speech={speech} />
        <SingleSpeech side={Side.Def} speech={speech} />
      </div>
    </div>
  );
};
