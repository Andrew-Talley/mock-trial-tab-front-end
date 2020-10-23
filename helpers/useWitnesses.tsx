import { useState, useEffect, useMemo } from "react";
import { Side } from "generated/graphql";
import {
  useGetCurrentWitnessesQuery,
  useUpdateWitnessMutation,
} from "page-gql/captains.generated";

const BLANK_WITNESSES = ["", "", ""];

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

      sideCall.forEach((witness, order) => {
        if (witness?.witnessName) {
          newWitnesses[order] = witness.witnessName;
        }
      });

      setWitnesses(newWitnesses);
    }
  }, [sideCall]);

  const changeWitness = (index: number, witness: string) => {
    const newWitnesses = [...witnesses];
    newWitnesses[index] = witness;
    setWitnesses(newWitnesses);
    updateServerWitness({
      tournament,
      matchup,
      side,
      order: index + 1,
      witness,
    });
  };

  return { fetching, witnesses, changeWitness };
}
