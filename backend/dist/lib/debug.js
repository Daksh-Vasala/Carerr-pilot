import createDebug from "debug";
export const createDebugger = (namespace) => {
    return createDebug(`careerpilot:${namespace}`);
};
