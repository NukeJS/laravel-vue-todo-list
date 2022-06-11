/* --------------------------------- Imports -------------------------------- */
import { inject } from "vue";
import { injectionKey, type ToastActions } from "@/plugins/toasts";
/* -------------------------------------------------------------------------- */

export default function useToasts() {
    return inject(injectionKey) as ToastActions;
}
