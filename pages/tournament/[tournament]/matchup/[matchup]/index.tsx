import React, { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { useGetMatchupInfoQuery } from "page-gql/matchup.generated";
import { DataTable } from "components/data-table";
import { Button } from "reactstrap";
import { AddBallotModal } from "components/add-ballot-modal/AddBallotModal";
import Link from "next/link";
import { AuthContext } from "helpers/auth";

const columns = [
  {
    Header: "Judge",
    accessor: (data) => data.judge.name,
    Cell: ({ value, row }) => (
      <Link
        href="/tournament/[tournament]/ballot/[ballot]"
        as={`/tournament/4177/ballot/${row.original.id}`}
      >
        <a>{value}</a>
      </Link>
    ),
  },
  {
    Header: "Status",
    accessor: "complete",
    Cell: ({ value }) => {
      return value ? "Completed" : "In progress";
    },
  },
  {
    Header: "Winner",
    accessor: "pd",
    Cell: ({ value, row }) => {
      if (!row.original.complete) return null;
      const winner = value > 0 ? "π" : value < 0 ? "∆" : "Tie";
      return `${winner} (+${Math.abs(value)})`;
    },
  },
];

const Matchup: NextPage = () => {
  const { matchup, tournament } = useRouter().query as Record<string, string>;
  const { teamNumber, admin } = useContext(AuthContext);

  const [{ data, fetching }] = useGetMatchupInfoQuery({
    variables: {
      tournament,
      matchup,
    },
  });

  const matchupData = data?.tournament.matchup;

  const plTeam = matchupData?.pl.team;
  const defTeam = matchupData?.def.team;

  const title = `Round ${matchupData?.roundNum}: Team ${plTeam?.num} (π) vs. Team ${defTeam?.num} (∆)`;

  const isPl = plTeam?.num === teamNumber;
  const isDef = defTeam?.num === teamNumber;
  const canView = isPl || isDef || admin;

  const side = isPl ? "PL" : "DEF";

  return (
    <React.Fragment>
      {fetching ? (
        "Loading..."
      ) : !canView ? (
        "Sorry, you cannot view this matchup"
      ) : (
        <>
          <Head>
            <title>
              {plTeam?.num} vs. {defTeam?.num}
            </title>
          </Head>
          <h1>{title}</h1>
          <Link
            href="/tournament/[tournament]/matchup/[matchup]/captains/[SIDE]"
            as={`/tournament/${tournament}/matchup/${matchup}/captains/${side}`}
          >
            <a>
              <h4 className="my-4">Witness Calls</h4>
            </a>
          </Link>
          <Link
            href="/tournament/[tournament]/matchup/[matchup]/roles/[SIDE]"
            as={`/tournament/${tournament}/matchup/${matchup}/roles/${side}`}
          >
            <a>
              <h4 className="my-4">Student Roles</h4>
            </a>
          </Link>
          <h3>Ballots</h3>
          <DataTable
            columns={columns}
            data={data?.tournament.matchup.ballots}
            noDataIndicator={<div>No ballots assigned</div>}
          />
          {admin && (
            <AddBallotModal matchup={matchup}>
              <Button className="mt-4">Assign Ballot</Button>
            </AddBallotModal>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Matchup;
