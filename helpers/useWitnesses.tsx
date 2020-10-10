import { useState, useEffect, useMemo } from "react";
import { Side } from "generated/graphql";
import {
  useGetCurrentWitnessesQuery,
  useUpdateWitnessMutation,
} from "page-gql/captains.generated";

const BLANK_WITNESSES = ["", "", ""];
const BLANK_ORDER = [0, 0, 0];

export function useWitnesses(tournament: string, matchup: string, side: Side) {
  const [_, updateServerWitness] = useUpdateWitnessMutation();

  const [{ data, fetching }] = useGetCurrentWitnessesQuery({
    variables: {
      tournament,
      matchup,
      side,
    },
  });

  const [witnesses, setWitnesses] = useState<string[]>(BLANK_WITNESSES);
  const [order, setOrder] = useState<number[]>(BLANK_ORDER);

  const sideCallData = data?.tournament.matchup.team;
  const sideCall = useMemo(
    () =>
      sideCallData && [
        sideCallData.first,
        sideCallData.second,
        sideCallData.third,
      ],
    [sideCallData]
  );

  useEffect(() => {
    if (sideCall) {
      const newWitnesses = [...BLANK_WITNESSES];
      const newOrder = [...BLANK_ORDER];

      let openWitnessIndex = 0;
      sideCall.forEach((witness, order) => {
        if (witness?.witnessName) {
          newWitnesses[openWitnessIndex] = witness.witnessName;
          newOrder[openWitnessIndex] = order + 1;

          ++openWitnessIndex;
        }
      });

      setWitnesses(newWitnesses);
      setOrder(newOrder);
    }
  }, [sideCall]);

  useEffect(() => {
    if (sideCall) {
      witnesses.forEach((witness, ind) => {
        const trueOrder = order[ind];
        if (trueOrder !== 0) {
          const serverWitnessName = sideCall[trueOrder - 1].witnessName;
          if (serverWitnessName !== witness) {
            updateServerWitness({
              tournament,
              matchup,
              side,
              order: trueOrder,
              witness,
            });
          }
        }
      });
    }
  }, [sideCall, witnesses, order]);

  const changeWitness = (index: number, witness: string) => {
    const newWitnesses = [...witnesses];
    newWitnesses[index] = witness;
    setWitnesses(newWitnesses);
  };

  const changeOrder = (index: number, newOrder: number) => {
    const newOrderArr = [...order];
    const previousIndex = newOrderArr.indexOf(newOrder);
    if (previousIndex !== -1) {
      newOrderArr[previousIndex] = newOrderArr[index];
    }
    newOrderArr[index] = newOrder;
    setOrder(newOrderArr);
  };

  return { fetching, witnesses, order, changeWitness, changeOrder };
}
