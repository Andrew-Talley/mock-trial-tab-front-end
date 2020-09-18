import { useRef, useReducer } from "react";

type ReducerType = (
  arr: boolean[],
  update: { index: number; value: boolean }
) => boolean[];

export function useTrackValidity(numBallot = 3, initialValue = false) {
  const initialArray = Array.from(new Array(numBallot), () => initialValue);

  const [values, updateValues] = useReducer<ReducerType>(
    (prev, { index, value }) => {
      if (prev[index] === value) {
        return prev;
      }
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    },
    initialArray
  );

  const updateValidity = (index: number) => (value: boolean) =>
    updateValues({ index, value });

  const isValid = values.every((v) => v);

  return [isValid, updateValidity] as const;
}
