import { gql } from "@apollo/client";
import { REPOSITORY_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query (
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $after: String
    $first: Int
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      after: $after
      first: $first
    ) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
    }
  }

  ${REPOSITORY_DETAILS}
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            createdAt
            rating
            text
            repositoryId
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryDetails
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }

  ${REPOSITORY_DETAILS}
`;
