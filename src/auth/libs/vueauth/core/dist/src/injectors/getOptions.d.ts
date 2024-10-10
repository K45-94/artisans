declare type UseFeatureOptionsReturn = Record<string, unknown>;
declare type UseAllOptionsReturn = Record<string, UseFeatureOptionsReturn>;
declare type UseOptionsReturn = UseFeatureOptionsReturn | UseAllOptionsReturn;
export declare const getOptions: (authProvider?: string, featureId?: string) => UseOptionsReturn;
export {};
