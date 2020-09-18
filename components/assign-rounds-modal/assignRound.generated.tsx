import * as Types from '../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AssignRoundMutationVariables = Types.Exact<{
  tournamentId: Types.Scalars['ID'];
  matchups: Array<Types.ManualRoundMatchup>;
}>;


export type AssignRoundMutation = (
  { __typename?: 'Mutation' }
  & { addManualRound: (
    { __typename?: 'Round' }
    & Pick<Types.Round, 'roundNum'>
    & { matchups: Array<Types.Maybe<(
      { __typename?: 'Matchup' }
      & Pick<Types.Matchup, 'id'>
      & { pl: (
        { __typename?: 'MatchupTeam' }
        & { team: (
          { __typename?: 'Team' }
          & Pick<Types.Team, 'num'>
        ) }
      ), def: (
        { __typename?: 'MatchupTeam' }
        & { team: (
          { __typename?: 'Team' }
          & Pick<Types.Team, 'num'>
        ) }
      ) }
    )>> }
  ) }
);


export const AssignRoundDocument = gql`
    mutation assignRound($tournamentId: ID!, $matchups: [ManualRoundMatchup!]!) {
  addManualRound(tournamentId: $tournamentId, matchups: $matchups) {
    roundNum
    matchups {
      id
      pl {
        team {
          num
        }
      }
      def {
        team {
          num
        }
      }
    }
  }
}
    `;

export function useAssignRoundMutation() {
  return Urql.useMutation<AssignRoundMutation, AssignRoundMutationVariables>(AssignRoundDocument);
};