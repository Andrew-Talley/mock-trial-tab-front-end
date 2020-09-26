import styled from "styled-components";
import { InputHTMLAttributes } from "react";

export const ScoreCellInput = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid black;
`;

type ScoreCellProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  score: number | "";
  onChange: (newScore: number) => void;
};
export const ScoreCell: React.FC<ScoreCellProps> = ({
  score,
  onChange,
  ...props
}) => (
  <ScoreCellInput
    {...props}
    min={0}
    max={10}
    type="number"
    value={score}
    onChange={(e) => onChange(e.target.valueAsNumber)}
  />
);
