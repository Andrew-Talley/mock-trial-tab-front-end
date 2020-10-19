import { Side } from "generated/graphql";
import { useRouter } from "next/router";
import { useGetWitnessInfoQuery } from "page-gql/roles.generated";
import { OPP_SIDE } from "./opp-side";

export function useWitnessInfo(
  side: Side,
  witnessNum: number,
  matchup?: string
) {
  const query = useRouter().query as Record<string, string>;
  const { tournament } = query;
  const trueMatchup = matchup ?? query.matchup;

  const [{ data, ...passdownProps }] = useGetWitnessInfoQuery({
    variables: {
      tournament,
      matchup: trueMatchup,
      side,
      opposingSide: OPP_SIDE[side],
      witnessNum,
    },
  });

  const matchupInfo = data?.tournament.matchup;

  const info = {
    ...matchupInfo?.team.witness,
    director: matchupInfo?.team.attorney,
    crosser: matchupInfo?.oppTeam.attorney,
  };

  return {
    info,
    ...passdownProps,
  };
}

export type WitnessInfo = ReturnType<typeof useWitnessInfo>;
