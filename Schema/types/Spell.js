import graphql from 'graphql';

const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLID, GraphQLString } = graphql;

export default new GraphQLObjectType({
  name: 'Spell',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    other_name: {
      type: GraphQLString,
    },
    pronunciation: {
        type: GraphQLString,
      },
      spell_type: {
        type: GraphQLString,
      },
      mention: {
        type: GraphQLString,
      },
      etymology: {
        type: GraphQLString,
      },
      note: {
        type: GraphQLString,
      },
}
});
