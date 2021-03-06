import * as Types from '../../generated/graphql';

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

export type SetEmailMutationVariables = Types.Exact<{
  tournamentId: Types.Scalars['ID'];
  judgeId: Types.Scalars['ID'];
  email: Types.Scalars['String'];
}>;


export type SetEmailMutation = (
  { __typename?: 'Mutation' }
  & { assignJudgeEmail: (
    { __typename?: 'Judge' }
    & Pick<Types.Judge, 'id' | 'email'>
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
export const SetEmailDocument = gql`
    mutation setEmail($tournamentId: ID!, $judgeId: ID!, $email: String!) {
  assignJudgeEmail(tournament: $tournamentId, judge: $judgeId, email: $email) {
    id
    email
  }
}
    `;

export function useSetEmailMutation() {
  return Urql.useMutation<SetEmailMutation, SetEmailMutationVariables>(SetEmailDocument);
};