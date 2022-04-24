import { ref } from "vue";
import axios from "axios";

/* ---------------------------------- State --------------------------------- */
export const loading = ref<boolean>(false);
/* -------------------------------------------------------------------------- */

axios.interceptors.request.use((config) => {
    loading.value = true;
    return config;
});

axios.interceptors.response.use(
    (response) => {
        loading.value = false;
        return response;
    },
    (error) => {
        loading.value = false;
        throw error;
    }
);
