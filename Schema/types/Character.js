import graphql from 'graphql';
const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLID, GraphQLString } = graphql;

export default new GraphQLObjectType({
  name: 'Wizard',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
}
});
