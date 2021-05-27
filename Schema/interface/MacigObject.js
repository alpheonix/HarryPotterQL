import graphql from 'graphql';
import wandType from '../types/Wand.js';
import broomType from '../types/Broom.js';
import portKeyType from '../types/PortKey.js';

const {
GraphQLInterfaceType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = graphql;

const characterInterface = new GraphQLInterfaceType({
  name: 'MagicObject',
  resolveType: (obj) => {
      //console.log('tets',obj);
      
      if (obj.hardness) {
        return wandType;
      }
      if (obj.speed) {
        return broomType;
      }
      return portKeyType;
  },
  fields: () => ({
      id: {
        type: GraphQLID,
      },
      name: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
  }),
});

export default characterInterface;