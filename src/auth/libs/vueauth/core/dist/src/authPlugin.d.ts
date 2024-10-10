import { PluginOptions } from './types/PluginOptions';
import { App } from 'vue-demi';
declare const AuthPlugin: {
    install: (app: App, configs: PluginOptions) => void;
};
export { AuthPlugin, AuthPlugin as default, PluginOptions, };
