import React, { useMemo } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { useGetSchoolInfoQuery } from "page-gql/school.generated";
import { useTable, Column } from "react-table";
import { DataTable } from "components/data-table";
import { NewTeamModal } from "components/new-team-modal/new-team-modal";
import { Button } from "reactstrap";
import Link from "next/link";

const School: NextPage = () => {
  const { tournament, school } = useRouter().query;

  const [{ data, fetching, error }] = useGetSchoolInfoQuery({
    variables: {
      tournamentId: tournament as string,
      schoolName: school as string,
    },
  });

  const columns: Column[] = useMemo(
    () => [
      {
        Header: "Team Number",
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
    ],
    [tournament]
  );

  return (
    <React.Fragment>
      <h1 className="mb-4">{school}</h1>
      <h2>Teams</h2>
      <DataTable data={data?.tournament?.school?.teams} columns={columns} />
      <NewTeamModal initialSchool={school as string}>
        <Button color="primary">Add Team</Button>
      </NewTeamModal>
    </React.Fragment>
  );
};
export default School;
