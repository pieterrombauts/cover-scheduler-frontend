const { ipcRenderer } = window.require('electron');
var uuid = require('random-uuid-v4');

export function db_get(sql, object) {
  const rand = uuid();
  return new Promise((resolve) => {
    ipcRenderer.once(`DB.GET.${rand}`, (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('DB.GET', sql, object, rand);
  })
}

export function db_insert(sql, object) {
  const rand = uuid();
  return new Promise((resolve) => {
    ipcRenderer.once(`DB.INSERT.${rand}`, (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('DB.INSERT', sql, object, rand)
  })
}

export function db_update(sql, object) {
  const rand = uuid();
  return new Promise((resolve) => {
    ipcRenderer.once(`DB.UPDATE.${rand}`, (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('DB.UPDATE', sql, object, rand)
  })
}

export function db_update_bulk(sql, array) {
  const rand = uuid();
  return new Promise((resolve) => {
    ipcRenderer.once(`DB.UPDATEBULK.${rand}`, (_, arg) => {
      console.log(arg);
      resolve(arg);
    });
    ipcRenderer.send('DB.UPDATEBULK', sql, array, rand)
  })
}

export function db_delete(sql, object) {
  const rand = uuid();
  return new Promise((resolve) => {
    ipcRenderer.once(`DB.DELETE.${rand}`, (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('DB.DELETE', sql, object, rand)
  })
}