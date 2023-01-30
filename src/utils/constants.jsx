
export const isDev = process.env.NODE_ENV === "development";

export const SITE_URL = isDev ? 'https://localhost:5173/' : 'https://cadastrapet.com.br/'