import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetRoundInfoQueryVariables = Types.Exact<{
  tournamentId: Types.Scalars['ID'];
}>;


export type GetRoundInfoQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { rounds: Array<(
      { __typename?: 'Round' }
      & Pick<Types.Round, 'roundNum'>
      & { matchups: Array<Types.Maybe<(
        { __typename?: 'Matchup' }
        & Pick<Types.Matchup, 'id'>
        & { pl: (
          { __typename?: 'MatchupTeam' }
          & { team: (
            { __typename?: 'Team' }
            & Pick<Types.Team, 'num' | 'name'>
          ) }
        ), def: (
          { __typename?: 'MatchupTeam' }
          & { team: (
            { __typename?: 'Team' }
            & Pick<Types.Team, 'num' | 'name'>
          ) }
        ), ballots?: Types.Maybe<Array<Types.Maybe<(
          { __typename?: 'Ballot' }
          & Pick<Types.Ballot, 'id'>
          & { judge: (
            { __typename?: 'Judge' }
            & Pick<Types.Judge, 'name'>
          ) }
        )>>> }
      )>> }
    )> }
  ) }
);


export const GetRoundInfoDocument = gql`
    query getRoundInfo($tournamentId: ID!) {
  tournament(id: $tournamentId) {
    rounds {
      roundNum
      matchups {
        id
        pl {
          team {
            num
            name
          }
        }
        def {
          team {
            num
            name
          }
        }
        ballots {
          id
          judge {
            name
          }
        }
      }
    }
  }
}
    `;

export function useGetRoundInfoQuery(options: Omit<Urql.UseQueryArgs<GetRoundInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetRoundInfoQuery>({ query: GetRoundInfoDocument, ...options });
};