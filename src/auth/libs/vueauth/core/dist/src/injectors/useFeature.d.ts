export declare type UseFeatureConfig = {
    authProvider?: string;
};
export interface FeatureBaseConfig {
    composable: string;
    [key: string]: unknown;
}
export interface UnknownComposable {
    (...args: any[]): never;
    baseConfig?: unknown;
}
export declare const useFeature: <ComposableFunctionReturn>(featureId: string, config: UseFeatureConfig, ...args: any[]) => ComposableFunctionReturn;
export default useFeature;
