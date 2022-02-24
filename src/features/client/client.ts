import { AxiosInstance } from "axios";
import { createContext, useCallback, useContext, useState } from "react";

const axios = require("axios").default;

export enum ApiType {
  sandbox = "sandbox",
  prom = "prom",
}

const urls = {
  [ApiType.sandbox]: "https://sandbox.toloka.yandex.com/api/v1",
  [ApiType.prom]: "https://toloka.yandex.com/api/v1",
};

type ClientSettings = {
  client: AxiosInstance;
  type?: ApiType;
  tokens: {
    [ApiType.sandbox]?: string;
    [ApiType.prom]?: string;
  };
};

export function getSavedClient() {
  const settingsJson = window.localStorage.getItem("client");
  const client = axios.create();
  if (!settingsJson) {
    return { client, tokens: {} } as ClientSettings;
  } else {
    const settings = JSON.parse(settingsJson) as ClientSettings;
    if (!settings.tokens) settings.tokens = {};
    settings.client = client;
    if (settings.type) {
      const token = settings.tokens?.[settings.type];
      if (token) setClient(client, settings.type, token);
    }
    return settings;
  }
}

function saveClient(settings: ClientSettings) {
  window.localStorage.setItem(
    "client",
    JSON.stringify({
      type: settings.type,
      tokens: settings.tokens,
    })
  );
}

export const clientCtx = createContext<ClientSettings>(getSavedClient());

export function useClient() {
  const settings = useContext(clientCtx);
  const { client } = settings;

  const newClient = useCallback(
    (type: ApiType, token: string) => {
      setClient(client, type, token);
      settings.tokens[type] = token;
      saveClient(settings);
    },
    [client, settings]
  );
  return { newClient, client };
}

function setClient(client: AxiosInstance, type: ApiType, token: string) {
  client.defaults.baseURL = urls[type];
  client.defaults.withCredentials = true;
  client.defaults.headers.common["Authorization"] = `OAuth ${token}`;
  client.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  client.defaults.headers.common["Access-Control-Allow-Methods"] = "*";
}
