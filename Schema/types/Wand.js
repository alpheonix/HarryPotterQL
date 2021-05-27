import graphql from 'graphql';
import characterType from './Character.js'
import magicObjectInterface from '../interface/MacigObject.js'

const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLID, GraphQLString } = graphql;

export default new GraphQLObjectType({
  name: 'Wand',
  interfaces: () => ([magicObjectInterface]),
  fields: {
    id: {
        type: GraphQLID,
      },
      name: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
      owner: {
        type: characterType,
        resolve: async (Wand, args, { supabase }) => {
            const { data } = await supabase
              .from('Wands')
              .select('owner')
              .filter('id', 'eq', Wand.id);
                            
              const wands = data.map((o) => o.owner);
              const { data:dataWand } = await supabase
              .from('Characters')
              .select('*')
              .in('id',wands);
              
              const character = dataWand[0]
            return character;
          },
      },
      wood: {
        type: GraphQLString,
      },
      heart: {
        type: GraphQLString,
      },
      width: {
        type: GraphQLFloat,
      },
      hardness: {
        type: GraphQLString,
      },

  }
});
