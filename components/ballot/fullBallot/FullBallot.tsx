import { Button } from "reactstrap";
import { toast } from "react-toastify";
import styled from "styled-components";

import { BallotSide } from "components/ballot/fullBallot/BallotSide";
import { Side, Scalars } from "generated/graphql";
import { useTrackValidity } from "../useTrackValidity";
import { useCompleteBallotMutation } from "page-gql/ballot.generated";

const Ballot = styled.div`
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
