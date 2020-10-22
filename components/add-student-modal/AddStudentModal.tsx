import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useAddStudentMutation } from "./addStudent.generated";

interface AddStudentModalProps {
  children: React.ReactNode;
  onAdded: () => void;
}
export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  children,
  onAdded,
}) => {
  const { tournament, team } = useRouter().query as Record<string, string>;
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState("");

  const [adding, setAdding] = useState(false);
  const [_, addStudent] = useAddStudentMutation();

  const onSubmit = () => {
    setAdding(true);
    addStudent({
      tournament,
      team: parseInt(team),
      name,
    })
      .then(() => {
        onAdded();
        setName("");
        setOpen(false);
      })
      .finally(() => setAdding(false));
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Modal isOpen={isOpen} toggle={() => setOpen(false)}>
        <ModalHeader>Add Student</ModalHeader>
        <ModalBody>
          <Label>Student Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit} disabled={adding}>
            Add Student
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
