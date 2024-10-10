export declare const useHandlesErrors: () => {
    errors: import("vue-demi").Ref<{
        type: string;
        message: string;
    }[]>;
    hasStandardErrors: import("vue-demi").ComputedRef<boolean>;
    resetStandardErrors: () => void;
    validationErrors: import("vue-demi").Ref<{
        [x: string]: string[];
        [x: number]: string[];
    }>;
    hasValidationErrors: import("vue-demi").ComputedRef<boolean>;
    resetValidationErrors: () => void;
    hasErrors: import("vue-demi").ComputedRef<boolean>;
    resetErrors: () => void;
};
export default useHandlesErrors;
