import graphqlM from 'graphql';
import wizardType from './types/Wizard.js'


const { GraphQLObjectType,GraphQLID, GraphQLList, GraphQLSchema,GraphQLString } = graphqlM;

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        wizards: {
            type: new GraphQLList(wizardType),
            resolve: async (_, { orderBy, gender }, { supabase }) => {
              console.log('Resolver called: Query.strongestJedi');
              // Our object fetched from our database
              const query = supabase.from('Wizard').select('*');
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