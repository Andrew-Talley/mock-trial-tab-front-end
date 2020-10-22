import React, { useContext, useMemo } from "react";
import { NextPage } from "next";
import { Button } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTable, Column } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  useGetSchoolsQuery,
  GetSchoolsQuery,
} from "page-gql/schools.generated";
import { withMTUrqlClient } from "helpers/withMTUrqlClient";
import { DataTable } from "components/data-table";
import NewSchoolModal from "components/new-school-modal";
import { AuthContext } from "helpers/auth";

const Schools: NextPage = () => {
  const { tournament } = useRouter().query;

  const { admin } = useContext(AuthContext);

  const columns: Column<
    GetSchoolsQuery["tournament"]["schools"][number]
  >[] = useMemo(
    () => [
      {
        Header: "School",
        accessor: "name",
        Cell: ({ value }) =>
          admin ? (
            <Link
              href="/tournament/[tournament]/schools/[school]"
              as={`/tournament/${tournament}/schools/${value}`}
            >
              <a>{value}</a>
            </Link>
          ) : (
            value
          ),
      },
      {
        Header: "Number of Teams",
        accessor: (row: any) => row.teams.length,
      },
    ],
    [tournament]
  );

  const [{ data, fetching, error }] = useGetSchoolsQuery({
    variables: {
      tournamentId: tournament as string,
    },
  });

  return (
    <React.Fragment>
      <h1>Schools</h1>
      <DataTable columns={columns} data={data?.tournament?.schools} />
      {admin && (
        <NewSchoolModal>
          <Button color="primary" tag="a">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add School
          </Button>
        </NewSchoolModal>
      )}
    </React.Fragment>
  );
};
export default Schools;
