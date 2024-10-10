declare type UseFeatureConfigsReturn = Record<string, unknown>;
declare type UseAllConfigsReturn = Record<string, UseFeatureConfigsReturn>;
export declare const getConfig: <ConfigInterface>(featureId?: string, authProvider?: string) => UseAllConfigsReturn | ConfigInterface;
export {};
