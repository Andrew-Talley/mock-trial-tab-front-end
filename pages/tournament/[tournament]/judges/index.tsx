import React, { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { useListJudgesQuery } from "page-gql/judges.generated";
import { DataTable } from "components/data-table";
import { Button } from "reactstrap";
import { AddJudgeModal } from "components/add-judge-modal/AddJudgeModal";
import Link from "next/link";
import { AuthContext } from "helpers/auth";

const Judges: NextPage = () => {
  const { tournament } = useRouter().query as Record<string, string>;

  const { admin } = useContext(AuthContext);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ value, row }) => (
        <Link
          href="/tournament/[tournament]/judges/[judge]"
          as={`/tournament/${tournament}/judges/${row.original.id}`}
        >
          {value}
        </Link>
      ),
    },
    {
      Header: "Conflicts",
      accessor: (judge) => judge.conflicts,
      Cell: ({ value }) =>
        value.map((school) => school.name).join(", ") || "No conflicts",
    },
  ];

  const [{ data }] = useListJudgesQuery({
    variables: {
      tournament,
    },
  });

  return !admin ? (
    <>
      <h3>Unauthorized</h3>
      <p>Sorry, this page is only for tournament administrators.</p>
    </>
  ) : (
    <>
      <h1>Judges</h1>
      <DataTable columns={columns} data={data?.tournament.judges} />
      <AddJudgeModal tournamentId={tournament}>
        <Button>Add Judge</Button>
      </AddJudgeModal>
    </>
  );
};
export default Judges;
