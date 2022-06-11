/* --------------------------------- Imports -------------------------------- */
import { type Plugin, type InjectionKey, ref, createApp, h } from "vue";
import { v4 as uuidv4 } from "uuid";

import Toast from "./Toast.vue";
/* -------------------------------------------------------------------------- */

export interface Toast {
    id: string;
    type?: "success" | "warning" | "error" | "info";
    title?: string;
    message: string;
    duration?: number | null;
    pauseOnHover?: boolean;
}

type ToastWithoutId = Omit<Toast, "id">;
type ToastWithoutIdAndType = Omit<Toast, "id" | "type">;
type CreateToastFunction = (toast: ToastWithoutId) => {
    dismiss: RemoveToastFunction;
};
type RemoveToastFunction = (id: Toast["id"]) => void;

const DEFAULT_TOAST: Partial<Toast> = {
    type: "success",
    duration: 5000,
    pauseOnHover: true,
};

export interface ToastsActions {
    toast: (toast: ToastWithoutId) => ReturnType<CreateToastFunction>;
    success: (toast: ToastWithoutIdAndType) => ReturnType<CreateToastFunction>;
    warning: (toast: ToastWithoutIdAndType) => ReturnType<CreateToastFunction>;
    error: (toast: ToastWithoutIdAndType) => ReturnType<CreateToastFunction>;
    info: (toast: ToastWithoutIdAndType) => ReturnType<CreateToastFunction>;
}

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

        const createToast = (toast: ToastWithoutId) => {
            const newToast = { ...DEFAULT_TOAST, ...toast, id: uuidv4() };

            toasts.value.push(newToast);

            return {
                dismiss: () => removeToast(newToast.id),
            };
        };

        const removeToast = (id: Toast["id"]) => {
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
                            h(Toast, {
                                toast,
                                onDismiss: () => removeToast(toast.id),
                                key: toast.id,
                            })
                        )
                    );
            },
        }).mount(toastsContainerElement);

        app.provide(injectionKey, {
            toast: (toast: ToastWithoutId) => {
                return createToast(toast);
            },
            success: (toast: ToastWithoutIdAndType) => {
                return createToast({ ...toast, type: "success" });
            },
            warning: (toast: ToastWithoutIdAndType) => {
                return createToast({ ...toast, type: "warning" });
            },
            error: (toast: ToastWithoutIdAndType) => {
                return createToast({ ...toast, type: "error" });
            },
            info: (toast: ToastWithoutIdAndType) => {
                return createToast({ ...toast, type: "info" });
            },
        } as ToastsActions);
    },
};

export default ToastsPlugin;
