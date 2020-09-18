import React, { useState, useEffect, useMemo, CSSProperties } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Typeahead, Hint } from "react-bootstrap-typeahead";

import {
  useJudgeInfoQuery,
  JudgeBallotInfoFragment,
} from "page-gql/judge.generated";
import { Row, Col, Button } from "reactstrap";
import { AddBallotForJudgeModal } from "components/add-ballot-for-judge-modal/AddBallotForJudgeModal";

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
};

type OptBallot = JudgeBallotInfoFragment | null;
type NormalizedBallots = [OptBallot, OptBallot, OptBallot, OptBallot];
function normalizeBallots(
  ballots: JudgeBallotInfoFragment[]
): NormalizedBallots {
  const result: NormalizedBallots = [null, null, null, null];

  for (const ballot of ballots) {
    const roundNum = ballot.matchup.roundNum;
    result[roundNum - 1] = ballot;
  }

  return result;
}

const Judge: NextPage = () => {
  const { tournament, judge } = useRouter().query as Record<string, string>;

  const [{ data }] = useJudgeInfoQuery({
    variables: {
      tournament,
      judge,
    },
  });

  const judgeData = data?.tournament.judge;
  const schoolData = data?.tournament.schools;

  const [conflicts, setConflicts] = useState([]);
  useEffect(() => {
    if (judgeData) {
      setConflicts(judgeData.conflicts.map((school) => school.name));
    }
  }, [judgeData]);

  const schools = useMemo(() => {
    if (!schoolData) return [];

    return schoolData.map((school) => school.name);
  }, [schoolData]);

  const normedBallots = useMemo(() => {
    return normalizeBallots(judgeData?.ballots || []);
  }, [judgeData]);

  return (
    <React.Fragment>
      <h1>{judgeData?.name || "Loading"}</h1>
      {/* <section className="my-4" style={gridStyle}>
        <h3 className="mr-2 mb-0">Conflicts:</h3>
        <Typeahead
          id="judge-conflicts"
          options={schools}
          selected={conflicts}
          multiple
          onChange={setConflicts}
        />
        <div />
        <div>
          <Button size="sm" className="m-1 ml-0">
            Cancel Changes
          </Button>
          <Button size="sm" color="primary" className="m-1">
            Save Changes
          </Button>
        </div>
      </section> */}
      <section className="my-4">
        <h3>Ballots</h3>
        <Row>
          {normedBallots.map((ballot, ind) => {
            const roundNum = ind + 1;
            return (
              <Col key={roundNum}>
                <h4>Round {roundNum}</h4>
                <div>
                  {ballot ? (
                    `${ballot?.matchup.pl.teamNum} vs. ${ballot?.matchup.def.teamNum}`
                  ) : (
                    <div>
                      <div>No ballot assigned</div>
                      <AddBallotForJudgeModal
                        roundNum={roundNum}
                        judgeId={judge}
                      >
                        <Button>Assign Ballot</Button>
                      </AddBallotForJudgeModal>
                    </div>
                  )}
                </div>
              </Col>
            );
          })}
        </Row>
      </section>
    </React.Fragment>
  );
};

export default Judge;
