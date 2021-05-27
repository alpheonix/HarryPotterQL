import graphql from 'graphql';
const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLID, GraphQLString } = graphql;

export default new GraphQLObjectType({
  name: 'BookCover',
  fields: {
    id: {
      type: GraphQLID,
    },
    country: {
      type: GraphQLString,
    },
    edition: {
      type: GraphQLString,
    },
    artist:{
      type: GraphQLString,
    },
    URL:{
      type: GraphQLString,
    }
    }
});
