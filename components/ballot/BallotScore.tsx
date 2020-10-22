import styled from "styled-components";
import React, { useContext, useEffect, useRef } from "react";
import { ScoreCell } from "./ScoreCell";
import { BallotContext } from "pages/tournament/[tournament]/ballot/[ballot]/[page]";

interface ScoreCellProps {
  row: number;
}
const FullBallotScoreCell = styled(ScoreCell)<ScoreCellProps>`
  grid-row: ${(props) => props.row};
  grid-column: 2;
`;
const ScoreLabel = styled.div<ScoreCellProps>`
  grid-row: ${(props) => props.row};
  grid-column: 3;
`;

type OnValidityChangedType = (valid: boolean) => void | undefined;

interface BallotScoreProps {
  row: number;

  score: number | undefined;
  onChange: (newScore: number) => void;

  onValidityChanged?: OnValidityChangedType;
}
export const BallotScore: React.FC<BallotScoreProps> = ({
  row,
  children,
  score,
  onChange,
  onValidityChanged,
}) => {
  const isValid = typeof score === "number";
  const validityChangedRef = useRef<OnValidityChangedType>(onValidityChanged);
  useEffect(() => {
    validityChangedRef.current = onValidityChanged;
  }, [onValidityChanged]);

  useEffect(() => {
    validityChangedRef.current?.(isValid);
  }, [isValid]);

  const { canEdit } = useContext(BallotContext);

  return (
    <React.Fragment>
      <FullBallotScoreCell
        className="mt-2"
        row={row}
        score={score || ""}
        onChange={onChange}
        disabled={!canEdit}
      />
      <ScoreLabel className="mt-2" row={row}>
        {children}
      </ScoreLabel>
    </React.Fragment>
  );
};
