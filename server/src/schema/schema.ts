import { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLInt,
    GraphQLList
} from 'graphql';

//Dummy Data
const movies = [{
    id: 1,
    name: 'Bahubhali',
    genre: 'Action',
    dirId: 2
}, {
    id: 2,
    name: 'Athadu',
    genre: 'Action',
    dirId: 1
},{
    id: 3,
    name: 'Julai',
    genre: 'Action',
    dirId: 1
}];

const directors = [{
    id: 1,
    name: 'Trivikram',
    age: 44
}, {
    id: 2,
    name: 'Rajamouli',
    age: 55
}];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirType,
            resolve(parent, args) {
                return directors.find(dir => dir.id === parent['dirId'])
            }
        }
    })
});

const DirType = new GraphQLObjectType({
    name: 'Directors',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies.filter(mov => mov.dirId === parent['id'])
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'MovieDirector',
    fields: {
        movie: {
            type: MovieType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return movies.find(mov => mov.id === args['id']);
            }
        },
        director: {
            type: DirType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return directors.find(mov => mov.id === args['id']);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies;
            }
        },
        directors: {
            type: new GraphQLList(DirType),
            resolve(parent, args) {
                return directors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})