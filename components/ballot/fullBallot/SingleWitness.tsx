import { Side } from "generated/graphql";
import React, { useContext, useEffect } from "react";
import { ExamScore } from "./ExamScore";
import { BALLOT_OFFSETS } from "./ballotOffsets";
import { useTrackValidity } from "../useTrackValidity";
import { useGetWitnessInfoQuery } from "page-gql/roles.generated";
import { BallotContext } from "pages/tournament/[tournament]/ballot/[ballot]/[page]";
import { useWitnessInfo } from "helpers/useWitnessInfo";

function getStart(witnessNum: number, caseInChief: Side) {
  const startOfCaseInChief =
    caseInChief === Side.Pl
      ? BALLOT_OFFSETS.startOfPlCaseInChief
      : BALLOT_OFFSETS.startOfDefCaseInChief;

  const numPrevWitnesses = witnessNum - 1;
  const prevWitnessesOffset = numPrevWitnesses * BALLOT_OFFSETS.witnessSize;

  return (
    startOfCaseInChief + prevWitnessesOffset + BALLOT_OFFSETS.caseInChiefTitle
  );
}

interface SingleWitnessProps {
  ballotSide: Side;
  caseInChief: Side;
  witnessNum: number;
  onValidityChanged: (valid: boolean) => void;
}
export const SingleWitness: React.FC<SingleWitnessProps> = ({
  caseInChief,
  ballotSide,
  witnessNum,
  onValidityChanged,
}) => {
  const { matchup } = useContext(BallotContext);
  const start = getStart(witnessNum, caseInChief);

  const isDirecting = caseInChief === ballotSide;

  const props = { side: ballotSide, witnessNum };

  const [isValid, onValidChange] = useTrackValidity(3, true);

  const witnessInfo = useWitnessInfo(caseInChief, witnessNum, matchup);

  useEffect(() => {
    onValidityChanged(isValid);
  }, [isValid]);

  return (
    <React.Fragment>
      {isDirecting ? (
        <React.Fragment>
          <ExamScore
            {...props}
            direct
            witness={false}
            info={witnessInfo}
            row={start}
            onValidityChanged={onValidChange(0)}
          />
          <ExamScore
            {...props}
            direct
            witness
            info={witnessInfo}
            row={start + 1}
            onValidityChanged={onValidChange(1)}
          />
          <ExamScore
            {...props}
            direct={false}
            witness
            info={witnessInfo}
            row={start + 2}
            onValidityChanged={onValidChange(2)}
          />
        </React.Fragment>
      ) : (
        <ExamScore
          {...props}
          direct={false}
          witness={false}
          info={witnessInfo}
          row={start}
          onValidityChanged={onValidChange(0)}
        />
      )}
    </React.Fragment>
  );
};
