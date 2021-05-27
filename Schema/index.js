import graphqlM from 'graphql';
import characterType from './types/Character.js'
import bookType from './types/Book.js'
import potionType from './types/Potion.js'
import spellType from './types/Spell.js'
import wandType from './types/Wand.js'
import broomType from './types/Broom.js'
import portKeyType from './types/PortKey.js'
import magicObjectInterface from './interface/MacigObject.js'
import CharacterOrder from './input/CharacterOrder.js';



const { GraphQLObjectType,GraphQLID, GraphQLList, GraphQLSchema,GraphQLString } = graphqlM;

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        Character: {
            type: new GraphQLList(characterType),
            args: {
              orderBy: {
                type: CharacterOrder,
                defaultValue: { field: 'id', direction: 'DESC' },
              },
            },
            resolve: async (_, { orderBy }, { supabase }) => {
              console.log('Resolver called: Query.character');
              // Our object fetched from our database
              const query = supabase.from('Characters')
              .select('*')
              .order(orderBy.field, { ascending: orderBy.direction === 'ASC' });
              const { data, error } = await query;
              if (error) {
                console.error(error);
              }
              return data;
            },
          },
          Book: {
            type: new GraphQLList(bookType),
            resolve: async (_, { orderBy }, { supabase }) => {
              console.log('Resolver called: Query.book');
              // Our object fetched from our database
              const query = supabase.from('Books').select('*');
              const { data, error } = await query;
              if (error) {
                console.error(error);
              }
              return data;
            },
          },
          Potion: {
            type: new GraphQLList(potionType),
            resolve: async (_, { orderBy }, { supabase }) => {
              console.log('Resolver called: Query.book');
              // Our object fetched from our database
              const query = supabase.from('Potions').select('*');
              const { data, error } = await query;
              if (error) {
                console.error(error);
              }
              return data;
            },
          },
          Spell: {
            type: new GraphQLList(spellType),
            resolve: async (_, { orderBy }, { supabase }) => {
              console.log('Resolver called: Query.book');
              // Our object fetched from our database
              const query = supabase.from('Spells').select('*');
              const { data, error } = await query;
              if (error) {
                console.error(error);
              }
              return data;
            },
          },
          MagicObject: {
            type: new GraphQLList(magicObjectInterface),
            resolve: async (_, { orderBy }, { supabase }) => {
              const query = supabase
                .from('MagicObjects')
                .select('WandID(*),BroomID(*),PortKeyID(*)');
    
              const { data,error } = await query;
              
              console.log(data);
              
              
              return data.map(o => o.WandID || o.BroomID || o.PortKeyID);;
            },
          },
    },
  });
  
  export default new GraphQLSchema({ query: queryType, types:[wandType,broomType,portKeyType] });