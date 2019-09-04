import { gql } from 'apollo-boost';

export const addEmployeeMutation = gql`
  mutation($name: String!, $location: ID!, $age: Int!) {
      addEmployee(
        name: $name, 
        location: $location,
        age: $age
    ) {
      name
    }
  }`;

  export const deleteEmployeeMutation = gql`
  mutation($id: ID!) {
      deleteEmployee(
        id: $id
    ) {
      name
     }
  }`;