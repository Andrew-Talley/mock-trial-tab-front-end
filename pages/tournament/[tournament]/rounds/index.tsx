import React, { useState, CSSProperties, useMemo, useContext } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import { useGetRoundInfoQuery } from "page-gql/rounds.generated";
import { useRouter } from "next/router";
import { DataTable } from "components/data-table";
import { AssignRoundsModal } from "components/assign-rounds-modal/AssignRoundsModal";
import { Column } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faEye,
  faTrash,
  faColumns,
} from "@fortawesome/free-solid-svg-icons";
import { AddBallotModal } from "components/add-ballot-modal/AddBallotModal";
import Link from "next/link";
import { DeleteBallotModal } from "components/delete-ballot-modal/DeleteBallotModal";
import { AuthContext } from "helpers/auth";

const JudgeCell: React.FC<{ tournament: string; value: any }> = ({
  tournament,
  value,
}) =>
  value ? (
    <div className="d-flex">
      <Link
        href="/tournament/[tournament]/ballot/[ballot]"
        as={`/tournament/${tournament}/ballot/${value?.id}`}
      >
        <a className="mr-4">{value?.judge.name}</a>
      </Link>
      <DeleteBallotModal
        id={value?.id}
        onDelete={() =>
          refetch({
            requestPolicy: "network-only",
          })
        }
      >
        <a className="text-link" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faTrash} />
        </a>
      </DeleteBallotModal>
    </div>
  ) : null;

const rounds = Array.from(new Array(4), (_, ind) => ind + 1);
const pointerStyle: CSSProperties = { cursor: "pointer" };

const Rounds: React.FC = () => {
  const { tournament } = useRouter().query as Record<string, string>;

  const { admin } = useContext(AuthContext);

  const [round, setRound] = useState(1);

  const [{ data }, refetch] = useGetRoundInfoQuery({
    variables: {
      tournamentId: tournament,
    },
  });

  const tournamentRounds = data?.tournament.rounds;
  const roundInfo = useMemo(
    () =>
      Object.fromEntries(
        tournamentRounds?.map((round) => [round.roundNum, round.matchups]) || []
      ),
    [data]
  );

  const currentRound = roundInfo[round] || [];

  const numJudges = Math.max(...currentRound.map((r) => r.ballots?.length), 0);

  const judgeColumns = useMemo<Column<any>[]>(() => {
    if (numJudges === 0) return [];

    const sizedArray = Array.from(new Array(numJudges), (_, i) => i);

    const judgeColumns: Column<any>[] = sizedArray.flatMap((_, i) => [
      {
        Header: i === 0 ? "Judges" : "",
        id: i.toString(),
        accessor: (data) => data.ballots[i],
        Cell: ({ value }) => (
          <JudgeCell value={value} tournament={tournament} />
        ),
      },
    ]);
    judgeColumns.push({
      Header: "Add Judge",
      Cell: ({ row }) => (
        <AddBallotModal
          matchup={row.original.id}
          className="text-secondary text-center"
          style={{ cursor: "pointer" }}
          text="Assign Judge"
        >
          <FontAwesomeIcon size="lg" icon={faPlusCircle} />
        </AddBallotModal>
      ),
    });
    return judgeColumns;
  }, [numJudges]);

  const columns = useMemo(() => {
    const columns: Column<any>[] = [];
    if (admin) {
      columns.push({
        Header: "View",
        id: "view",
        Cell: ({ row }) => (
          <Link
            href="/tournament/[tournament]/matchup/[matchup]"
            as={`/tournament/${tournament}/matchup/${row.original.id}`}
          >
            <a>
              <FontAwesomeIcon icon={faEye} />
            </a>
          </Link>
        ),
      });
    }
    columns.push(
      ...[
        {
          Header: "π",
          accessor: (data) => `${data.pl.team.num} – ${data.pl.team.name}`,
        },
        {
          Header: "∆",
          accessor: (data) => `${data.def.team.num} – ${data.def.team.name}`,
        },
      ]
    );
    if (admin) {
      columns.push(...judgeColumns);
    }
    return columns;
  }, [judgeColumns, admin]);

  const hasMatchups = roundInfo?.[round]?.length > 0;
  const prevRoundHasMatchups =
    round === 1 || roundInfo?.[round - 1]?.length > 0;

  return (
    <React.Fragment>
      <h1>Rounds</h1>
      <Nav tabs>
        {rounds.map((r) => (
          <NavItem key={r}>
            <NavLink
              active={r === round}
              style={pointerStyle}
              onClick={() => setRound(r)}
            >
              Round {r}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent>
        <TabPane className="p-2">
          <h2>Round {round} Matchups</h2>
          {hasMatchups ? (
            <DataTable columns={columns} data={currentRound} />
          ) : !admin ? (
            <p>No matchups have been assigned for round {round} yet</p>
          ) : prevRoundHasMatchups ? (
            <AssignRoundsModal tournamentId={tournament} roundNum={round}>
              <Button color="primary">Assign Matchups</Button>
            </AssignRoundsModal>
          ) : (
            <p>Must assign previous rounds before assigning round {round}</p>
          )}
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};

export default Rounds;
