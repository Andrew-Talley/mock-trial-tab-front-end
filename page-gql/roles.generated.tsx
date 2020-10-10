import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAttorneyRoleQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  matchup: Types.Scalars['ID'];
  side: Types.Side;
  role?: Types.Maybe<Types.AttorneyRole>;
}>;


export type GetAttorneyRoleQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { matchup: (
      { __typename?: 'Matchup' }
      & { team: (
        { __typename?: 'MatchupTeam' }
        & { team: (
          { __typename?: 'Team' }
          & Pick<Types.Team, 'num'>
        ), attorney?: Types.Maybe<(
          { __typename?: 'MatchupAttorney' }
          & { student: (
            { __typename?: 'Student' }
            & Pick<Types.Student, 'id' | 'name'>
          ) }
        )> }
      ) }
    ) }
  ) }
);

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

export type ChangeStudentInRoleMutationVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  matchup: Types.Scalars['ID'];
  team: Types.Scalars['Int'];
  role: Types.AttorneyRole;
  student: Types.Scalars['ID'];
}>;


export type ChangeStudentInRoleMutation = (
  { __typename?: 'Mutation' }
  & { assignStudentToRole?: Types.Maybe<(
    { __typename?: 'AssignStudentToRole' }
    & { matchup: (
      { __typename?: 'Matchup' }
      & Pick<Types.Matchup, 'id'>
    ) }
  )> }
);

export type GetWitnessInfoQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  matchup: Types.Scalars['ID'];
  side: Types.Side;
  opposingSide: Types.Side;
  witnessNum: Types.Scalars['Int'];
}>;


export type GetWitnessInfoQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { matchup: (
      { __typename?: 'Matchup' }
      & { team: (
        { __typename?: 'MatchupTeam' }
        & { witness: (
          { __typename?: 'MatchupWitness' }
          & Pick<Types.MatchupWitness, 'witnessName'>
          & { student?: Types.Maybe<(
            { __typename?: 'Student' }
            & Pick<Types.Student, 'id' | 'name'>
          )> }
        ) }
      ), oppTeam: (
        { __typename?: 'MatchupTeam' }
        & { attorney?: Types.Maybe<(
          { __typename?: 'MatchupAttorney' }
          & { student: (
            { __typename?: 'Student' }
            & Pick<Types.Student, 'id' | 'name'>
          ) }
        )> }
      ) }
    ) }
  ) }
);


export const GetAttorneyRoleDocument = gql`
    query getAttorneyRole($tournament: ID!, $matchup: ID!, $side: Side!, $role: AttorneyRole) {
  tournament(id: $tournament) {
    matchup(id: $matchup) {
      team(side: $side) {
        team {
          num
        }
        attorney(role: $role) {
          student {
            id
            name
          }
        }
      }
    }
  }
}
    `;

export function useGetAttorneyRoleQuery(options: Omit<Urql.UseQueryArgs<GetAttorneyRoleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAttorneyRoleQuery>({ query: GetAttorneyRoleDocument, ...options });
};
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
export const ChangeStudentInRoleDocument = gql`
    mutation changeStudentInRole($tournament: ID!, $matchup: ID!, $team: Int!, $role: AttorneyRole!, $student: ID!) {
  assignStudentToRole(tournamentId: $tournament, matchup: $matchup, team: $team, role: $role, student: $student) {
    matchup {
      id
    }
  }
}
    `;

export function useChangeStudentInRoleMutation() {
  return Urql.useMutation<ChangeStudentInRoleMutation, ChangeStudentInRoleMutationVariables>(ChangeStudentInRoleDocument);
};
export const GetWitnessInfoDocument = gql`
    query getWitnessInfo($tournament: ID!, $matchup: ID!, $side: Side!, $opposingSide: Side!, $witnessNum: Int!) {
  tournament(id: $tournament) {
    matchup(id: $matchup) {
      team(side: $side) {
        witness(order: $witnessNum) {
          student {
            id
            name
          }
          witnessName
        }
      }
      oppTeam: team(side: $opposingSide) {
        attorney(crossingWitnessNum: $witnessNum) {
          student {
            id
            name
          }
        }
      }
    }
  }
}
    `;

export function useGetWitnessInfoQuery(options: Omit<Urql.UseQueryArgs<GetWitnessInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetWitnessInfoQuery>({ query: GetWitnessInfoDocument, ...options });
};