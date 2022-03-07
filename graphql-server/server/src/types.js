//file needed to hold types which allow query making.
//
import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

import * as tables from './tables';
import * as loaders from './loaders';

import {
  connectionDefinitions
} from 'graphql-relay';
//define Node interface
export const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: {//globally unique id field, possible with previously
//importing APIs  and instantiating GraphQlInterfaceType
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolveType: (source) => { //takes raw data "source" from database
    if (source.__tableName === tables.users.getName()) {//__tableName is
      //a prop from source
      return UserType; //defined under
    }
    return PostType; //defined under
  }
});

const resolveId = (source) => {//dbIdToNodeId goes in tables.js
  return tables.dbIdToNodeId(source.id, source.__tableName);
};
//2 Instances of GraphQLObjectType, add nodeInterface to their interfaces
//and field implementation, resolve is needed for accuracy. ResolveId function
//used for field checking
export const UserType = new GraphQLObjectType({
  name: 'User',
  interfaces: [ NodeInterface ],
  // Note that this is now a function
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: resolveId
      },
      name: { type: new GraphQLNonNull(GraphQLString) },
      about: { type: new GraphQLNonNull(GraphQLString) },
     //Add new friends field returning GraphQLList of IDs
      friends: {
        type: new GraphQLList(UserType),
        resolve(source) { //invoking new loader(imported earlier)
          //goto loaders_1.js line 25
          return loaders.getFriendIdsForUser(source).then((rows) => {
            const promises = rows.map((row) => {
              const friendNodeId = tables.dbIdToNodeId(row.user_id_b, row.__tableName);
              return loaders.getNodeById(friendNodeId);
            });
            return Promise.all(promises);
          })
        }
      }, 
      posts: {
        type: PostsConnectionType,
        args: {
          after: {
            type: GraphQLString
          },
          first: {
            type: GraphQLInt
          },
        },
        resolve(source, args, context) {
          return loaders.getPostIdsForUser(source, args, context).then(({ rows, pageInfo }) => {
            const promises = rows.map((row) => {
              const postNodeId = tables.dbIdToNodeId(row.id, row.__tableName);
              return loaders.getNodeById(postNodeId).then((node) => {
                const edge = {
                  node,
                  cursor: row.__cursor,
                };
                return edge;
              });
            });

            return Promise.all(promises).then((edges) => {
              return {
                edges,
                pageInfo
              }
            });

          })
        }
      }
    };
  }
});

export const PostType = new GraphQLObjectType({
  name: 'Post',
  interfaces: [ NodeInterface ],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: resolveId
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

const { connectionType: PostsConnectionType } = connectionDefinitions({ nodeType: PostType });
