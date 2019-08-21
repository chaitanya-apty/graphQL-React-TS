import { gql } from 'apollo-boost';

export const addEmployeeMutation = gql`
  mutation(
      $name: String!, $id: ID!, $location: ID!, $age: Int!
    ) {
      addEmployee(
        id: $id,
        name: $name, 
        location: $location,
        age: $age
    ) {
      name
    }
  }`;

  export const deleteEmployeeMutation = gql`
  mutation(
      $id: ID!
    ) {
      deleteEmployee(
        id: $id
    ) {
      name
     }
  }`;