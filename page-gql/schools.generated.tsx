import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetSchoolsQueryVariables = Types.Exact<{
  tournamentId: Types.Scalars['ID'];
}>;


export type GetSchoolsQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { schools: Array<(
      { __typename?: 'School' }
      & Pick<Types.School, 'name'>
      & { teams?: Types.Maybe<Array<Types.Maybe<(
        { __typename?: 'Team' }
        & Pick<Types.Team, 'num'>
      )>>> }
    )> }
  ) }
);

export type AddSchoolMutationVariables = Types.Exact<{
  tournamentId: Types.Scalars['ID'];
  schoolName: Types.Scalars['String'];
}>;


export type AddSchoolMutation = (
  { __typename?: 'Mutation' }
  & { addSchool: (
    { __typename?: 'School' }
    & Pick<Types.School, 'name'>
  ) }
);


export const GetSchoolsDocument = gql`
    query getSchools($tournamentId: ID!) {
  tournament(id: $tournamentId) {
    schools {
      name
      teams {
        num
      }
    }
  }
}
    `;

export function useGetSchoolsQuery(options: Omit<Urql.UseQueryArgs<GetSchoolsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSchoolsQuery>({ query: GetSchoolsDocument, ...options });
};
export const AddSchoolDocument = gql`
    mutation addSchool($tournamentId: ID!, $schoolName: String!) {
  addSchool(name: $schoolName, tournament: $tournamentId) {
    name
  }
}
    `;

export function useAddSchoolMutation() {
  return Urql.useMutation<AddSchoolMutation, AddSchoolMutationVariables>(AddSchoolDocument);
};