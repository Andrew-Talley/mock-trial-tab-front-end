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
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import {
  useBallotModalInfoQuery,
  useAssignBallotMutation,
} from "./ballotModalInfo.generated";
import { useRouter } from "next/router";
import { Scalars } from "../../generated/graphql";
import { toast } from "react-toastify";

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

  const [presiding, setPresiding] = useState(false);
  const [noteOnly, setNoteOnly] = useState(false);

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
      presiding,
      noteOnly,
    })
      .then(({ error }) => {
        if (!error) {
          setOpen(false);
          selectJudge("");
        }
      })
      .catch(() => {
        toast(
          `Error assigning the judge. They are likely already assigned a ballot this round.`,
          {
            type: "warning",
          }
        );
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
          <Row>
            <Col md={6}>
              <FormGroup check>
                <InputGroup onClick={() => setPresiding(true)}>
                  <Label check>
                    <Input type="radio" name="presiding" checked={presiding} />
                    Presiding Judge
                  </Label>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <InputGroup onClick={() => setPresiding(false)}>
                  <Label check>
                    <Input type="radio" name="presiding" checked={!presiding} />
                    Scoring Judge
                  </Label>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup check>
            <InputGroup>
              <Label check>
                <Input
                  type="checkbox"
                  checked={noteOnly}
                  onChange={(e) => setNoteOnly(e.target.checked)}
                />
                Note Only (Useful for presiding judges in rounds with uneven
                numbers of judges)
              </Label>
            </InputGroup>
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
