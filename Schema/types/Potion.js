import graphql from 'graphql';

const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLID, GraphQLString } = graphql;

export default new GraphQLObjectType({
  name: 'Potion',
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
}
});
