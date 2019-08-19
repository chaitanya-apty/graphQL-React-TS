import { gql } from 'apollo-boost';

export const getLocationList = gql`{
    locations{
     id,
     name,
     pincode
    }
}`;


export const getEmployeeList = gql` 
{ 
  employees{
   name,
   age,
   location {
     name,
     pincode
   }
  }
}
`;

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
      name,
      age
    }
  }`;