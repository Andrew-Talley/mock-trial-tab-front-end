import * as Types from '../../pages/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateJudgeMutationVariables = Types.Exact<{
  tournamentId: Types.Scalars['ID'];
  judgeName: Types.Scalars['String'];
}>;


export type CreateJudgeMutation = (
  { __typename?: 'Mutation' }
  & { addJudge: (
    { __typename?: 'Judge' }
    & Pick<Types.Judge, 'id' | 'name'>
  ) }
);


export const CreateJudgeDocument = gql`
    mutation createJudge($tournamentId: ID!, $judgeName: String!) {
  addJudge(tournamentId: $tournamentId, name: $judgeName) {
    id
    name
  }
}
    `;

export function useCreateJudgeMutation() {
  return Urql.useMutation<CreateJudgeMutation, CreateJudgeMutationVariables>(CreateJudgeDocument);
};