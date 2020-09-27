import { Scalars, Speech, Side } from "generated/graphql";
import { Notes } from "./Notes";
import { useSpeechScore } from "../useScores";
import { BallotScore } from "../BallotScore";
import { NoteBallotPanel } from "./NoteBallotPanel";
import { useSpeechNotes } from "./useNotes";

interface SpeechNotesProps {
  side: Side;
  speech: Speech;
}
export const SpeechNotes: React.FC<SpeechNotesProps> = ({ side, speech }) => {
  const [notes, setNotes] = useSpeechNotes(side, speech);

  return <Notes notes={notes} onChange={setNotes} />;
};

interface SingleSpeechProps {
  speech: Speech;
  side: Side;
}
const SingleSpeech: React.FC<SingleSpeechProps> = ({ speech, side }) => {
  const { score, onChange } = useSpeechScore(side, speech);

  return (
    <NoteBallotPanel side={side}>
      <h3>{side === Side.Pl ? "π (Pl./Pros.)" : "∆ (Defense)"}</h3>
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
