import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';
import { getConfigValue, setConfigValue } from './config';

const baseUrl = 'https://indreams.me';
const hmacSecret = 'gUkXp2s5v8y/B?E(H+MbQeThWmYq3t6w';

export interface CookieStringObject { [key: string]: undefined | string | number | boolean };
export interface QueryStringObject { [key: string]: undefined | string | number | string[] | number[] };

function stringifyCookie(cookie: CookieStringObject): string {
  if (!cookie)
    return '';
  return Object.entries(cookie).map(([key, value]) => {
    if (value === true)
      return key;
    return `${key}=${value}`;
  }).join('; ');
}

function parseCookieString(cookieString: string): CookieStringObject {
  return cookieString.split('; ').reduce((cookieObject, item) => {
    const [key, value] = item.split(/\=(.+)/);
    cookieObject[key] = value !== undefined ? value : true;
    return cookieObject;
  }, {});
}

function parseSetCookie(setCookie: string[]): CookieStringObject {
  const cookieParts = setCookie.map((part: string) => parseCookieString(part));
  return Object.assign({}, ...cookieParts);
}

function stringifyQuery(query: QueryStringObject): string {
  if (!query)
    return '';
  const queryArray = Object.entries(query).map(([key, value]) => {
    return `${key}=${encodeURIComponent(Array.isArray(value) ? value.join('+') : value)}`;
  });
  return queryArray.length > 0 ? `?${queryArray.join('&')}` : '';
}

function parseJsonWebToken(token: string): { header: any; payload: any; signature: string } {
  const parts = token.split('.').map(part => Buffer.from(part, 'base64').toString('ascii'));
  return {
    header: JSON.parse(parts[0]),
    payload: JSON.parse(parts[1]),
    signature: parts[2]
  };
}

function updateCookieFromResponse(response: AxiosResponse): void {
  const headers = response.headers;
  if (headers['set-cookie']) {
    const newCookie = parseSetCookie(headers['set-cookie']);
    const oldCookie = getConfigValue('Cookie');
    setConfigValue('Cookie', {
      ...oldCookie,
      ...newCookie,
    });
  }
}

function authHeaders(path: string, body: string): { 'X-Auth': string; 'X-Ts': number } {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const hmac = crypto.createHmac('sha256', hmacSecret);
  if (body) {
    hmac.update(body);
  }
  hmac.update(path);
  hmac.update(timestamp.toString());
  return {
    'X-Auth': hmac.digest('hex'),
    'X-Ts': timestamp
  };
}

function jwtHeaders(): { Cookie: string } {
  const cookie = getConfigValue('Cookie');
  return {
    'Cookie': stringifyCookie(cookie)
  };
}

export async function requestGet(endpoint: string, queryObject: QueryStringObject): Promise<AxiosResponse> {
  const path = endpoint + stringifyQuery(queryObject);
  try {
    const response = await axios.get(`${baseUrl}${path}`, {
      headers: {
        ...jwtHeaders(),
        ...authHeaders(path, null)
      }
    });
    updateCookieFromResponse(response);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function requestPost(path: string, body: any): Promise<AxiosResponse> {
  try {
    const response = await axios.post(`${baseUrl}${path}`, body, {
      headers: {
        ...jwtHeaders(),
        ...authHeaders(path, JSON.stringify(body))
      }
    });
    updateCookieFromResponse(response);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function requestPostAudio(path: string, filename: string, body: any): Promise<AxiosResponse> {
  const safeFilename = encodeURIComponent(filename);
  try {
    const response = await axios.post(`${baseUrl}${path}`, body, {
      headers: {
        ...jwtHeaders(),
        ...authHeaders(path, safeFilename),
        'X-Filename': safeFilename
      }
    });
    updateCookieFromResponse(response);
    return response;
  } catch (error) {
    return error.response;
  }
}

// changes made by mr.asterisk

// Added explicit return types for functions.
// Improved the type annotations for interfaces and function parameters.
// Ensured proper handling of Promise rejections using try-catch blocks and async/await syntax.
// Enhanced the readability of code by applying consistent spacing and formatting.
// Adjusted the access modifiers to be more precise.
// more coming soon...
