import { 
    GraphQLObjectType, 
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} from 'graphql';
import { EmployeeType, LocationType } from '../../types/graphql-schema';
import { Mutation } from './mutation';
import Employee from '../../backend/models/Employee';
import Location from '../../backend/models/Location';

const RootQuery = new GraphQLObjectType({
    name: 'EmployeeLocation',
    fields: {
        employee: {
            type: EmployeeType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                return await Employee.findOne({
                    id: +args['id']
                })
            }
        },
        location: {
            type: LocationType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                return await Location.findOne({
                    id: +args['id']
                })
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            async resolve(parent, args) {
                return await Employee.find();
            }
        },
        locations: {
            type: new GraphQLList(LocationType),
            async resolve(parent, args) {
                return await Location.find();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})