import gql from 'graphql-tag';

export const FETCH_GRAPHQL_QUERY = gql`
  {
      getMarkers{
          id
          username
          category
          lat
          lng
          image
          body
          createdAt
      },
      getUsers{
          id
          username
          email
          image
          createdAt
          followings {
            id
            username
            createdAt
          }
          followers {
            id
            username
            createdAt
          }

      }
}`
