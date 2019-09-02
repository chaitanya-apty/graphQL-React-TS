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
  query ($id: ID!) {
    employee(id: $id) {
      name
      age
      location {
        name
      }
    }
  }
`;
