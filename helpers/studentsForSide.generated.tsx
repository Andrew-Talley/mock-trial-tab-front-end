import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetStudentsForSideQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  matchup: Types.Scalars['ID'];
  side: Types.Side;
}>;


export type GetStudentsForSideQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { matchup: (
      { __typename?: 'Matchup' }
      & { team: (
        { __typename?: 'MatchupTeam' }
        & { team: (
          { __typename?: 'Team' }
          & { students: Array<Types.Maybe<(
            { __typename?: 'Student' }
            & Pick<Types.Student, 'id' | 'name'>
          )>> }
        ) }
      ) }
    ) }
  ) }
);


export const GetStudentsForSideDocument = gql`
    query getStudentsForSide($tournament: ID!, $matchup: ID!, $side: Side!) {
  tournament(id: $tournament) {
    matchup(id: $matchup) {
      team(side: $side) {
        team {
          students {
            id
            name
          }
        }
      }
    }
  }
}
    `;

export function useGetStudentsForSideQuery(options: Omit<Urql.UseQueryArgs<GetStudentsForSideQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetStudentsForSideQuery>({ query: GetStudentsForSideDocument, ...options });
};