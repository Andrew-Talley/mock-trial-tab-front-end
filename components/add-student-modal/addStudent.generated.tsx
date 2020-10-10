import * as Types from '../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AddStudentMutationVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  team: Types.Scalars['Int'];
  name: Types.Scalars['String'];
}>;


export type AddStudentMutation = (
  { __typename?: 'Mutation' }
  & { addStudentToTeam?: Types.Maybe<(
    { __typename?: 'AddStudentToTeam' }
    & { team: (
      { __typename?: 'Team' }
      & Pick<Types.Team, 'num'>
    ), student: (
      { __typename?: 'Student' }
      & Pick<Types.Student, 'id' | 'name'>
    ) }
  )> }
);


export const AddStudentDocument = gql`
    mutation addStudent($tournament: ID!, $team: Int!, $name: String!) {
  addStudentToTeam(tournamentId: $tournament, team: $team, name: $name) {
    team {
      num
    }
    student {
      id
      name
    }
  }
}
    `;

export function useAddStudentMutation() {
  return Urql.useMutation<AddStudentMutation, AddStudentMutationVariables>(AddStudentDocument);
};