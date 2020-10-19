import { Side } from "generated/graphql";
import { useGetStudentsForSideQuery } from "./studentsForSide.generated";

export function useStudentsForSide(
  tournament: string,
  matchup: string,
  side: Side
) {
  const [{ data, fetching, error }] = useGetStudentsForSideQuery({
    variables: {
      tournament,
      matchup,
      side,
    },
  });

  const students = data?.tournament.matchup.team.team.students;

  return { students: students as typeof students | undefined, fetching, error };
}
