import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Button } from "reactstrap";
import { toast } from "react-toastify";

import { BallotSide } from "../../../../../components/ballot/BallotSide";
import { Side } from "../../../../generated/graphql";
import {
  useGetBallotInfoQuery,
  useCompleteBallotMutation,
} from "./ballot.generated";
import { useTrackValidity } from "../../../../../components/ballot/useTrackValidity";

const Ballot = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const BallotView: NextPage = () => {
  const { tournament, ballot } = useRouter().query as Record<string, string>;
  const [{ data, fetching }] = useGetBallotInfoQuery({
    variables: {
      tournament,
      ballot,
    },
  });

  const ballotData = data?.tournament.ballot;

  const [valid, updateValid] = useTrackValidity(2);

  const [_, complete] = useCompleteBallotMutation();

  const onFinish = () => {
    complete({
      tournament,
      ballot,
    }).then(({ error }) => {
      if (!error) {
        toast("Submitted! Feel free to move to a new page");
      } else {
        toast(`Something went wrong... ${error}`);
      }
    });
  };

  return (
    <React.Fragment>
      <h2 className="mb-5">
        {!data || fetching
          ? "Loading..."
          : `${ballotData.judge.name} judging ${ballotData.matchup.pl.teamNum} vs. ${ballotData.matchup.def.teamNum}`}
      </h2>
      <Ballot>
        <BallotSide onValidityChanged={updateValid(0)} side={Side.Pl} />
        <BallotSide onValidityChanged={updateValid(1)} side={Side.Def} />
      </Ballot>
      <div className="d-flex justify-content-center mt-3 mb-5">
        <Button color="primary" disabled={!valid} onClick={onFinish}>
          Submit Ballot
        </Button>
      </div>
    </React.Fragment>
  );
};
export default BallotView;
