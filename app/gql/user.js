import gql from 'graphql-tag'

export const UserQuery = gql`
  query {
    loggedInUser {
      id
      githubUserId
    }
  }
`;

export const GithubAuthenticationMutation = gql`
  mutation authenticate($githubCode: String!) {
    authenticateUser(githubCode: $githubCode) {
      token
    }
  }
`;
