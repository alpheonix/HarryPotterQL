import graphql from 'graphql';
import OrderDirection from '../enums/OrderDirections.js';
import CharacterOrderField from '../enums/CharacterOrderField.js';
const { GraphQLInputObjectType } = graphql;

export default new GraphQLInputObjectType({
  name: 'CharacterOrder',
  fields: {
    direction: {
      type: OrderDirection,
    },
    field: {
      type: CharacterOrderField,
    },
  },
});