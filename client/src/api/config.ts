export const configServer = {
  serverURL: import.meta.env.VITE_SERVER_URL,
  port: import.meta.env.VITE_SERVER_PORT,
  apiVersion: import.meta.env.VITE_SERVER_API_VERSION,
};

export const serverURL = `${configServer.serverURL}:${configServer.port}/api/${configServer.apiVersion}`;
