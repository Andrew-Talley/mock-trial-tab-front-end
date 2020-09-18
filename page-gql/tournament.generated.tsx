import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetTournamentInfoQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
}>;


export type GetTournamentInfoQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & Pick<Types.Tournament, 'name'>
    & { schools: Array<(
      { __typename?: 'School' }
      & Pick<Types.School, 'name'>
    )>, teams: Array<(
      { __typename?: 'Team' }
      & Pick<Types.Team, 'num'>
    )>, judges: Array<Types.Maybe<(
      { __typename?: 'Judge' }
      & Pick<Types.Judge, 'id'>
    )>>, rounds: Array<(
      { __typename?: 'Round' }
      & Pick<Types.Round, 'roundNum'>
    )> }
  ) }
);


export const GetTournamentInfoDocument = gql`
    query getTournamentInfo($tournament: ID!) {
  tournament(id: $tournament) {
    name
    schools {
      name
    }
    teams {
      num
    }
    judges {
      id
    }
    rounds {
      roundNum
    }
  }
}
    `;

export function useGetTournamentInfoQuery(options: Omit<Urql.UseQueryArgs<GetTournamentInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTournamentInfoQuery>({ query: GetTournamentInfoDocument, ...options });
};