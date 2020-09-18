import * as Types from '../../../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SideInfoFragment = (
  { __typename?: 'MatchupTeam' }
  & { team: (
    { __typename?: 'Team' }
    & Pick<Types.Team, 'num' | 'name'>
  ) }
);

export type GetMatchupInfoQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  matchup: Types.Scalars['ID'];
}>;


export type GetMatchupInfoQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { matchup: (
      { __typename?: 'Matchup' }
      & Pick<Types.Matchup, 'id' | 'roundNum'>
      & { pl: (
        { __typename?: 'MatchupTeam' }
        & SideInfoFragment
      ), def: (
        { __typename?: 'MatchupTeam' }
        & SideInfoFragment
      ), ballots?: Types.Maybe<Array<Types.Maybe<(
        { __typename?: 'Ballot' }
        & Pick<Types.Ballot, 'id' | 'complete' | 'pd'>
        & { judge: (
          { __typename?: 'Judge' }
          & Pick<Types.Judge, 'name'>
        ) }
      )>>> }
    ) }
  ) }
);

export const SideInfoFragmentDoc = gql`
    fragment sideInfo on MatchupTeam {
  team {
    num
    name
  }
}
    `;
export const GetMatchupInfoDocument = gql`
    query getMatchupInfo($tournament: ID!, $matchup: ID!) {
  tournament(id: $tournament) {
    matchup(id: $matchup) {
      id
      roundNum
      pl {
        ...sideInfo
      }
      def {
        ...sideInfo
      }
      ballots {
        id
        complete
        judge {
          name
        }
        pd(side: PL)
      }
    }
  }
}
    ${SideInfoFragmentDoc}`;

export function useGetMatchupInfoQuery(options: Omit<Urql.UseQueryArgs<GetMatchupInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMatchupInfoQuery>({ query: GetMatchupInfoDocument, ...options });
};