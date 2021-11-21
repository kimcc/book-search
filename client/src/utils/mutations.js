import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!,
  $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// FIX ME
export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String]!, $description: String!, $title: String!) {
    saveBook(authors: $authors, description: $description, title: $title) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

// FIX ME
export const REMOVE_BOOK = gql`

`;