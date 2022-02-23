import sqlite3 from 'sqlite3';

import * as tables from './tables';
//defining and exporting database
export const db = new sqlite3.Database('./db.sqlite');
//export function for running asynchronous promised queries
export const getSql = (query) => {
  return new Promise((resolve, reject) => {
    console.log(query.text);
    console.log(query.values);
    db.all(query.text, query.values, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      } //goto seeData.jsgoto seeData.jsgoto seeData.jsgoto seeData.js
    });
  });
};
