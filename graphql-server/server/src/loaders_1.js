import * as database from './database';
import * as tables from './tables';
//purpose here is to exposed APIs  that load data from the source.
export const getNodeById = (nodeId) => {
  //nodeId <- globally unique node ID 
  //splitNodeId for database specific info extraction
  const { tableName, dbId } = tables.splitNodeId(nodeId);

  const table = tables[tableName];
  const query = table
    .select(table.star())
    .where(table.id.equals(dbId))
    .limit(1)
    .toQuery();

  return database.getSql(query).then((rows) => {
    if (rows[0]) {
      //__tableName property copy for security, used in types.js
      // promise
      rows[0].__tableName = tableName;
    }
    return rows[0];
  });
};
//Here
export const getFriendIdsForUser = (userSource) => {
  const table = tables.usersFriends;
  const query = table
    .select(table.user_id_b)
    .where(table.user_id_a.equals(userSource.id))
    .toQuery();

  return database.getSql(query).then((rows) => {
    rows.forEach((row) => {
      row.__tableName = tables.users.getName();
    });
    return rows;
  });
};

export const getUserNodeWithFriends = (nodeId) => {
  const { tableName, dbId } = tables.splitNodeId(nodeId);

  const query = tables.users
    .select(tables.usersFriends.user_id_b, tables.users.star())
    .from(
      tables.users.leftJoin(tables.usersFriends)
      .on(tables.usersFriends.user_id_a.equals(tables.users.id))
    )
    .where(tables.users.id.equals(dbId))
    .toQuery();


  return database.getSql(query).then((rows) => {
    if (!rows[0]) {
      return undefined;
    }

    const __friends = rows.map((row) => {
      return {
        user_id_b: row.user_id_b,
        __tableName: tables.users.getName()
      }
    });

    const source = {
      id: rows[0].id,
      name: rows[0].name,
      about: rows[0].about,
      __tableName: tableName,
      __friends: __friends
    };
    return source;
  });
};
