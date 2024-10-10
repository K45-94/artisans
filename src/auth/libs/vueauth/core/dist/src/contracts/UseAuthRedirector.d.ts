import { RouteLocationRaw, Router } from 'vue-router';
import { MaybeRef } from '@vueuse/core';
import { Ref } from 'vue-demi';
export declare type UserOnCheckedFunction = (user: unknown | null) => void;
export declare type RedirectTriggers = 'authenticated' | 'unauthenticated' | 'error';
export declare const redirectTriggers: RedirectTriggers[];
export interface UseAuthRedirectorReturn {
    execOnAuthStateChange: () => void;
    execOnAuthStateEnsured: () => void;
    exec: () => void;
    redirectTo: MaybeRef<RouteLocationRaw>;
    checking: Ref<boolean>;
    onChecked: Ref<UserOnCheckedFunction | null>;
}
export interface UseAuthRedirectorConfig {
    redirectOn?: RedirectTriggers;
    authProvider?: string;
    redirectTo?: MaybeRef<RouteLocationRaw>;
    router?: Router;
}
export interface UseAuthRedirector {
    (config: UseAuthRedirectorConfig): UseAuthRedirectorReturn;
    baseConfig: UseAuthRedirectorConfig;
}
export interface UseAuthRedirectorBaseConfig {
    composable: UseAuthRedirector;
    redirectTo?: MaybeRef<RouteLocationRaw>;
}
