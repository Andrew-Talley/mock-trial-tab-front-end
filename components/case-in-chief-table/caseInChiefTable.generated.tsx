import * as Types from '../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ChangeWitnessMutationVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  matchup: Types.Scalars['ID'];
  side: Types.Side;
  order: Types.Scalars['Int'];
  student: Types.Scalars['ID'];
}>;


export type ChangeWitnessMutation = (
  { __typename?: 'Mutation' }
  & { assignWitnessOrder: (
    { __typename?: 'AssignWitnessOrder' }
    & Pick<Types.AssignWitnessOrder, 'order'>
    & { matchup: (
      { __typename?: 'Matchup' }
      & Pick<Types.Matchup, 'id'>
    ), student: (
      { __typename?: 'Student' }
      & Pick<Types.Student, 'id' | 'name'>
    ) }
  ) }
);


export const ChangeWitnessDocument = gql`
    mutation changeWitness($tournament: ID!, $matchup: ID!, $side: Side!, $order: Int!, $student: ID!) {
  assignWitnessOrder(tournament: $tournament, matchup: $matchup, side: $side, order: $order, student: $student) {
    matchup {
      id
    }
    student {
      id
      name
    }
    order
  }
}
    `;

export function useChangeWitnessMutation() {
  return Urql.useMutation<ChangeWitnessMutation, ChangeWitnessMutationVariables>(ChangeWitnessDocument);
};