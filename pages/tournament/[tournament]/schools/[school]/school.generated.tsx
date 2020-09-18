import * as Types from '../../../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetSchoolInfoQueryVariables = Types.Exact<{
  tournamentId: Types.Scalars['ID'];
  schoolName: Types.Scalars['String'];
}>;


export type GetSchoolInfoQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { school: (
      { __typename?: 'School' }
      & { teams?: Types.Maybe<Array<Types.Maybe<(
        { __typename?: 'Team' }
        & Pick<Types.Team, 'num' | 'name'>
      )>>> }
    ) }
  ) }
);


export const GetSchoolInfoDocument = gql`
    query getSchoolInfo($tournamentId: ID!, $schoolName: String!) {
  tournament(id: $tournamentId) {
    school(name: $schoolName) {
      teams {
        num
        name
      }
    }
  }
}
    `;

export function useGetSchoolInfoQuery(options: Omit<Urql.UseQueryArgs<GetSchoolInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSchoolInfoQuery>({ query: GetSchoolInfoDocument, ...options });
};