import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation ($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        username
      }
    }
  }
`;

export const CREATEREVIEW = gql`
  mutation ($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
      rating
      repository {
        fullName
      }
      text
      user {
        username
      }
    }
  }
`;

export const CREATEUSER = gql`
  mutation ($user: CreateUserInput) {
    createUser(user: $user) {
      id
      createdAt
      reviewCount
      username
    }
  }
`;
