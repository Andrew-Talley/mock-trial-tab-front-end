import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ListJudgesQueryVariables = Types.Exact<{
  tournament: Types.Scalars['ID'];
}>;


export type ListJudgesQuery = (
  { __typename?: 'Query' }
  & { tournament: (
    { __typename?: 'Tournament' }
    & { judges: Array<Types.Maybe<(
      { __typename?: 'Judge' }
      & Pick<Types.Judge, 'id' | 'name'>
      & { conflicts: Array<Types.Maybe<(
        { __typename?: 'School' }
        & Pick<Types.School, 'name'>
      )>> }
    )>> }
  ) }
);


export const ListJudgesDocument = gql`
    query listJudges($tournament: ID!) {
  tournament(id: $tournament) {
    judges {
      id
      name
      conflicts {
        name
      }
    }
  }
}
    `;

export function useListJudgesQuery(options: Omit<Urql.UseQueryArgs<ListJudgesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ListJudgesQuery>({ query: ListJudgesDocument, ...options });
};