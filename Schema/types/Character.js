import graphql from 'graphql';
import bookType from './Book.js'

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
    birth: {
      type: GraphQLString,
    },
    death:{
      type: GraphQLString,
    },
    species:{
      type: GraphQLString,
    },
    ancestry:{
      type: GraphQLString,
    },
    gender:{
      type: GraphQLString,
    },
    hair_color:{
      type: GraphQLString,
    },
    eye_color:{
      type: GraphQLString,
    },
    wand:{
      type: GraphQLString,
    },
    patronus:{
      type: GraphQLString,
    },
    house:{
      type: GraphQLString,
    },
    associated_groups:{
      type: GraphQLList(GraphQLString),
    },
    books_featured_in:{
      type: GraphQLList(bookType),
      resolve: async (Char, args, { supabase }) => {
        const { data } = await supabase
          .from('Characters')
          .select('books_featured_in')
          .filter('id', 'eq', Char.id);
          
          const books = data.map((o) => o.books_featured_in);
          const { data:dataBook } = await supabase
          .from('Books')
          .select('*')
          .in('id',books);
          
        return dataBook;
      },
    },
    }
});
