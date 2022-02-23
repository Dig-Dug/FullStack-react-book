import * as data from './data';
import * as tables from './tables';
import * as database from './database';

const sequencePromises = function (promises) {
  return promises.reduce((promise, promiseFunction) => {
    return promise.then(() => {
      return promiseFunction();
    });
  }, Promise.resolve());
};
//queries in node-sql used with toQuery(), then pass getSql() from
//database.js
const createDatabase = () => { //running queries that create each table.
  let promises = [tables.users, tables.usersFriends, tables.posts].map((table) => {
    return () => database.getSql(table.create().toQuery());
  });

  return sequencePromises(promises);
};

const insertData = () => {
  let { users, posts, usersFriends } = data;

  let queries = [ //create queries using toQuery()
    tables.users.insert(users).toQuery(),
    tables.posts.insert(posts).toQuery(),
    tables.usersFriends.insert(usersFriends).toQuery(),
  ];
//queries execution "getSql"
  let promises = queries.map((query) => {
    return () => database.getSql(query);
  });
  return sequencePromises(promises);
};
//tie all together
createDatabase().then(() => {
  return insertData();
}).then(() => {
  console.log({ done: true });
});

//run in shell:
//$ node -e 'require("babel-register"); require("./src/seeData");'
//explore SQlite database use: https://dbeaver.io/
//next hook GraphQL schema to this created database.
