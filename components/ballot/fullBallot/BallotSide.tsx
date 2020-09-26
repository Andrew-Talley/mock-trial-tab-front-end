import { Side, Speech } from "../../../generated/graphql";
import { BallotScore } from "../BallotScore";
import styled from "styled-components";
import { CaseInChief } from "./CaseInChief";
import { SpeechScore } from "./SpeechScore";
import { useTrackValidity } from "../useTrackValidity";
import { useEffect } from "react";

const StyledSide = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 50px auto minmax(0, 1fr);
  grid-auto-rows: 1fr;
  grid-row-gap: 0.5em;
  grid-column-gap: 0.5em;
`;
const SideHeader = styled.h4`
  grid-column: 3;
  text-transform: uppercase;
`;

const sideText: Record<Side, string> = {
  [Side.Pl]: "Plaintiff/Prosecution",
  [Side.Def]: "Defense",
};

interface BallotSideProps {
  side: Side;
  onValidityChanged: (value: boolean) => void;
}
export const BallotSide: React.FC<BallotSideProps> = ({
  side,
  onValidityChanged,
}) => {
  const closing = `${
    side === Side.Pl ? "Pl./Pros." : "Defense"
  } closing argument`;

  const [valid, updateValid] = useTrackValidity(4);
  useEffect(() => {
    onValidityChanged(valid);
  }, [valid]);

  return (
    <StyledSide className={`p-3 ${side === Side.Pl ? "" : "bg-info"}`}>
      <SideHeader>{sideText[side]}</SideHeader>
      <SpeechScore
        onValidityChanged={updateValid(0)}
        side={side}
        speech={Speech.Opening}
      >
        Opening Statement
      </SpeechScore>
      <CaseInChief
        onValidityChanged={updateValid(1)}
        ballotSide={side}
        caseInChiefSide={Side.Pl}
      />
      <CaseInChief
        onValidityChanged={updateValid(2)}
        ballotSide={side}
        caseInChiefSide={Side.Def}
      />
      <SpeechScore
        onValidityChanged={updateValid(3)}
        side={side}
        speech={Speech.Closing}
      >
        {closing}
      </SpeechScore>
    </StyledSide>
  );
};
