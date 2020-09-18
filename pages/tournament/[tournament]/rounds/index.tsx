import React, { useState, CSSProperties, useMemo } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import { useGetRoundInfoQuery } from "page-gql/rounds.generated";
import { useRouter } from "next/router";
import { DataTable } from "components/data-table";
import { AssignRoundsModal } from "components/assign-rounds-modal/AssignRoundsModal";
import { Column } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { AddBallotModal } from "components/add-ballot-modal/AddBallotModal";
import Link from "next/link";

const rounds = Array.from(new Array(4), (_, ind) => ind + 1);
const pointerStyle: CSSProperties = { cursor: "pointer" };

const Rounds: React.FC = () => {
  const { tournament } = useRouter().query as Record<string, string>;

  const [round, setRound] = useState(1);

  const [{ data }] = useGetRoundInfoQuery({
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

    return Array.from(new Array(numJudges), (_, i) => ({
      Header: i === 0 ? "Judges" : "",
      id: i.toString(),
      accessor: (data) => data.ballots[i]?.judge.name,
      Cell: ({ value, row }) => (
        <Link
          href="/tournament/[tournament]/ballot/[ballot]"
          as={`/tournament/${tournament}/ballot/${row.original.ballots[i]?.id}`}
        >
          <a>{value}</a>
        </Link>
      ),
    }));
  }, [numJudges]);

  const columns = useMemo<Column<any>[]>(
    () => [
      {
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
      },
      {
        Header: "π",
        accessor: (data) => `${data.pl.team.num} – ${data.pl.team.name}`,
      },
      {
        Header: "∆",
        accessor: (data) => `${data.def.team.num} – ${data.def.team.name}`,
      },
      ...judgeColumns,
      {
        Header: "Add Judge",
        Cell: ({ row }) => (
          <AddBallotModal
            matchup={row.original.id}
            className="text-secondary"
            style={{ cursor: "pointer" }}
            text="Assign Judge"
          >
            <FontAwesomeIcon size="lg" icon={faPlusCircle} />
          </AddBallotModal>
        ),
      },
    ],
    [judgeColumns]
  );

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
