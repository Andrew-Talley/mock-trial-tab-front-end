import * as Types from '../../pages/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MatchupDataFragment = (
  { __typename?: 'Matchup' }
  & Pick<Types.Matchup, 'id'>
  & { pl: (
    { __typename?: 'MatchupTeam' }
    & Pick<Types.MatchupTeam, 'teamNum'>
  ), def: (
    { __typename?: 'MatchupTeam' }
    & Pick<Types.MatchupTeam, 'teamNum'>
  ), ballots?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Ballot' }
    & Pick<Types.Ballot, 'id'>
  )>>> }
);

export type MatchupInfoQueryVariables = Types.Exact<{
  tournamentId: Types.Scalars['ID'];
  roundNum: Types.Scalars['Int'];
}>;


export type MatchupInfoQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { round: (
      { __typename?: 'Round' }
      & { matchups: Array<Types.Maybe<(
        { __typename?: 'Matchup' }
        & MatchupDataFragment
      )>> }
    ) }
  ) }
);

export type AssignJudgeMutationVariables = Types.Exact<{
  tournamentId: Types.Scalars['ID'];
  matchupId: Types.Scalars['ID'];
  judgeId: Types.Scalars['ID'];
}>;


export type AssignJudgeMutation = (
  { __typename?: 'Mutation' }
  & { assignJudgeToMatchup: (
    { __typename?: 'Ballot' }
    & Pick<Types.Ballot, 'id'>
    & { matchup: (
      { __typename?: 'Matchup' }
      & Pick<Types.Matchup, 'id'>
    ) }
  ) }
);

export const MatchupDataFragmentDoc = gql`
    fragment matchupData on Matchup {
  id
  pl {
    teamNum
  }
  def {
    teamNum
  }
  ballots {
    id
  }
}
    `;
export const MatchupInfoDocument = gql`
    query matchupInfo($tournamentId: ID!, $roundNum: Int!) {
  tournament(id: $tournamentId) {
    round(num: $roundNum) {
      matchups {
        ...matchupData
      }
    }
  }
}
    ${MatchupDataFragmentDoc}`;

export function useMatchupInfoQuery(options: Omit<Urql.UseQueryArgs<MatchupInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MatchupInfoQuery>({ query: MatchupInfoDocument, ...options });
};
export const AssignJudgeDocument = gql`
    mutation assignJudge($tournamentId: ID!, $matchupId: ID!, $judgeId: ID!) {
  assignJudgeToMatchup(judge: $judgeId, matchup: $matchupId, tournament: $tournamentId) {
    id
    matchup {
      id
    }
  }
}
    `;

export function useAssignJudgeMutation() {
  return Urql.useMutation<AssignJudgeMutation, AssignJudgeMutationVariables>(AssignJudgeDocument);
};