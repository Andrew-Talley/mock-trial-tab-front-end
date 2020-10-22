import { useDeleteBallotMutation } from "./deleteBallot.generated";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";

interface DeleteBallotModalProps {
  id: string;
  onDelete?: () => void;
  children: React.ReactNode;
}
export const DeleteBallotModal: React.FC<DeleteBallotModalProps> = ({
  id,
  onDelete: callback,
  children,
}) => {
  const [_, deleteBallot] = useDeleteBallotMutation();
  const [isOpen, setOpen] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const onDelete = () => {
    setDeleting(true);
    deleteBallot({
      ballot: id,
    })
      .then(({ error }) => {
        if (error) {
          throw error;
        }
        setOpen(false);
        callback?.();
      })
      .catch(() => {
        toast(
          `There was a problem removing the ballot. Try again in a few moments`,
          {
            type: "warning",
          }
        );
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const close = () => setOpen(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal isOpen={isOpen} toggle={close}>
        <ModalHeader>Delete Ballot</ModalHeader>
        <ModalBody>Are you sure you want to delete this ballot?</ModalBody>
        <ModalFooter>
          <Button disabled={deleting} onClick={close}>
            Cancel
          </Button>
          <Button color="danger" disabled={deleting} onClick={onDelete}>
            Delete Ballot
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
