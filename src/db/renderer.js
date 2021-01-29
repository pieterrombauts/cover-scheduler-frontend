import { AnyAction } from "@reduxjs/toolkit";

const { ipcRenderer } = window.require('electron');

export function db_get(sql, object) {
  return new Promise((resolve) => {
    ipcRenderer.once('db-get-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('db-get', sql, object);
  })
}

export function db_update(sql, object) {
  return new Promise((resolve) => {
    ipcRenderer.once('db-update-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('db-update', sql, object)
  })
}

export function db_delete(sql, object) {
  return new Promise((resolve) => {
    ipcRenderer.once('db-delete-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('db-delete', sql, object)
  })
}