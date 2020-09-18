import * as React from "react";
import { NextPage } from "next";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { withMTUrqlClient } from "../../../helpers/withMTUrqlClient";
import { useGetTournamentInfoQuery } from "./tournament.generated";
import { useRouter } from "next/router";
import Link from "next/link";

function numberOfElements(
  num: number,
  item: string,
  prefix: string = "Currently have",
  suffix: string = ""
) {
  return `${prefix} ${num} ${item}${num === 1 ? "" : "s"}${
    suffix ? ` ${suffix}` : ""
  }`;
}

interface TournamentCardProps {
  url: string;
  tournamentId: string;
  title: React.ReactNode;
  children: React.ReactNode;
}
const TournamentCard: React.FC<TournamentCardProps> = ({
  url,
  tournamentId,
  title,
  children,
}) => {
  return (
    <Card>
      <Link
        href={`/tournament/[tournament]/${url}`}
        as={`/tournament/${tournamentId}/${url}`}
      >
        <CardHeader tag="a" style={{ cursor: "pointer" }}>
          {title}
        </CardHeader>
      </Link>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

const Tournament: NextPage = () => {
  const { tournament: tournamentId } = useRouter().query as Record<
    string,
    string
  >;
  const [{ data, fetching }] = useGetTournamentInfoQuery({
    variables: {
      tournament: tournamentId,
    },
  });

  const { tournament } = data || {};

  const numSchools = tournament?.schools.length;
  const numRounds = tournament?.rounds.length;

  return (
    <React.Fragment>
      {fetching || !tournament ? (
        <>Loading...</>
      ) : (
        <React.Fragment>
          <h2>{tournament.name}</h2>
          <p>
            Make sure to save this link:{" "}
            <a href={`/tournament/${tournamentId}`}>
              https://mocktrialtab.com/tournament/{tournamentId}
            </a>
            . Right now, we don't have a way to search through tournaments to
            preserve some degree of privacy in the data on the site.
          </p>
          <Row style={{ rowGap: 20 }}>
            <Col md={6}>
              <TournamentCard
                title="Schools"
                url="schools"
                tournamentId={tournamentId}
              >
                {numberOfElements(numSchools, "school")}
              </TournamentCard>
            </Col>
            <Col md={6}>
              <TournamentCard
                title="Teams"
                url="teams"
                tournamentId={tournamentId}
              >
                {numberOfElements(data.tournament.teams.length, "team")}
              </TournamentCard>
            </Col>
            <Col md={6}>
              <TournamentCard
                title="Judges"
                url="judges"
                tournamentId={tournamentId}
              >
                {numberOfElements(
                  data.tournament.judges.length,
                  "judge",
                  "Currently have",
                  "registered for the tournament"
                )}
              </TournamentCard>
            </Col>
            <Col md={6}>
              <TournamentCard
                title="Rounds"
                url="rounds"
                tournamentId={tournamentId}
              >
                {numRounds === 0
                  ? "Start Round 1"
                  : `Currently on round ${numRounds}`}
              </TournamentCard>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default withMTUrqlClient(Tournament);
