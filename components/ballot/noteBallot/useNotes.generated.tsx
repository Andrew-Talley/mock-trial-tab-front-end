import * as Types from '../../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetSpeechNotesQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  ballot: Types.Scalars['ID'];
  side: Types.Side;
  speech: Types.Speech;
}>;


export type GetSpeechNotesQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { ballot: (
      { __typename?: 'Ballot' }
      & { side: (
        { __typename?: 'BallotSide' }
        & Pick<Types.BallotSide, 'speechNotes'>
      ) }
    ) }
  ) }
);

export type UpdateSpeechNotesMutationVariables = Types.Exact<{
  ballot: Types.Scalars['ID'];
  side: Types.Side;
  speech: Types.Speech;
  newNotes: Types.Scalars['String'];
}>;


export type UpdateSpeechNotesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'assignSpeechNotes'>
);

export type GetExamNotesQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  ballot: Types.Scalars['ID'];
  side: Types.Side;
  witnessNum: Types.Scalars['Int'];
  examType: Types.ExamType;
  role: Types.Role;
}>;


export type GetExamNotesQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { ballot: (
      { __typename?: 'Ballot' }
      & { side: (
        { __typename?: 'BallotSide' }
        & Pick<Types.BallotSide, 'examNotes'>
      ) }
    ) }
  ) }
);

export type UpdateExamNotesMutationVariables = Types.Exact<{
  ballot: Types.Scalars['ID'];
  witnessNum: Types.Scalars['Int'];
  side: Types.Side;
  witness: Types.Scalars['Boolean'];
  cross: Types.Scalars['Boolean'];
  newNotes: Types.Scalars['String'];
}>;


export type UpdateExamNotesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'assignExamNotes'>
);


export const GetSpeechNotesDocument = gql`
    query getSpeechNotes($tournament: ID!, $ballot: ID!, $side: Side!, $speech: Speech!) {
  tournament(id: $tournament) {
    ballot(id: $ballot) {
      side(side: $side) {
        speechNotes(speech: $speech)
      }
    }
  }
}
    `;

export function useGetSpeechNotesQuery(options: Omit<Urql.UseQueryArgs<GetSpeechNotesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSpeechNotesQuery>({ query: GetSpeechNotesDocument, ...options });
};
export const UpdateSpeechNotesDocument = gql`
    mutation updateSpeechNotes($ballot: ID!, $side: Side!, $speech: Speech!, $newNotes: String!) {
  assignSpeechNotes(ballot: $ballot, side: $side, speech: $speech, notes: $newNotes)
}
    `;

export function useUpdateSpeechNotesMutation() {
  return Urql.useMutation<UpdateSpeechNotesMutation, UpdateSpeechNotesMutationVariables>(UpdateSpeechNotesDocument);
};
export const GetExamNotesDocument = gql`
    query getExamNotes($tournament: ID!, $ballot: ID!, $side: Side!, $witnessNum: Int!, $examType: ExamType!, $role: Role!) {
  tournament(id: $tournament) {
    ballot(id: $ballot) {
      side(side: $side) {
        examNotes(order: $witnessNum, type: $examType, role: $role)
      }
    }
  }
}
    `;

export function useGetExamNotesQuery(options: Omit<Urql.UseQueryArgs<GetExamNotesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetExamNotesQuery>({ query: GetExamNotesDocument, ...options });
};
export const UpdateExamNotesDocument = gql`
    mutation updateExamNotes($ballot: ID!, $witnessNum: Int!, $side: Side!, $witness: Boolean!, $cross: Boolean!, $newNotes: String!) {
  assignExamNotes(ballot: $ballot, exam: $witnessNum, side: $side, witness: $witness, cross: $cross, notes: $newNotes)
}
    `;

export function useUpdateExamNotesMutation() {
  return Urql.useMutation<UpdateExamNotesMutation, UpdateExamNotesMutationVariables>(UpdateExamNotesDocument);
};