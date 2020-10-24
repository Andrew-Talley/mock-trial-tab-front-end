import React from "react";
import { useState } from "react";
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
  useCreateJudgeMutation,
  useSetEmailMutation,
} from "./createJudge.generated";

interface AddJudgeModalProps {
  tournamentId: string;
  children: React.ReactNode;
}
export const AddJudgeModal: React.FC<AddJudgeModalProps> = ({
  tournamentId,
  children,
}) => {
  const [isOpen, setOpen] = useState(false);

  const [judge, setJudge] = useState("");
  const [email, setEmail] = useState("");

  const [{ fetching }, createJudge] = useCreateJudgeMutation();
  const [_, assignEmail] = useSetEmailMutation();

  const addJudge = () => {
    createJudge({
      tournamentId,
      judgeName: judge,
    }).then(({ data, error }) => {
      if (!error) {
        if (email) {
          assignEmail({
            tournamentId,
            judgeId: data.addJudge.id,
            email,
          }).then(({ error }) => {
            if (!error) {
              setOpen(false);
            }
          });
        } else {
          setOpen(false);
        }
      }
    });
  };

  return (
    <React.Fragment>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal isOpen={isOpen} toggle={() => setOpen(false)}>
        <ModalHeader>Add Judge</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              value={judge}
              onChange={(e) => setJudge(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={fetching || judge === ""}
            onClick={addJudge}
          >
            Add Judge
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
