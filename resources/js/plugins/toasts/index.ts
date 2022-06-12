/* --------------------------------- Imports -------------------------------- */
import { type Plugin, type InjectionKey, ref, createApp, h } from "vue";
import { v4 as uuidv4 } from "uuid";
import type {
    Toast,
    CreateToastFunction,
    RemoveToastFunction,
    ToastsActions,
} from "./types";

import ToastComponent from "./Toast.vue";
/* -------------------------------------------------------------------------- */

const DEFAULT_TOAST: Partial<Toast> = {
    type: "success",
    duration: 5000,
    pauseOnHover: true,
};

export const injectionKey = Symbol("toasts") as InjectionKey<ToastsActions>;

const ToastsPlugin: Plugin = {
    install(app) {
        const toasts = ref<Toast[]>([]);
        const toastsContainerElement = document.createElement("div");
        toastsContainerElement.classList.add(
            "pointer-events-none",
            "fixed",
            "inset-x-0",
            "bottom-0",
            "z-[9999]"
        );
        document.body.appendChild(toastsContainerElement);

        const createToast: CreateToastFunction = (toast) => {
            const newToast = { ...DEFAULT_TOAST, ...toast, id: uuidv4() };

            toasts.value.push(newToast);

            return {
                dismiss: () => removeToast(newToast.id),
            };
        };

        const removeToast: RemoveToastFunction = (id) => {
            toasts.value = toasts.value.filter((toast) => toast.id !== id);
        };

        createApp({
            setup() {
                return () =>
                    h(
                        "div",
                        {
                            class: "relative space-y-2 p-4",
                        },
                        toasts.value.map((toast) =>
                            h(ToastComponent, {
                                toast,
                                onDismiss: () => removeToast(toast.id),
                                key: toast.id,
                            })
                        )
                    );
            },
        }).mount(toastsContainerElement);

        app.provide(injectionKey, {
            toast: (message, options) => {
                return createToast({ message, ...options });
            },
            success: (message, options) => {
                return createToast({ message, ...options, type: "success" });
            },
            warning: (message, options) => {
                return createToast({ message, ...options, type: "warning" });
            },
            error: (message, options) => {
                return createToast({ message, ...options, type: "error" });
            },
            info: (message, options) => {
                return createToast({ message, ...options, type: "info" });
            },
        } as ToastsActions);
    },
};

export default ToastsPlugin;
