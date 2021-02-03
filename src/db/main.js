const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./public/db.sqlite3', (err) => {
  if (err) console.error('Error opening database: ', err);
})

ipcMain.on('db-get', (event, sql, object) => {
  database.all(sql, object, (err, rows) => {
    event.reply('db-get-reply', (err && err.message) || rows);
  })
})

ipcMain.on('db-insert', (event, sql, object) => {
  console.log('SQL: ' + sql);
  console.log(object);
  database.run(sql, object, (err) => {
    event.reply('db-insert-reply', err)
    console.log(err);
  });
})

ipcMain.on('db-update', (event, sql, object) => {
  database.run(sql, object, (err) => {
    event.reply('db-update-reply', err)
  });
})

ipcMain.on('db-delete', (event, sql, object) => {
  database.run(sql, object, (err) => {
    event.reply('db-delete-reply', err)
  });
})

