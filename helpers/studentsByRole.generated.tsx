import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type StudentInfoFragment = (
  { __typename?: 'Student' }
  & Pick<Types.Student, 'id' | 'name'>
);

export type WitnessInfoFragment = (
  { __typename?: 'MatchupWitness' }
  & { student?: Types.Maybe<(
    { __typename?: 'Student' }
    & StudentInfoFragment
  )> }
);

export type TeamInfoFragment = (
  { __typename?: 'MatchupTeam' }
  & { opener?: Types.Maybe<(
    { __typename?: 'Student' }
    & StudentInfoFragment
  )>, middle?: Types.Maybe<(
    { __typename?: 'Student' }
    & StudentInfoFragment
  )>, closer?: Types.Maybe<(
    { __typename?: 'Student' }
    & StudentInfoFragment
  )>, firstWitness: (
    { __typename?: 'MatchupWitness' }
    & WitnessInfoFragment
  ), secondWitness: (
    { __typename?: 'MatchupWitness' }
    & WitnessInfoFragment
  ), thirdWitness: (
    { __typename?: 'MatchupWitness' }
    & WitnessInfoFragment
  ) }
);

export type StudentsByRoleQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  matchup: Types.Scalars['ID'];
}>;


export type StudentsByRoleQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { matchup: (
      { __typename?: 'Matchup' }
      & { pl: (
        { __typename?: 'MatchupTeam' }
        & TeamInfoFragment
      ), def: (
        { __typename?: 'MatchupTeam' }
        & TeamInfoFragment
      ) }
    ) }
  ) }
);

export const StudentInfoFragmentDoc = gql`
    fragment studentInfo on Student {
  id
  name
}
    `;
export const WitnessInfoFragmentDoc = gql`
    fragment witnessInfo on MatchupWitness {
  student {
    ...studentInfo
  }
}
    ${StudentInfoFragmentDoc}`;
export const TeamInfoFragmentDoc = gql`
    fragment teamInfo on MatchupTeam {
  opener: studentInRole(role: OPENER) {
    ...studentInfo
  }
  middle: studentInRole(role: MIDDLE) {
    ...studentInfo
  }
  closer: studentInRole(role: CLOSER) {
    ...studentInfo
  }
  firstWitness: witness(order: 1) {
    ...witnessInfo
  }
  secondWitness: witness(order: 2) {
    ...witnessInfo
  }
  thirdWitness: witness(order: 3) {
    ...witnessInfo
  }
}
    ${StudentInfoFragmentDoc}
${WitnessInfoFragmentDoc}`;
export const StudentsByRoleDocument = gql`
    query studentsByRole($tournament: ID!, $matchup: ID!) {
  tournament(id: $tournament) {
    matchup(id: $matchup) {
      pl {
        ...teamInfo
      }
      def {
        ...teamInfo
      }
    }
  }
}
    ${TeamInfoFragmentDoc}`;

export function useStudentsByRoleQuery(options: Omit<Urql.UseQueryArgs<StudentsByRoleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StudentsByRoleQuery>({ query: StudentsByRoleDocument, ...options });
};