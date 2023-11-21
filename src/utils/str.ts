const getEnv = (key: string): string => {
  return window._env_?.[key] || '';
};

const str = { getEnv };
export default str;
