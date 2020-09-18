import React, { useMemo } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Column } from "react-table";
import { DataTable } from "components/data-table";
import { useGetAllTeamsQuery } from "page-gql/teams.generated";
import Link from "next/link";
import { Button } from "reactstrap";
import { NewTeamModal } from "components/new-team-modal/new-team-modal";

const Teams: NextPage = () => {
  const { tournament } = useRouter().query;

  const [{ data, fetching, error }] = useGetAllTeamsQuery({
    variables: {
      tournamentId: tournament as string,
    },
  });

  const columns: Column[] = useMemo(
    () => [
      {
        Header: "Team #",
        accessor: "num",
        Cell: ({ value }) => (
          <Link
            href="/tournament/[tournament]/teams/[team]"
            as={`/tournament/${tournament}/teams/${value}`}
          >
            <a>{value}</a>
          </Link>
        ),
      },
      {
        Header: "Team Name",
        accessor: "name",
      },
      {
        Header: "Record",

        accessor: (data: any) => `${data.wins} - ${data.losses} - ${data.ties}`,
      },
    ],
    [tournament]
  );

  return (
    <React.Fragment>
      <h1>Teams</h1>
      <DataTable columns={columns} data={data?.tournament.teams} />
      <NewTeamModal>
        <Button color="primary">Add Team</Button>
      </NewTeamModal>
    </React.Fragment>
  );
};
export default Teams;
