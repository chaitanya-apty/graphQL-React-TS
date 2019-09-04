import { compare } from 'bcryptjs';

import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import { EmployeeType, LocationType, User } from '../../types/graphql-schema';
import { Mutation } from './mutation';
import Employee from '../../backend/models/Employee';
import Location from '../../backend/models/Location';
import Users from '../../backend/models/Users';

const RootQuery = new GraphQLObjectType({
    name: 'EmployeeLocation',
    fields: {
        employee: {
            type: EmployeeType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args, context) {
                return Employee.findById(args.id);
            }
        },
        location: {
            type: LocationType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args, context) {
                return await Location.findById(args.id);
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            async resolve(parent, args, request) {
                return await Employee.find();
            }
        },
        locations: {
            type: new GraphQLList(LocationType),
            async resolve(parent, args) {
               return await Location.find();
            }
        },
        login: {
            type: User,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, context) {
                // Check Chaitu exits
                const serverInstance = context.app;
                const user = await Users.findOne({ username: args['username'] }); // Getting chaitu hash
                if (!user) { throw new Error('User Not Found'); }
                const validPassword = await compare(args['password'], user['password']);

                if (!validPassword) { throw new Error('Invalid/Wrong Password'); }
                const token = serverInstance.jwt.sign({user}, { expiresIn: '1h' });
                return {username: args['username'], token};
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
