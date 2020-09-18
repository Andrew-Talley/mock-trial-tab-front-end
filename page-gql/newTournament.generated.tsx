import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateTournamentMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type CreateTournamentMutation = (
  { __typename?: 'Mutation' }
  & { addTournament?: Types.Maybe<(
    { __typename?: 'Tournament' }
    & Pick<Types.Tournament, 'id'>
  )> }
);


export const CreateTournamentDocument = gql`
    mutation createTournament($name: String!) {
  addTournament(name: $name) {
    id
  }
}
    `;

export function useCreateTournamentMutation() {
  return Urql.useMutation<CreateTournamentMutation, CreateTournamentMutationVariables>(CreateTournamentDocument);
};