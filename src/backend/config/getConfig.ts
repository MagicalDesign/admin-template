import { ENVS_TYPE, ENV } from "./env";
/**
 * 配置类型描述
 */
export type ConfigMap<T> = {
  [K in ENVS_TYPE]: T;
};

/**
 * 根据环境获取出环境配置
 * @param params - 参数
 */
export function getConfig<T>(params: ConfigMap<T>, fallBcackEnv: ENVS_TYPE): T {
  const config = params[ENV];
  if (config) {
    console.log("env", config);
    return config;
  } else {
    console.warn("fallbcack warning", fallBcackEnv);
    return params[fallBcackEnv];
  }
}
