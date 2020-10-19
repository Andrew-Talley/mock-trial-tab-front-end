import { useDebugValue } from "react";
import {
  TeamInfoFragment,
  useStudentsByRoleQuery,
} from "./studentsByRole.generated";

function getTeamRoles(data?: TeamInfoFragment) {
  const attorneys = [data?.opener, data?.middle, data?.closer].filter((a) => a);
  const witnesses = [
    data?.firstWitness,
    data?.secondWitness,
    data?.thirdWitness,
  ]
    .map((s) => s?.student)
    .filter((a) => a);

  return { attorneys, witnesses };
}

export function useStudentsByRole(tournament: string, matchup: string) {
  const [{ data, ...props }] = useStudentsByRoleQuery({
    variables: {
      tournament,
      matchup,
    },
  });

  const matchupData = data?.tournament.matchup;

  const pl = getTeamRoles(matchupData?.pl);
  const def = getTeamRoles(matchupData?.def);

  const attorneys = [...pl.attorneys, ...def.attorneys];
  const witnesses = [...pl.witnesses, ...def.witnesses];

  useDebugValue({ pl, def });

  return { data: { attorneys, witnesses }, ...props };
}
