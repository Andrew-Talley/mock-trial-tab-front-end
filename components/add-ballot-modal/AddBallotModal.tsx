import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";

import {
  useBallotModalInfoQuery,
  useAssignBallotMutation,
} from "./ballotModalInfo.generated";
import { useRouter } from "next/router";
import { Scalars } from "../../generated/graphql";

interface AddBallotModalProps extends React.HTMLAttributes<HTMLDivElement> {
  matchup: Scalars["ID"];
  text?: React.ReactNode;
  children: React.ReactNode;
}
export const AddBallotModal: React.FC<AddBallotModalProps> = ({
  matchup,
  children,
  text = "Add Ballot",
  ...props
}) => {
  const router = useRouter();
  const { tournament } = router.query as Record<string, string>;

  const [isOpen, setOpen] = useState(false);

  const [selectedJudge, selectJudge] = useState("");

  const [{ data }] = useBallotModalInfoQuery({
    variables: {
      tournament,
    },
  });

  const [{ fetching }, assignJudge] = useAssignBallotMutation();

  const addBallot = () => {
    assignJudge({
      tournament,
      matchup,
      judge: selectedJudge,
    }).then(({ error }) => {
      if (!error) {
        setOpen(false);
        selectJudge("");
      }
    });
  };

  return (
    <React.Fragment>
      <div {...props} onClick={() => setOpen(true)}>
        {children}
      </div>
      <Modal isOpen={isOpen} toggle={() => setOpen(false)}>
        <ModalHeader>{text}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="judge">Judge</Label>
            <Input
              type="select"
              value={selectedJudge}
              onChange={(e) => selectJudge(e.target.value)}
            >
              <option disabled value="">
                Select Judge
              </option>
              {data?.tournament.judges.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={selectedJudge === "" || fetching}
            onClick={() => addBallot()}
          >
            {text}
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
