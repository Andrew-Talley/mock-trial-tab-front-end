import * as Types from '../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type DeleteBallotMutationVariables = Types.Exact<{
  ballot: Types.Scalars['ID'];
}>;


export type DeleteBallotMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'deleteBallot'>
);


export const DeleteBallotDocument = gql`
    mutation deleteBallot($ballot: ID!) {
  deleteBallot(id: $ballot)
}
    `;

export function useDeleteBallotMutation() {
  return Urql.useMutation<DeleteBallotMutation, DeleteBallotMutationVariables>(DeleteBallotDocument);
};