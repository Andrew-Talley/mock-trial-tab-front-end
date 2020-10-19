import { Button } from "reactstrap";
import { toast } from "react-toastify";
import styled from "styled-components";

import { BallotSide } from "components/ballot/fullBallot/BallotSide";
import { Side, Scalars, Role } from "generated/graphql";
import { useTrackValidity } from "../useTrackValidity";
import { useCompleteBallotMutation } from "page-gql/ballot.generated";
import { RoleAward } from "./individualAwards/RoleAward";
import { useStudentsByRole } from "helpers/useStudentsByRole";
import { useContext } from "react";
import { BallotContext } from "pages/tournament/[tournament]/ballot/[ballot]/[page]";

const EqualHalves = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

interface FullBallotProps {
  tournament: Scalars["ID"];
  ballot: Scalars["ID"];
}
export const FullBallot: React.FC<FullBallotProps> = ({
  tournament,
  ballot,
}) => {
  const { matchup } = useContext(BallotContext);
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

  const { data } = useStudentsByRole(tournament, matchup);

  return (
    <>
      <span>
        If your scores aren't appearing, try{" "}
        <a href="#" onClick={() => window.location.reload()}>
          reloading the page
        </a>
        .
      </span>
      <EqualHalves>
        <BallotSide onValidityChanged={updateValid(0)} side={Side.Pl} />
        <BallotSide onValidityChanged={updateValid(1)} side={Side.Def} />
      </EqualHalves>
      <h2 className="mt-5 text-center">Individual Awards</h2>
      <p>
        Please rank the top 4 witnesses and attorneys in the round, with 1 being
        the best, 2 being second best, etc.
      </p>
      <EqualHalves className="mt-2">
        <RoleAward role={Role.Attorney} options={data?.attorneys} />
        <RoleAward role={Role.Witness} options={data?.witnesses} />
      </EqualHalves>
      <div className="d-flex justify-content-center mt-3 mb-5">
        <Button color="primary" disabled={!valid} onClick={onFinish}>
          Submit Ballot
        </Button>
      </div>
    </>
  );
};
