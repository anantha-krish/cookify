import { MAX_TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async (url, jsonBody = undefined) => {
  try {
    const fetchPromise = jsonBody
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBody),
        })
      : fetch(url);
    const res = await Promise.race([fetchPromise, timeout(MAX_TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`Error:${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};
/* export const getJSON = async url => {
  try {
    const res = await Promise.race([fetch(url), timeout(MAX_TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`Error:${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async (url, jsonBody) => {
  try {
    const fetchPromise = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonBody),
    });
    const res = await Promise.race([fetchPromise, timeout(MAX_TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`Error:${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
}; */
