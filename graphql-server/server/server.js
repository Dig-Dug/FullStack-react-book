//debug that code is working. Running node index.js: "starting true"
console.log({ starting: true });

//import express package 
import express from 'express';
import basicAuth from 'basic-auth-connect';
//create new instance(server) go to line 101
const app = express();
//dependencies from GraphQl libraries
import graphqlHTTP from 'express-graphql';
//import new dependencies:
//GraphQLID  is js analog to scalar id. GraphQlNonNull(for fields args)
//go to server_mutation.js line 34.
import { GraphQLSchema, GraphQLObjectType, GraphQLString,
  GraphQLNonNull, GraphQLID, GraphQLEnumType } from 'graphql';

import {
  NodeInterface,
  UserType,
  PostType
} from './src/types';

import * as loaders from './src/loaders';
//GraphQLObjectType, like defining a new class, give name and description
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery', //schema´s name (using ...on RootQuery)
  description: 'The root query',
  fields: { //each key here is a new field and properties
    viewer: { //properties 
      type: NodeInterface, //type(basic scalar types)
      resolve(source, args, context) { //function returning value from field("viewer").
       //goto line 87
        return loaders.getNodeById(context);
      }
    },
    node: {
      type: NodeInterface,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(source, args, context, info) {
        return loaders.getNodeById(args.id);
      }
    }
  }
});

const LevelEnum = new GraphQLEnumType({
  name: 'PrivacyLevel',
  values: {
    PUBLIC: {
      value: 'public'
    },
    ACQUAINTANCE: {
      value: 'acquaintance'
    },
    FRIEND: {
      value: 'friend'
    },
    TOP: {
      value: 'top'
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation',
  fields: {
    createPost: {
      type: PostType,
      args: {
        body: {
          type: new GraphQLNonNull(GraphQLString)
        },
        level: {
          type: new GraphQLNonNull(LevelEnum),
        }
      },
      resolve(source, args, context) {
        return loaders.createPost(args.body, args.level, context).then((nodeId) => {
          return loaders.getNodeById(nodeId);
        });
      }
    }
  }
});
//create instance of GraphQlSchema, needed before resolving queries.
//Scheamas have 2 properties: query and mutation
const Schema = new GraphQLSchema({
  types: [UserType, PostType],
  //both of this properties take GraphQl intances. Goto line 99
  query: RootQuery, 
  mutation: RootMutation,
});

app.use(basicAuth(function(user, pass) {
  return pass === 'mypassword1';
}));
//Hook everything to Express
app.use('/graphql', graphqlHTTP((req) => {
  const context = 'users:' + req.user; //use of schema avoids manually
  //writing a handler function. go back to txt.
  return { schema: Schema, graphiql: true, context: context, pretty: true };
}));
//tell server to start listening for traffic on port 3000,
//back to graphQlServer.txt
app.listen(3000, () => {
  console.log({ running: true });
  console.log('The password is: mypassword1');
});
