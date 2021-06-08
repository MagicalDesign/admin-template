const ENVS = ["localhost", "www.badu.com"] as const;

export type ENVS_TYPE = typeof ENVS[number];

export const ENV = window.location.hostname;
