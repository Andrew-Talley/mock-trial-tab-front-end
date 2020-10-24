import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type JudgeBallotInfoFragment = (
  { __typename?: 'Ballot' }
  & Pick<Types.Ballot, 'id'>
  & { matchup: (
    { __typename?: 'Matchup' }
    & Pick<Types.Matchup, 'roundNum'>
    & { pl: (
      { __typename?: 'MatchupTeam' }
      & Pick<Types.MatchupTeam, 'teamNum'>
    ), def: (
      { __typename?: 'MatchupTeam' }
      & Pick<Types.MatchupTeam, 'teamNum'>
    ) }
  ) }
);

export type JudgeInfoQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  judge: Types.Scalars['ID'];
}>;


export type JudgeInfoQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { judge: (
      { __typename?: 'Judge' }
      & Pick<Types.Judge, 'id' | 'name' | 'email'>
      & { conflicts: Array<Types.Maybe<(
        { __typename?: 'School' }
        & Pick<Types.School, 'name'>
      )>>, ballots: Array<Types.Maybe<(
        { __typename?: 'Ballot' }
        & JudgeBallotInfoFragment
      )>> }
    ), schools: Array<(
      { __typename?: 'School' }
      & Pick<Types.School, 'name'>
    )> }
  ) }
);

export const JudgeBallotInfoFragmentDoc = gql`
    fragment judgeBallotInfo on Ballot {
  id
  matchup {
    roundNum
    pl {
      teamNum
    }
    def {
      teamNum
    }
  }
}
    `;
export const JudgeInfoDocument = gql`
    query judgeInfo($tournament: ID!, $judge: ID!) {
  tournament(id: $tournament) {
    judge(id: $judge) {
      id
      name
      email
      conflicts {
        name
      }
      ballots {
        ...judgeBallotInfo
      }
    }
    schools {
      name
    }
  }
}
    ${JudgeBallotInfoFragmentDoc}`;

export function useJudgeInfoQuery(options: Omit<Urql.UseQueryArgs<JudgeInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<JudgeInfoQuery>({ query: JudgeInfoDocument, ...options });
};