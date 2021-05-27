import graphqlM from 'graphql';
import characterType from './types/Character.js'
import bookType from './types/Book.js'



const { GraphQLObjectType,GraphQLID, GraphQLList, GraphQLSchema,GraphQLString } = graphqlM;

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        Character: {
            type: new GraphQLList(characterType),
            resolve: async (_, { orderBy, gender }, { supabase }) => {
              console.log('Resolver called: Query.character');
              // Our object fetched from our database
              const query = supabase.from('Characters').select('*');
              const { data, error } = await query;
              if (error) {
                console.error(error);
              }
              return data;
            },
          },
          Book: {
            type: new GraphQLList(bookType),
            resolve: async (_, { orderBy, gender }, { supabase }) => {
              console.log('Resolver called: Query.book');
              // Our object fetched from our database
              const query = supabase.from('Books').select('*');
              const { data, error } = await query;
              if (error) {
                console.error(error);
              }
              return data;
            },
          },
    },
  });
  
  export default new GraphQLSchema({ query: queryType });