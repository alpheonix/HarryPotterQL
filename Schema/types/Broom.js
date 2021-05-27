import graphql from 'graphql';
import magicObjectInterface from '../interface/MacigObject.js'


const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLID, GraphQLString } = graphql;

export default new GraphQLObjectType({
  name: 'Broom',
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
      wood: {
        type: GraphQLString,
      },
      speed: {
        type: GraphQLInt,
      },

    }
});
