console.log({ starting: true });

import express from 'express';

const app = express();

import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString,
  GraphQLNonNull, GraphQLID } from 'graphql';
//testing : mutation{setNode: id:"id",value:"a value!"}
//testing : query{node(id:"id")}
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: { //add a "node" field to query
    viewer: {
      type: GraphQLString,
      resolve() {
        return 'viewer!';
      }
    },
    node: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(source, args) {
        return inMemoryStore[args.key];
      }
    }
  }
});
// initialize a store for the nodes.
let inMemoryStore = {};
const RootMutation = new GraphQLObjectType({
  name: 'RootMutation', //name setting, rest like before
  description: 'The root mutation', 
  fields: {
    setNode: {
      type: GraphQLString,
      args: {// args property, keys here are names of args allowed in field.
        id: {
          type: new GraphQLNonNull(GraphQLID) //queries must be non-null values
        },
        value: {
          type: new GraphQLNonNull(GraphQLString),
        }
      },
      //resolve function
      resolve(source, args) {  //field arguments
        inMemoryStore[args.key] = args.value;
        return inMemoryStore[args.key]; //inMemoryStore -> write the mutation
      }//go to line 58
    }
  }
});
//add mutation type to schema
const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});//goto line 14

app.use('/graphql', graphqlHTTP({ schema: Schema, graphiql: true }));

app.listen(3000, () => {
  console.log({ running: true });
});
