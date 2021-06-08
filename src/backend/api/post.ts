import { axios } from "./axios";
export interface UserInfo {
  name: string;
  token: string;
  hobbies: string[];
}

export interface API {
  "/getUser": {
    parameter: {
      account: string;
      password: string;
    };
    responese: UserInfo;
  };
}

export const post = async <P extends keyof API>(
  path: P,
  parameter: API[P]["parameter"]
): Promise<API[P]["parameter"]> => {
  return await axios.post(path, parameter);
};
