/* --------------------------------- Imports -------------------------------- */
import { inject } from "vue";
import { injectionKey } from "@/plugins/toasts";
import type { ToastsActions } from "@/plugins/toasts/types";
/* -------------------------------------------------------------------------- */

export default function useToasts() {
    return inject(injectionKey) as ToastsActions;
}
