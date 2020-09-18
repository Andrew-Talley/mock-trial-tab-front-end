import * as Types from '../../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SpeechScoreQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  ballot: Types.Scalars['ID'];
  side: Types.Side;
  speech: Types.Speech;
}>;


export type SpeechScoreQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { ballot: (
      { __typename?: 'Ballot' }
      & { side: (
        { __typename?: 'BallotSide' }
        & Pick<Types.BallotSide, 'speech'>
      ) }
    ) }
  ) }
);

export type ExamScoreQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
  ballot: Types.Scalars['ID'];
  side: Types.Side;
  role: Types.Role;
  type: Types.ExamType;
  witnessNum: Types.Scalars['Int'];
}>;


export type ExamScoreQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { ballot: (
      { __typename?: 'Ballot' }
      & { side: (
        { __typename?: 'BallotSide' }
        & Pick<Types.BallotSide, 'exam'>
      ) }
    ) }
  ) }
);

export type UpdateSpeechMutationVariables = Types.Exact<{
  ballot: Types.Scalars['ID'];
  side: Types.Side;
  speech: Types.Speech;
  score: Types.Scalars['Int'];
}>;


export type UpdateSpeechMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'assignSpeechScore'>
);

export type UpdateExamMutationVariables = Types.Exact<{
  ballot: Types.Scalars['ID'];
  side: Types.Side;
  witnessNum: Types.Scalars['Int'];
  cross: Types.Scalars['Boolean'];
  witness: Types.Scalars['Boolean'];
  score: Types.Scalars['Int'];
}>;


export type UpdateExamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'assignExamScore'>
);


export const SpeechScoreDocument = gql`
    query speechScore($tournament: ID!, $ballot: ID!, $side: Side!, $speech: Speech!) {
  tournament(id: $tournament) {
    ballot(id: $ballot) {
      side(side: $side) {
        speech(speech: $speech)
      }
    }
  }
}
    `;

export function useSpeechScoreQuery(options: Omit<Urql.UseQueryArgs<SpeechScoreQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SpeechScoreQuery>({ query: SpeechScoreDocument, ...options });
};
export const ExamScoreDocument = gql`
    query examScore($tournament: ID!, $ballot: ID!, $side: Side!, $role: Role!, $type: ExamType!, $witnessNum: Int!) {
  tournament(id: $tournament) {
    ballot(id: $ballot) {
      side(side: $side) {
        exam(order: $witnessNum, role: $role, type: $type)
      }
    }
  }
}
    `;

export function useExamScoreQuery(options: Omit<Urql.UseQueryArgs<ExamScoreQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ExamScoreQuery>({ query: ExamScoreDocument, ...options });
};
export const UpdateSpeechDocument = gql`
    mutation updateSpeech($ballot: ID!, $side: Side!, $speech: Speech!, $score: Int!) {
  assignSpeechScore(ballot: $ballot, side: $side, speech: $speech, score: $score)
}
    `;

export function useUpdateSpeechMutation() {
  return Urql.useMutation<UpdateSpeechMutation, UpdateSpeechMutationVariables>(UpdateSpeechDocument);
};
export const UpdateExamDocument = gql`
    mutation updateExam($ballot: ID!, $side: Side!, $witnessNum: Int!, $cross: Boolean!, $witness: Boolean!, $score: Int!) {
  assignExamScore(ballot: $ballot, side: $side, exam: $witnessNum, cross: $cross, witness: $witness, score: $score)
}
    `;

export function useUpdateExamMutation() {
  return Urql.useMutation<UpdateExamMutation, UpdateExamMutationVariables>(UpdateExamDocument);
};