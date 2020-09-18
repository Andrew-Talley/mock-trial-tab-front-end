import { TeamDataFragment } from "../../pages/tournament/[tournament]/teams/teams.generated";
import { useMemo, useReducer, useEffect } from "react";

interface Round {
  pl: number;
  def: number;
}
type TeamNumUpdate = {
  type: "teamNum";
  numTeams: number;
};
type AssignmentUpdate = {
  type: "assign";
  roundIndex: number;
  side: keyof Round;
  teamNum: number;
};
function roundReducer(prev: Round[], update: TeamNumUpdate | AssignmentUpdate) {
  switch (update.type) {
    case "teamNum":
      const numRounds = Math.ceil(update.numTeams / 2) || 0;
      const roundsArray = Array.from(new Array(numRounds), () => ({
        pl: null,
        def: null,
      }));
      return roundsArray;
    case "assign":
      const newArr = [...prev];
      newArr[update.roundIndex] = {
        ...newArr[update.roundIndex],
        [update.side]: update.teamNum,
      };
      return newArr;
  }
}

export function useRoundStorage(teams?: TeamDataFragment[]) {
  const numTeams = teams?.length;
  const [matchups, setMatchups] = useReducer<typeof roundReducer>(
    roundReducer,
    []
  );
  useEffect(() => {
    setMatchups({ type: "teamNum", numTeams });
  }, [numTeams]);

  const usedTeams = useMemo(
    () => new Set(matchups.flatMap((r) => [r.pl, r.def])),
    [matchups]
  );

  const availableTeams = useMemo(
    () => teams?.filter((t) => !usedTeams.has(t.num)).map((t) => t.num) || [],
    [teams, usedTeams]
  );

  function updateRound(
    roundIndex: number,
    side: "pl" | "def",
    teamNum: number
  ) {
    setMatchups({
      type: "assign",
      roundIndex,
      side,
      teamNum,
    });
  }

  return { matchups, updateRound, availableTeams };
}
