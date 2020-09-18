import * as Types from '../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type BallotModalInfoQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
}>;


export type BallotModalInfoQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { judges: Array<Types.Maybe<(
      { __typename?: 'Judge' }
      & Pick<Types.Judge, 'id' | 'name'>
    )>> }
  ) }
);

export type AssignBallotMutationVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  matchup: Types.Scalars['ID'];
  judge: Types.Scalars['ID'];
}>;


export type AssignBallotMutation = (
  { __typename?: 'Mutation' }
  & { assignJudgeToMatchup: (
    { __typename?: 'Ballot' }
    & Pick<Types.Ballot, 'id'>
  ) }
);


export const BallotModalInfoDocument = gql`
    query ballotModalInfo($tournament: ID!) {
  tournament(id: $tournament) {
    judges {
      id
      name
    }
  }
}
    `;

export function useBallotModalInfoQuery(options: Omit<Urql.UseQueryArgs<BallotModalInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BallotModalInfoQuery>({ query: BallotModalInfoDocument, ...options });
};
export const AssignBallotDocument = gql`
    mutation assignBallot($tournament: ID!, $matchup: ID!, $judge: ID!) {
  assignJudgeToMatchup(tournament: $tournament, matchup: $matchup, judge: $judge) {
    id
  }
}
    `;

export function useAssignBallotMutation() {
  return Urql.useMutation<AssignBallotMutation, AssignBallotMutationVariables>(AssignBallotDocument);
};