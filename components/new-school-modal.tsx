import React, { useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { useAddSchoolMutation } from "../page-gql/schools.generated";
import { useRouter } from "next/router";

const NewSchoolModal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { tournament } = router.query;
  const [name, setName] = useState("");

  const [isOpen, setOpen] = useState(false);

  const [{ fetching, error }, newSchool] = useAddSchoolMutation();

  const addSchool = () => {
    newSchool({
      tournamentId: tournament as string,
      schoolName: name,
    }).then(({ data, error }) => {
      if (!error) {
        router.push(
          `/tournament/${tournament}/schools/${data?.addSchool.name}`
        );
      }
    });
  };

  return (
    <React.Fragment>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal isOpen={isOpen} toggle={() => setOpen(false)}>
        <ModalHeader>Add a New School</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="school-name">School Name</Label>
            <Input
              name="school-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-sm-50"
              disabled={fetching}
            />
          </FormGroup>
          {error && <span className="text-danger">{error.message}</span>}
          <Button onClick={() => addSchool()}>Add School</Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default NewSchoolModal;
