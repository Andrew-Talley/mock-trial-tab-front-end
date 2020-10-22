import React, { useEffect, useMemo } from "react";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import styled from "styled-components";

import { useGetBallotInfoQuery } from "page-gql/ballot.generated";
import { FullBallot } from "components/ballot/fullBallot/FullBallot";
import { SpeechBallot } from "components/ballot/noteBallot/SpeechBallot";
import { useTrackRound } from "components/ballot/useTrackRound";
import { ExamBallot } from "components/ballot/noteBallot/ExamBallot";
import { route } from "next/dist/next-server/server/router";

interface BallotContextType {
  tournament: string;
  ballot: string;
  matchup: string | null;
  canEdit: boolean;
}
export const BallotContext = React.createContext<BallotContextType>({
  tournament: "",
  ballot: "",
  matchup: null,
  canEdit: false,
});

function saveCode(url?: string) {
  if (typeof sessionStorage !== "undefined" && url) {
    const params = new URL(url).searchParams;
    if (params.has("code")) {
      sessionStorage.setItem("code", params.get("code"));
    }
  }
}

const BallotView: NextPage = () => {
  const router = useRouter();
  const { tournament, ballot } = router.query as Record<string, string>;

  const url = typeof window === "undefined" ? undefined : window.location.href;
  useEffect(() => {
    saveCode(url);
  }, [url]);

  const canEdit =
    typeof sessionStorage === "undefined"
      ? false
      : !!sessionStorage.getItem("code");

  const [{ data, fetching }] = useGetBallotInfoQuery({
    variables: {
      tournament,
      ballot,
    },
  });

  const ballotData = data?.tournament.ballot;

  const ballotContextData = useMemo(
    () => ({
      tournament,
      ballot,
      matchup: ballotData?.matchup.id,
      canEdit,
    }),
    [tournament, ballot, ballotData?.matchup.id, canEdit]
  );

  const { nav, activeTab } = useTrackRound();

  return (
    <BallotContext.Provider value={ballotContextData}>
      <h2 className="mb-5">
        {!data || fetching
          ? "Loading..."
          : `${ballotData.judge.name} judging ${ballotData.matchup.pl.teamNum} vs. ${ballotData.matchup.def.teamNum}`}
      </h2>
      {nav}
      <div>
        {activeTab.type === "summary" ? (
          <FullBallot tournament={tournament} ballot={ballot} />
        ) : activeTab.type === "speech" ? (
          <SpeechBallot speech={activeTab.speech} key={activeTab.speech} />
        ) : activeTab.type === "exam" ? (
          <ExamBallot
            key={`${activeTab.side}-${activeTab.number}`}
            caseInChiefSide={activeTab.side}
            witnessNum={activeTab.number}
          />
        ) : (
          <h2>We ran into an error... try reloading the page</h2>
        )}
      </div>
    </BallotContext.Provider>
  );
};
export default BallotView;
