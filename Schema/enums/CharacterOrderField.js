import graphql from 'graphql';
const { GraphQLEnumType } = graphql;

export default new GraphQLEnumType({
  name: 'CharacterOrderField',
  description: 'The possible field for ordering characters.',
  values: {
    NAME: {
      value: 'name',
    },
    TITLE: {
        value: 'title',
      },
  },
});