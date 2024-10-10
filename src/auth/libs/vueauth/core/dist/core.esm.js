import { ref, inject, unref, computed } from 'vue-demi';

const DefaultAuthProviderSymbol = Symbol.for('auth:defaultProvider');

function provideFeatures(provider, providerName = '', app) {
    const features = provider.features;
    const featureKeys = Object.keys(features);
    featureKeys.forEach(featureKey => {
        let feature;
        if (typeof features[featureKey] === 'object' && features[featureKey].composable) {
            feature = features[featureKey].composable;
        }
        else {
            feature = features[featureKey];
        }
        provideFeature(featureKey, feature, providerName, app);
    });
}
function provideFeature(featureKey, feature, providerName, app) {
    app.provide(Symbol.for(`auth:${providerName}:${featureKey}`), feature);
}
function provideFeaturesConfig(featureKey, featureConfig, providerName, app) {
    app.provide(Symbol.for(`auth:${providerName}.${featureKey}.config`), featureConfig);
}
function provideConfig(provider, providerName, app) {
    const features = provider.features;
    const featureKeys = Object.keys(features);
    const allConfigs = {};
    featureKeys.forEach(featureKey => {
        const feature = features[featureKey];
        let config = {};
        if (feature.baseConfig) {
            config = Object.assign({}, feature.baseConfig);
        }
        if (typeof feature === 'object' && feature.config) {
            if (typeof feature.composable !== 'function') {
                throw new Error(`The feature ${featureKey} is missing an implementation`);
            }
            if (feature.composable.baseConfig) {
                config = Object.assign({}, feature.composable.baseConfig);
            }
            Object.assign(config, feature.config);
        }
        provideFeaturesConfig(featureKey, config, providerName, app);
        allConfigs[featureKey] = config;
    });
    app.provide(Symbol.for(`auth:${providerName}.config`), allConfigs);
}
const AuthPlugin = {
    install: (app, configs) => {
        app.provide(DefaultAuthProviderSymbol, ref(configs.default));
        const providers = Object.keys(configs.providers);
        providers.forEach(providerKey => {
            provideFeatures(configs.providers[providerKey], providerKey, app);
            provideConfig(configs.providers[providerKey], providerKey, app);
        });
    },
};

const getDefaultProvider = () => {
    const defaultAuthProvider = inject(DefaultAuthProviderSymbol);
    if (defaultAuthProvider) {
        return unref(defaultAuthProvider);
    }
    throw new Error('default auth provider key not found');
};

const getConfig = (featureId = '', authProvider = '') => {
    authProvider = authProvider || getDefaultProvider();
    let config;
    if (featureId) {
        config = inject(Symbol.for(`auth:${authProvider}.${featureId}.config`));
        return config ?? {};
    }
    else {
        config = inject(Symbol.for(`auth:${authProvider}.config`));
        return config ?? {};
    }
};

const useFeature = (featureId, config, ...args) => {
    config.authProvider = config.authProvider ?? getDefaultProvider();
    // Merge base config with supplied config
    const baseConfig = getConfig(featureId, config.authProvider);
    // Create the provide key
    const ProvideKey = Symbol.for(`auth:${config.authProvider}:${featureId}`);
    // Inject the composable using provide key
    const composable = inject(ProvideKey);
    // if we have the composable return it, otherwise error
    if (composable && typeof composable === 'function') {
        let mergedConfig;
        if (composable.baseConfig && typeof composable.baseConfig === 'object') {
            mergedConfig = { ...composable.baseConfig, ...baseConfig, ...config };
        }
        else {
            mergedConfig = { ...baseConfig, ...config };
        }
        return composable(mergedConfig, ...args);
    }
    else {
        throw new Error(`unable to find inject key: ${ProvideKey.toString()}`);
    }
};

const featureId$a = 'identityPassword:login';
const useIdentityPasswordLogin = (config = {}) => {
    return useFeature(featureId$a, config);
};

const featureId$9 = 'identityPassword:logout';
const useIdentityPasswordLogout = (config = {}) => {
    return useFeature(featureId$9, config);
};

const featureId$8 = 'identityPassword:register';
const useIdentityPasswordRegister = (config = {}) => {
    return useFeature(featureId$8, config);
};

const featureId$7 = 'passwordResetViaEmail';
const usePasswordResetViaEmail = (config = {}) => {
    return useFeature(featureId$7, config);
};

const redirectTriggers = [
    'authenticated',
    'unauthenticated',
    'error',
];

const featureId$6 = 'authRedirector';
const useAuthRedirector = (config) => {
    if (!config.redirectOn || !redirectTriggers.includes(config.redirectOn)) {
        throw new Error("useAuthRedirector config: 'redirectOn' is either missing or invalid");
    }
    return useFeature(featureId$6, config);
};

const featureId$5 = 'authenticatedRedirector';
const useAuthenticatedRedirector = (config = {
    redirectOn: 'authenticated',
}) => {
    config.redirectOn = 'authenticated';
    return useFeature(featureId$5, config);
};

const featureId$4 = 'unauthenticatedRedirector';
const useUnauthenticatedRedirector = (config = {
    redirectOn: 'unauthenticated',
}) => {
    config.redirectOn = 'unauthenticated';
    return useFeature(featureId$4, config);
};

const featureId$3 = 'authState';
const useAuthState = (config = {}) => {
    return useFeature(featureId$3, config);
};

const featureId$2 = 'fetchUser';
const useFetchUser = (config = {}) => {
    return useFeature(featureId$2, config);
};

const featureId$1 = 'errorHandler';
const useHandlesErrors$1 = (config = {}) => {
    return useFeature(featureId$1, config);
};

const featureId = 'updatePassword';
const useUpdatePassword = (config = {}) => {
    return useFeature(featureId, config);
};

const useHandlesErrors = () => {
    // Standard Errors
    const errors = ref([]);
    function resetStandardErrors() {
        errors.value = [];
    }
    const hasStandardErrors = computed(() => {
        return !!errors.value.length;
    });
    // Validation Errors
    const validationErrors = ref({});
    const hasValidationErrors = computed(() => {
        return !!Object.keys(validationErrors.value).length;
    });
    function resetValidationErrors() {
        validationErrors.value = {};
    }
    // All Errors
    const hasErrors = computed(() => hasStandardErrors.value || hasValidationErrors.value);
    function resetErrors() {
        resetStandardErrors();
        resetValidationErrors();
    }
    return {
        errors,
        hasStandardErrors,
        resetStandardErrors,
        validationErrors,
        hasValidationErrors,
        resetValidationErrors,
        hasErrors,
        resetErrors,
    };
};

export { AuthPlugin, DefaultAuthProviderSymbol, getConfig, getDefaultProvider, useAuthRedirector, useAuthState, useAuthenticatedRedirector, useFeature, useFetchUser, useHandlesErrors$1 as useHandlesErrors, useHandlesErrors as useHandlesErrorsBase, useIdentityPasswordLogin, useIdentityPasswordLogout, useIdentityPasswordRegister, usePasswordResetViaEmail, useUnauthenticatedRedirector, useUpdatePassword };
