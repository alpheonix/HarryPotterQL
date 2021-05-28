import graphqlM from 'graphql';

const { GraphQLInputObjectType } = graphqlM;

const { GraphQLString } = graphqlM;

export default new GraphQLInputObjectType({
  name: 'PotionInput',
  fields: {
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
  },
});