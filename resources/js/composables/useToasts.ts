/* --------------------------------- Imports -------------------------------- */
import { inject } from "vue";
import { injectionKey, type ToastsActions } from "@/plugins/toasts";
/* -------------------------------------------------------------------------- */

export default function useToasts() {
    return inject(injectionKey) as ToastsActions;
}
