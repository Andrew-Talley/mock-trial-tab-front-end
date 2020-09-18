import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TeamDataFragment = (
  { __typename?: 'Team' }
  & Pick<Types.Team, 'num' | 'name' | 'wins' | 'losses' | 'ties'>
);

export type GetAllTeamsQueryVariables = Types.Exact<{
  tournamentId: Types.Scalars['ID'];
}>;


export type GetAllTeamsQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { teams: Array<(
      { __typename?: 'Team' }
      & TeamDataFragment
    )> }
  ) }
);

export const TeamDataFragmentDoc = gql`
    fragment teamData on Team {
  num
  name
  wins
  losses
  ties
}
    `;
export const GetAllTeamsDocument = gql`
    query getAllTeams($tournamentId: ID!) {
  tournament(id: $tournamentId) {
    teams {
      ...teamData
    }
  }
}
    ${TeamDataFragmentDoc}`;

export function useGetAllTeamsQuery(options: Omit<Urql.UseQueryArgs<GetAllTeamsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllTeamsQuery>({ query: GetAllTeamsDocument, ...options });
};