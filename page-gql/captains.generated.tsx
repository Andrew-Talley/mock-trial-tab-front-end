import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCurrentWitnessesQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  matchup: Types.Scalars['ID'];
  side: Types.Side;
}>;


export type GetCurrentWitnessesQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { matchup: (
      { __typename?: 'Matchup' }
      & { team: (
        { __typename?: 'MatchupTeam' }
        & { first: (
          { __typename?: 'MatchupWitness' }
          & Pick<Types.MatchupWitness, 'witnessName'>
        ), second: (
          { __typename?: 'MatchupWitness' }
          & Pick<Types.MatchupWitness, 'witnessName'>
        ), third: (
          { __typename?: 'MatchupWitness' }
          & Pick<Types.MatchupWitness, 'witnessName'>
        ) }
      ) }
    ) }
  ) }
);

export type UpdateWitnessMutationVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  matchup: Types.Scalars['ID'];
  side: Types.Side;
  order: Types.Scalars['Int'];
  witness: Types.Scalars['String'];
}>;


export type UpdateWitnessMutation = (
  { __typename?: 'Mutation' }
  & { assignWitnessName: (
    { __typename?: 'AssignWitnessName' }
    & Pick<Types.AssignWitnessName, 'witnessName'>
    & { matchup: (
      { __typename?: 'Matchup' }
      & Pick<Types.Matchup, 'id'>
    ) }
  ) }
);


export const GetCurrentWitnessesDocument = gql`
    query getCurrentWitnesses($tournament: ID!, $matchup: ID!, $side: Side!) {
  tournament(id: $tournament) {
    matchup(id: $matchup) {
      team(side: $side) {
        first: witness(order: 1) {
          witnessName
        }
        second: witness(order: 2) {
          witnessName
        }
        third: witness(order: 3) {
          witnessName
        }
      }
    }
  }
}
    `;

export function useGetCurrentWitnessesQuery(options: Omit<Urql.UseQueryArgs<GetCurrentWitnessesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCurrentWitnessesQuery>({ query: GetCurrentWitnessesDocument, ...options });
};
export const UpdateWitnessDocument = gql`
    mutation updateWitness($tournament: ID!, $matchup: ID!, $side: Side!, $order: Int!, $witness: String!) {
  assignWitnessName(tournament: $tournament, matchup: $matchup, side: $side, order: $order, witness: $witness) {
    matchup {
      id
    }
    witnessName
  }
}
    `;

export function useUpdateWitnessMutation() {
  return Urql.useMutation<UpdateWitnessMutation, UpdateWitnessMutationVariables>(UpdateWitnessDocument);
};