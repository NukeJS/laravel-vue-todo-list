export interface ToastOptions {
    type?: "success" | "warning" | "error" | "info";
    title?: string;
    duration?: number;
    pauseOnHover?: boolean;
}

export interface Toast extends ToastOptions {
    id: string;
    message: string;
}

export type RemoveToastFunction = (id: Toast["id"]) => void;

export type CreateToastFunction = (toast: Omit<Toast, "id">) => {
    dismiss: RemoveToastFunction;
};

export interface ToastsActions {
    toast: (
        message: string,
        options?: ToastOptions
    ) => ReturnType<CreateToastFunction>;
    success: (
        message: string,
        options?: Omit<ToastOptions, "type">
    ) => ReturnType<CreateToastFunction>;
    warning: (
        message: string,
        options?: Omit<ToastOptions, "type">
    ) => ReturnType<CreateToastFunction>;
    error: (
        message: string,
        options?: Omit<ToastOptions, "type">
    ) => ReturnType<CreateToastFunction>;
    info: (
        message: string,
        options?: Omit<ToastOptions, "type">
    ) => ReturnType<CreateToastFunction>;
}
