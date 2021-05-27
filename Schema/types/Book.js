import graphql from 'graphql';
import characterType from './Character.js'
import bookCoverType from './BookCover.js'
const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLID, GraphQLString } = graphql;

export default new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    author: {
      type: GraphQLString,
    },
    publish_date_UK:{
      type: GraphQLString,
    },
    plot_take_place_years:{
      type: GraphQLList(GraphQLString),
    },
    book_covers:{
      type: GraphQLList(bookCoverType),
      resolve: async (Book, args, { supabase }) => {
        const { data } = await supabase
          .from('Books')
          .select('book_covers')
          .filter('id', 'eq', Book.id);
          
          
          const books = data.map((o) => o.book_covers);
          const { data:dataBookCover } = await supabase
          .from('BookCovers')
          .select('*')
          .in('id',books);
          
        return dataBookCover;
      },
    },
    characters:{
      type: GraphQLList(characterType),
      resolve: async (Book, args, { supabase }) => {
        const { data } = await supabase
          .from('Books')
          .select('characters')
          .filter('id', 'eq', Book.id);
          
          
          const books = data.map((o) => o.characters);
          const { data:dataBookCover } = await supabase
          .from('Characters')
          .select('*')
          .in('id',books);
          
        return dataBookCover;
      },
    }
    })
});
