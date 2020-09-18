import styled from "styled-components";
import { Input } from "reactstrap";
import React, { useEffect, useMemo } from "react";

interface ScoreCellProps {
  row: number;
}
const ScoreCell = styled.input<ScoreCellProps>`
  grid-row: ${(props) => props.row};
  grid-column: 2;
  background: none;
  border: none;
  border-bottom: 1px solid black;
`;
const ScoreLabel = styled.div<ScoreCellProps>`
  grid-row: ${(props) => props.row};
  grid-column: 3;
`;

interface BallotScoreProps {
  row: number;
  children: React.ReactNode;

  score: number | undefined;
  onChange: (newScore: number) => void;

  onValidityChanged: (valid: boolean) => void;
}
export const BallotScore: React.FC<BallotScoreProps> = ({
  row,
  children,
  score,
  onChange,
  onValidityChanged,
}) => {
  const isValid = typeof score === "number";
  useEffect(() => {
    onValidityChanged(isValid);
  }, [isValid]);

  return (
    <React.Fragment>
      <ScoreCell
        className="mt-2"
        row={row}
        value={score || ""}
        min={0}
        max={10}
        type="number"
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
      <ScoreLabel className="mt-2" row={row}>
        {children}
      </ScoreLabel>
    </React.Fragment>
  );
};
