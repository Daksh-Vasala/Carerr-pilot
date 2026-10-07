import createDebug from "debug";

export const createDebugger = (namespace: string) => {
  return createDebug(`careerpilot:${namespace}`);
};
