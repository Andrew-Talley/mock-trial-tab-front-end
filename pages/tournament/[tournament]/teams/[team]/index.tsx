import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Row, Col } from "reactstrap";

import { useTeamInfoQuery } from "./team.generated";
import { DataTable } from "../../../../../components/data-table";
import Link from "next/link";

const studentColumns = [
  {
    Header: "Student Name",
    accessor: "name",
  },
];

const Team: NextPage = () => {
  const { tournament, team } = useRouter().query as Record<string, string>;
  const teamNum = parseInt(team);

  const [{ data }] = useTeamInfoQuery({
    variables: {
      tournament,
      teamNum,
    },
  });

  const matchups = data?.tournament.team.matchups;

  const formattedMatchups = matchups?.map((m) => {
    const is_pl = m.pl.team.num === teamNum;
    const side = is_pl ? "π" : "∆";

    const opponent = is_pl ? m.def : m.pl;

    if (!opponent.team) {
      console.log(m);
    }

    return {
      id: m.id,
      roundNum: m.roundNum,
      label: `${side} vs. ${opponent.team.num} (${opponent.team.name})`,
    };
  });

  const matchupColumns = useMemo(
    () => [
      {
        Header: "Round Num",
        accessor: "roundNum",
      },
      {
        Header: "Matchup",
        accessor: "label",
        Cell: ({ value, row }) => {
          const { id } = row.original;
          return (
            <Link
              href="/tournament/[tournament]/matchup/[matchup]"
              as={`/tournament/${tournament}/matchup/${id}`}
            >
              <a>{value}</a>
            </Link>
          );
        },
      },
    ],
    [tournament]
  );

  return (
    <React.Fragment>
      <h1 className="mb-4">{data?.tournament.team.name}</h1>
      <Row>
        <Col sm={6}>
          <h2>Students</h2>
          <DataTable
            data={data?.tournament.team.students}
            columns={studentColumns}
          />
        </Col>
        <Col sm={6}>
          <h2>Matchups</h2>
          <DataTable data={formattedMatchups} columns={matchupColumns} />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Team;
