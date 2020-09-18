import React, { useEffect } from "react";
import { Side } from "../../generated/graphql";
import { BallotScore } from "./BallotScore";
import styled from "styled-components";
import { SingleWitness } from "./SingleWitness";
import { BALLOT_OFFSETS } from "./ballotOffsets";
import { useTrackValidity } from "./useTrackValidity";

const CaseInChiefHeader = styled.h5<{ row: number }>`
  grid-row: ${(props) => props.row};
  grid-column-start: 2;
  grid-column-end: 4;
  text-align: center;
  text-transform: uppercase;
`;

const caseInChiefText: Record<Side, string> = {
  [Side.Pl]: "Pl./Pros. Case-in-chief",
  [Side.Def]: "Defense Case-in-chief",
};

const witnesses = Array.from(new Array(3), (_, i) => i + 1);

interface CaseInChiefProps {
  caseInChiefSide: Side;
  ballotSide: Side;
  onValidityChanged: (value: boolean) => void;
}
export const CaseInChief: React.FC<CaseInChiefProps> = ({
  caseInChiefSide,
  ballotSide,
  onValidityChanged,
}) => {
  const [valid, updateValid] = useTrackValidity();
  useEffect(() => {
    onValidityChanged(valid);
  }, [valid]);

  const isDirecting = caseInChiefSide === ballotSide;
  const headerRow =
    ballotSide === Side.Pl
      ? BALLOT_OFFSETS.startOfPlCaseInChief
      : BALLOT_OFFSETS.startOfDefCaseInChief;

  return (
    <React.Fragment>
      {isDirecting && (
        <CaseInChiefHeader row={headerRow} className="pt-0 mt-auto mb-0">
          {caseInChiefText[ballotSide]}
        </CaseInChiefHeader>
      )}
      {witnesses.map((wit, ind) => (
        <SingleWitness
          key={wit}
          caseInChief={caseInChiefSide}
          ballotSide={ballotSide}
          witnessNum={wit}
          onValidityChanged={updateValid(ind)}
        />
      ))}
    </React.Fragment>
  );
};
