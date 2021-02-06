const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./public/db.sqlite3', (err) => {
  if (err) console.error('Error opening database: ', err);
})

ipcMain.on('DB.GET', (event, sql, object, rand) => {
  database.all(sql, object, (err, rows) => {
    event.reply(`DB.GET.${rand}`, (err && err.message) || rows);
  })
})

ipcMain.on('DB.INSERT', (event, sql, object, rand) => {
  database.run(sql, object, (err) => {
    event.reply(`DB.INSERT.${rand}`, err)
  });
})

ipcMain.on('DB.UPDATE', (event, sql, object, rand) => {
  database.run(sql, object, (err) => {
    event.reply(`DB.UPDATE.${rand}`, err)
  });
})

ipcMain.on('DB.UPDATEBULK', (event, sql, array, rand) => {
  database.serialize(() => {
    database.run("BEGIN TRANSACTION");
    for (var i = 0; i < array.length; i++) {
      database.run(sql, {$practice: array[i].practice, $day: array[i].day, $session: array[i].session, $staff: array[i].staff, $staff_alt: array[i].staff_alt});
    }
    database.run("COMMIT", {}, (err) => {
      event.reply(`DB.UPDATEBULK.${rand}`, err)
    });
  })
})

ipcMain.on('DB.DELETE', (event, sql, object, rand) => {
  database.run(sql, object, (err) => {
    event.reply(`DB.DELETE.${rand}`, err)
  });
})

