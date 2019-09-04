import { gql } from 'apollo-boost';

export const getLocationList = gql`
{
    locations{
     id,
     name
    }
}
`;


export const getEmployeesList = gql` 
{ 
  employees{
   id,
   name,
   age
  }
}
`;

export const getEmployeeDetails = gql`
  query($id: ID!) {
    employee(id: $id) {
      name
      age
      location {
        name
      }
    }
  }
`;

export const getUserDetails = gql`
 query($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username,
      token
    }
 }
`
