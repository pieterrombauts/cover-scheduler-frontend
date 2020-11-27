const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./public/db.sqlite3', (err) => {
  if (err) console.error('Error opening database: ', err);
})

ipcMain.on('asynchronous-message', (event, arg) => {
  const sql = arg;
  database.all(sql, (err, rows) => {
    event.reply('asynchronous-reply', (err && err.message) || rows);
  })
})

