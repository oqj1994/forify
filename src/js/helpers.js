import { async } from 'regenerator-runtime';
import { TIMEOUT_SECOND } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECOND)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`(${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
/*
export const getJson = async function (url) {
  // const response = await fetch(`${config.API_URL}/${id}`);
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECOND)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`(${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJson = async function (url, upLoadData) {
  // const response = await fetch(`${config.API_URL}/${id}`);
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upLoadData),
    });
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECOND)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`(${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
*/
