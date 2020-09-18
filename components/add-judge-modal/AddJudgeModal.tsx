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

import { useCreateJudgeMutation } from "./createJudge.generated";

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

  const [{ fetching }, createJudge] = useCreateJudgeMutation();

  const addJudge = () => {
    createJudge({
      tournamentId,
      judgeName: judge,
    }).then(({ error }) => {
      if (!error) {
        setOpen(false);
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
            <Input value={judge} onChange={(e) => setJudge(e.target.value)} />
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
