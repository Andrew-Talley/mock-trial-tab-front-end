import React, { useMemo, useState, useEffect, useReducer } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  ModalFooter,
} from "reactstrap";
import { Column } from "react-table";
import { DataTable } from "../data-table";
import {
  useGetAllTeamsQuery,
  TeamDataFragment,
} from "../../pages/tournament/[tournament]/teams/teams.generated";
import { useRoundStorage } from "./useRoundStorage";
import { useAssignRoundMutation } from "./assignRound.generated";

function teamLabel(team: TeamDataFragment) {
  return `${team.num} – ${team.name}`;
}

interface ColumnCellProps {
  availableTeams: number[];
  teams: Record<number, TeamDataFragment>;
  value: null | number;
  onChange: (newTeam: number) => void;
}
const ColumnCell: React.FC<ColumnCellProps> = ({
  availableTeams,
  teams,
  value,
  onChange,
}) => (
  <Input
    type="select"
    value={value}
    onChange={(e) => onChange(parseInt(e.target.value))}
  >
    <option value={value} selected disabled={value === null}>
      {value === null ? "Select Team..." : teamLabel(teams[value])}
    </option>
    {availableTeams.map((team) => (
      <option key={team} value={team}>
        {teamLabel(teams[team])}
      </option>
    ))}
  </Input>
);

interface AssignRoundsModalProps {
  children: React.ReactNode;
  tournamentId: string;
  roundNum: number;
}
export const AssignRoundsModal: React.FC<AssignRoundsModalProps> = ({
  children,
  tournamentId,
  roundNum,
}) => {
  const [isOpen, setOpen] = useState(false);

  const [{ data, error, fetching }] = useGetAllTeamsQuery({
    variables: {
      tournamentId,
    },
  });

  const [{ error: assignmentError }, assignMatchups] = useAssignRoundMutation();

  const teams = data?.tournament.teams;
  const teamsObject = Object.fromEntries(
    teams?.map((team) => [team?.num, team]) || []
  );

  const { matchups, updateRound, availableTeams } = useRoundStorage(teams);

  const columns = useMemo<Column[]>(
    () => [
      {
        Header: "π",
        accessor: "pl",
        Cell: ({ value, row }) => (
          <ColumnCell
            value={value}
            teams={teamsObject}
            availableTeams={availableTeams}
            onChange={(teamNum) => updateRound(row.index, "pl", teamNum)}
          />
        ),
      },
      {
        Header: "∆",
        accessor: "def",
        Cell: ({ value, row }) => (
          <ColumnCell
            value={value}
            teams={teamsObject}
            availableTeams={availableTeams}
            onChange={(teamNum) => updateRound(row.index, "def", teamNum)}
          />
        ),
      },
    ],
    [availableTeams]
  );

  const submitRound = () => {
    assignMatchups({
      tournamentId,
      matchups,
    }).then(() => {
      setOpen(false);
    });
  };

  const allRoundsAssigned = matchups.every((r) => r.pl && r.def);

  return (
    <React.Fragment>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal isOpen={isOpen} toggle={() => setOpen(false)}>
        <ModalHeader>Assign Round {roundNum}</ModalHeader>
        <ModalBody>
          {error ? (
            <span className="text-danger">{error.message}</span>
          ) : fetching ? (
            <>Loading...</>
          ) : (
            <React.Fragment>
              <DataTable columns={columns} data={matchups} />
            </React.Fragment>
          )}
        </ModalBody>
        <ModalFooter>
          {assignmentError?.message}
          <Button
            color="primary"
            disabled={!allRoundsAssigned}
            onClick={submitRound}
          >
            Save Round
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
