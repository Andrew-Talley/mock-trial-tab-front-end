import * as Types from '../../../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetIndividualAwardsQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  ballot: Types.Scalars['ID'];
}>;


export type GetIndividualAwardsQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { ballot: (
      { __typename?: 'Ballot' }
      & { witnessAwards: Array<Types.Maybe<(
        { __typename?: 'MatchupWitness' }
        & { student?: Types.Maybe<(
          { __typename?: 'Student' }
          & Pick<Types.Student, 'id'>
        )> }
      )>>, attorneyAwards: Array<Types.Maybe<(
        { __typename?: 'MatchupAttorney' }
        & { student?: Types.Maybe<(
          { __typename?: 'Student' }
          & Pick<Types.Student, 'id'>
        )> }
      )>> }
    ) }
  ) }
);

export type ChangeIndividualAwardMutationVariables = Types.Exact<{
  ballot: Types.Scalars['ID'];
  role: Types.Role;
  rank: Types.Scalars['Int'];
  student: Types.Scalars['ID'];
}>;


export type ChangeIndividualAwardMutation = (
  { __typename?: 'Mutation' }
  & { assignIndividualAward: (
    { __typename?: 'AssignIndividualAward' }
    & Pick<Types.AssignIndividualAward, 'rank'>
    & { role: (
      { __typename?: 'MatchupAttorney' }
      & { student?: Types.Maybe<(
        { __typename?: 'Student' }
        & Pick<Types.Student, 'id'>
      )> }
    ) | (
      { __typename?: 'MatchupWitness' }
      & { student?: Types.Maybe<(
        { __typename?: 'Student' }
        & Pick<Types.Student, 'id'>
      )> }
    ) }
  ) }
);


export const GetIndividualAwardsDocument = gql`
    query getIndividualAwards($tournament: ID!, $ballot: ID!) {
  tournament(id: $tournament) {
    ballot(id: $ballot) {
      witnessAwards {
        student {
          id
        }
      }
      attorneyAwards {
        student {
          id
        }
      }
    }
  }
}
    `;

export function useGetIndividualAwardsQuery(options: Omit<Urql.UseQueryArgs<GetIndividualAwardsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetIndividualAwardsQuery>({ query: GetIndividualAwardsDocument, ...options });
};
export const ChangeIndividualAwardDocument = gql`
    mutation changeIndividualAward($ballot: ID!, $role: Role!, $rank: Int!, $student: ID!) {
  assignIndividualAward(ballot: $ballot, role: $role, rank: $rank, student: $student) {
    rank
    role {
      ... on MatchupAttorney {
        student {
          id
        }
      }
      ... on MatchupWitness {
        student {
          id
        }
      }
    }
  }
}
    `;

export function useChangeIndividualAwardMutation() {
  return Urql.useMutation<ChangeIndividualAwardMutation, ChangeIndividualAwardMutationVariables>(ChangeIndividualAwardDocument);
};