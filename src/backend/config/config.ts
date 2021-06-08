import { ENV, ENVS_TYPE } from "./env";
import { getConfig } from "./getConfig";

interface Config {
  baseURL: string;
  status: {
    mode: string;
  };
}

export const config = getConfig<Config>(
  {
    "www.badu.com": {
      baseURL: "http://flapnote.com",
      status: {
        mode: "production",
      },
    },
    localhost: {
      baseURL: "http://flapnote.com",
      status: {
        mode: "development",
      },
    },
  },
  "localhost"
);
