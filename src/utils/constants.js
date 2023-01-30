
export const isDev = process.env.NODE_ENV === "development";

export const SITE_URL = isDev ? 'http://localhost:3000/' : 'https://cadastrapet.co/'