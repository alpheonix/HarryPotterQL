import graphql from 'graphql';

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

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
