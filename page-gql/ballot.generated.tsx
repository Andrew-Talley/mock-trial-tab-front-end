import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetBallotInfoQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  ballot: Types.Scalars['ID'];
}>;


export type GetBallotInfoQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { ballot: (
      { __typename?: 'Ballot' }
      & { judge: (
        { __typename?: 'Judge' }
        & Pick<Types.Judge, 'name'>
      ), matchup: (
        { __typename?: 'Matchup' }
        & Pick<Types.Matchup, 'id'>
        & { pl: (
          { __typename?: 'MatchupTeam' }
          & Pick<Types.MatchupTeam, 'teamNum'>
        ), def: (
          { __typename?: 'MatchupTeam' }
          & Pick<Types.MatchupTeam, 'teamNum'>
        ) }
      ) }
    ) }
  ) }
);

export type CompleteBallotMutationVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  ballot: Types.Scalars['ID'];
}>;


export type CompleteBallotMutation = (
  { __typename?: 'Mutation' }
  & { completeBallot: (
    { __typename?: 'Ballot' }
    & Pick<Types.Ballot, 'id' | 'complete'>
  ) }
);


export const GetBallotInfoDocument = gql`
    query getBallotInfo($tournament: ID!, $ballot: ID!) {
  tournament(id: $tournament) {
    ballot(id: $ballot) {
      judge {
        name
      }
      matchup {
        id
        pl {
          teamNum
        }
        def {
          teamNum
        }
      }
    }
  }
}
    `;

export function useGetBallotInfoQuery(options: Omit<Urql.UseQueryArgs<GetBallotInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetBallotInfoQuery>({ query: GetBallotInfoDocument, ...options });
};
export const CompleteBallotDocument = gql`
    mutation completeBallot($tournament: ID!, $ballot: ID!) {
  completeBallot(tournament: $tournament, ballot: $ballot) {
    id
    complete
  }
}
    `;

export function useCompleteBallotMutation() {
  return Urql.useMutation<CompleteBallotMutation, CompleteBallotMutationVariables>(CompleteBallotDocument);
};