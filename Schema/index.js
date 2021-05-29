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
import graphqlRelay from 'graphql-relay';
const { mutationWithClientMutationId } = graphqlRelay;


const { GraphQLObjectType,GraphQLID, GraphQLList, GraphQLSchema,GraphQLString, GraphQLNonNull } = graphqlM;

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        Character: {
            type: new GraphQLList(characterType),
            args: {
              orderBy: {
                type: CharacterOrder,
                defaultValue: { field: 'name', direction: 'ASC' },
              },
              gender:{
                type: GraphQLString,
               
              },
              species:{
                type: GraphQLString,
                
              },
              id:{
                type: GraphQLID,
                
              }
            },
            resolve: async (_, { orderBy,gender,species,id }, { supabase }) => {
              console.log('Resolver called: Query.character');
              // Our object fetched from our database
              const query = supabase.from('Characters')
              .select('*')
              .order(orderBy.field, { ascending: orderBy.direction === 'ASC' });
              console.log("test",gender);

              if(gender){
                
                query.filter('gender','eq',gender)
              }
              if (species) {
                query.filter('species','eq',species)
              }
              if (id) {
                query.filter('id','eq',id)
              }
              const { data, error } = await query;
              if (error) {
                console.error('tet',error);
              }
              return data;
            },
          },
          Book: {
            args: {
              orderBy: {
                type: CharacterOrder,
                defaultValue: { field: 'title', direction: 'ASC' },
              }
            },
            type: new GraphQLList(bookType),
            resolve: async (_, { orderBy }, { supabase }) => {
              console.log('Resolver called: Query.book');
              // Our object fetched from our database
              const query = supabase.from('Books')
              .select('*')
              .order(orderBy.field, { ascending: orderBy.direction === 'ASC' });
              const { data, error } = await query;
              if (error) {
                console.error(error);
              }
              return data;
            },
          },
          Potion: {
            args: {
              orderBy: {
                type: CharacterOrder,
                defaultValue: { field: 'name', direction: 'ASC' },
              }
            },
            type: new GraphQLList(potionType),
            resolve: async (_, { orderBy }, { supabase }) => {
              console.log('Resolver called: Query.book');
              // Our object fetched from our database
              const query = supabase.from('Potions')
              .select('*')
              .order(orderBy.field, { ascending: orderBy.direction === 'ASC' });
              const { data, error } = await query;
              if (error) {
                console.error(error);
              }
              return data;
            },
            
          },
          Spell: {
            args: {
              orderBy: {
                type: CharacterOrder,
                defaultValue: { field: 'name', direction: 'ASC' },
              },
              spell_type: {
                type: GraphQLString,
              }
            },
            type: new GraphQLList(spellType),
            resolve: async (_, { orderBy,spell_type }, { supabase }) => {
              console.log('Resolver called: Query.book');
              // Our object fetched from our database
              const query = supabase.from('Spells')
              .select('*')
              .order(orderBy.field, { ascending: orderBy.direction === 'ASC' });

              if (spell_type) {
                query.filter('spell_type','eq',spell_type)
              }
              const { data, error } = await query;
              if (error) {
                console.error(error);
              }
              return data;
            },
          },
          MagicObject: {
            args: {
              orderBy: {
                type: CharacterOrder,
                defaultValue: { field: 'name', direction: 'ASC' },
              }
            },
            type: new GraphQLList(magicObjectInterface),
            resolve: async (_, { orderBy }, { supabase }) => {
              const query = supabase
                .from('MagicObjects')
                .select('WandID(*),BroomID(*),PortKeyID(*)')
                .order(orderBy.field, { ascending: orderBy.direction === 'ASC' });
    
              const { data } = await query;
              
              console.log(data);
              
              
              return data.map(o => o.WandID || o.BroomID || o.PortKeyID);
            },
          },
    },
  });
  
  const addPotionMutation = mutationWithClientMutationId({
    name: 'AddPotion',
    description: 'Adds a potion to the Potions table',
    inputFields: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
      description: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    outputFields: {
      potion: {
        type: potionType,
      },
    },
    mutateAndGetPayload: async (input, { supabase }) => {
      console.log(
        'Mutation.addPotion called with input: ' + JSON.stringify(input, null, 2)
      );
      const { name, description } = input;
const {data:dataPot} = await supabase.from('Potions').select('id');
        
      const query = supabase.from('Potions')
        .insert([{id:dataPot.length +1,name: name, description: description}]);
        const {data,error} = await query;
        if (error) {
          console.error(error);
        }

        return {potion:data[0]}
      },
  });  

  const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addPotion: addPotionMutation,
    },
  });
  
  export default new GraphQLSchema({ query: queryType, mutation: mutationType, types:[wandType,broomType,portKeyType] });