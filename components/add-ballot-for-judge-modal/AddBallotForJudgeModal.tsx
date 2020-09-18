import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";
import {
  useMatchupInfoQuery,
  MatchupDataFragment,
  useAssignJudgeMutation,
} from "./addJudgeBallot.generated";
import { useRouter } from "next/router";
import { DataTable } from "../data-table";
import { Column } from "react-table";

interface AddBallotForJudgeModalProps {
  roundNum: number;
  judgeId: string;
  children: React.ReactNode;
}
export const AddBallotForJudgeModal: React.FC<AddBallotForJudgeModalProps> = ({
  roundNum,
  judgeId,
  children,
}) => {
  const router = useRouter();
  const { tournament } = router.query as Record<string, string>;
  const [isOpen, setOpen] = useState(false);

  const [selectedMatchup, setSelectedMatchup] = useState("");

  const columns: Column<MatchupDataFragment>[] = [
    {
      Header: "Select",
      accessor: "id",
      Cell: ({ value }) => (
        <div className="form-check">
          <Input
            type="radio"
            checked={selectedMatchup === value}
            onChange={() => setSelectedMatchup(value)}
          />
        </div>
      ),
    },
    {
      Header: "Matchup",
      accessor: (data) => `${data.pl.teamNum} vs. ${data.def.teamNum}`,
    },
  ];

  const [{ data }] = useMatchupInfoQuery({
    variables: {
      tournamentId: tournament,
      roundNum,
    },
  });

  const [{}, dispatchAssignment] = useAssignJudgeMutation();

  const assign = () => {
    dispatchAssignment({
      tournamentId: tournament,
      matchupId: selectedMatchup,
      judgeId: judgeId,
    }).then(({ data }) => {
      const balId = data.assignJudgeToMatchup.id;
      router.push(
        `/tournament/[tournament]/ballot/[ballot]`,
        `/tournament/${tournament}/ballot/${balId}`
      );
    });
  };

  return (
    <React.Fragment>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal isOpen={isOpen} toggle={() => setOpen(false)}>
        <ModalHeader>Assign Ballot</ModalHeader>
        <ModalBody>
          <DataTable columns={columns} data={data?.tournament.round.matchups} />
        </ModalBody>
        <ModalFooter>
          <Button disabled={selectedMatchup === ""} onClick={assign}>
            Assign Ballot
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
