import * as Types from '../../pages/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AddTeamMutationVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  school: Types.Scalars['String'];
  teamNum: Types.Scalars['Int'];
  teamName: Types.Scalars['String'];
}>;


export type AddTeamMutation = (
  { __typename?: 'Mutation' }
  & { addTeam?: Types.Maybe<(
    { __typename?: 'Team' }
    & Pick<Types.Team, 'name' | 'num'>
  )> }
);


export const AddTeamDocument = gql`
    mutation addTeam($tournament: ID!, $school: String!, $teamNum: Int!, $teamName: String!) {
  addTeam(name: $teamName, num: $teamNum, school: $school, tournament: $tournament) {
    name
    num
  }
}
    `;

export function useAddTeamMutation() {
  return Urql.useMutation<AddTeamMutation, AddTeamMutationVariables>(AddTeamDocument);
};