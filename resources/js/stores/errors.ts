import { reactive } from "vue";
import axios from "axios";
import router from "@/router";

/* ---------------------------------- State --------------------------------- */
const errors = reactive<Record<string, string | string[]>>({});
/* -------------------------------------------------------------------------- */

/* --------------------------------- Actions -------------------------------- */
export const getError = (property: string) => errors[property];

export const getFirstError = (property: string) =>
    Array.isArray(errors[property])
        ? errors[property][0]
        : (errors[property] as string);

export const setError = (property: string, error: string | string[]) =>
    (errors[property] = error);

export const hasError = (property: string) => !!errors[property];

export const hasErrors = (...properties: string[]) =>
    properties.some((property) => !!errors[property]);

export const hasAnyErrors = () => !!Object.keys(errors).length;

export const clearErrors = () => {
    for (const property in errors) {
        delete errors[property];
    }
};
/* -------------------------------------------------------------------------- */

axios.interceptors.request.use((request) => {
    clearErrors();

    return request;
});

axios.interceptors.response.use(
    (response) => {
        clearErrors();
        return response;
    },
    (error) => {
        if (!axios.isAxiosError(error)) throw error;
        if (!error.response?.data.errors) {
            setError(
                "message",
                error.response?.data.message ||
                    "Something went wrong, try again later."
            );
            return;
        }
        for (const property in error.response?.data.errors) {
            errors[property] = error.response?.data.errors[property];
        }
        throw error;
    }
);

router.beforeEach(clearErrors);
