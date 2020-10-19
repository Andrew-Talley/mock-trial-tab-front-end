import React, { useMemo } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

import { useGetBallotInfoQuery } from "page-gql/ballot.generated";
import { FullBallot } from "components/ballot/fullBallot/FullBallot";
import { SpeechBallot } from "components/ballot/noteBallot/SpeechBallot";
import { useTrackRound } from "components/ballot/useTrackRound";
import { ExamBallot } from "components/ballot/noteBallot/ExamBallot";

interface BallotContextType {
  tournament: string;
  matchup: string | null;
}
export const BallotContext = React.createContext<BallotContextType>({
  tournament: "",
  matchup: null,
});

const BallotView: NextPage = () => {
  const { tournament, ballot } = useRouter().query as Record<string, string>;
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
      matchup: ballotData?.matchup.id,
    }),
    [tournament, ballotData?.matchup.id]
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
