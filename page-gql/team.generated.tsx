import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TeamInfoQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  teamNum: Types.Scalars['Int'];
}>;


export type TeamInfoQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { team: (
      { __typename?: 'Team' }
      & Pick<Types.Team, 'num' | 'name'>
      & { students: Array<Types.Maybe<(
        { __typename?: 'Student' }
        & Pick<Types.Student, 'id' | 'name'>
      )>>, matchups: Array<Types.Maybe<(
        { __typename?: 'Matchup' }
        & Pick<Types.Matchup, 'id' | 'roundNum'>
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
        ) }
      )>> }
    ) }
  ) }
);


export const TeamInfoDocument = gql`
    query teamInfo($tournament: ID!, $teamNum: Int!) {
  tournament(id: $tournament) {
    team(num: $teamNum) {
      num
      name
      students {
        id
        name
      }
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
        roundNum
      }
    }
  }
}
    `;

export function useTeamInfoQuery(options: Omit<Urql.UseQueryArgs<TeamInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TeamInfoQuery>({ query: TeamInfoDocument, ...options });
};