<template>
    <div
        :class="[
            'pointer-events-auto flex w-full max-w-xs cursor-pointer space-x-2 rounded-md p-3 text-sm shadow-md',
            {
                'bg-green-200 text-green-900': toast.type === 'success',
                'bg-amber-200 text-amber-900': toast.type === 'warning',
                'bg-red-200 text-red-900': toast.type === 'error',
                'bg-blue-200 text-blue-900': toast.type === 'info',
            },
        ]"
        @click="dismissToast"
        @mouseenter="pauseToast"
        @mouseleave="resumeToast"
    >
        <div class="flex-none">
            <CheckCircleIcon v-if="toast.type === 'success'" class="h-5 w-5" />
            <ExclamationIcon
                v-else-if="toast.type === 'warning'"
                class="h-5 w-5"
            />
            <ExclamationCircleIcon
                v-else-if="toast.type === 'error'"
                class="h-5 w-5"
            />
            <InformationCircleIcon
                v-else-if="toast.type === 'info'"
                class="h-5 w-5"
            />
        </div>
        <div class="flex-auto">
            <h3 v-if="toast.title" class="mb-1 font-bold">{{ toast.title }}</h3>
            <div class="font-medium" v-html="toast.message" />
        </div>
    </div>
</template>

<script setup lang="ts">
/* --------------------------------- Imports -------------------------------- */
import { onMounted, ref } from "vue";
import {
    CheckCircleIcon,
    ExclamationIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
} from "@heroicons/vue/outline";
import type { Toast } from "./";
/* -------------------------------------------------------------------------- */

/* --------------------------------- Globals -------------------------------- */
const props = defineProps<{
    toast: Toast;
}>();

const emit = defineEmits<{
    (_e: "dismiss"): void;
}>();
/* -------------------------------------------------------------------------- */

/* ----------------------------- Removing Toast ----------------------------- */
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);
const startedAt = ref<number | null>(null);
const remainingTime = ref<number | null | undefined>(props.toast.duration);

const dismissToast = () => {
    if (timeout.value) clearTimeout(timeout.value);

    emit("dismiss");
};
/* -------------------------------------------------------------------------- */

/* ----------------------------- Pause / Resume ----------------------------- */
const pauseToast = () => {
    if (
        !props.toast.pauseOnHover ||
        !timeout.value ||
        !startedAt.value ||
        !remainingTime.value
    )
        return;

    clearTimeout(timeout.value);
    remainingTime.value -= Date.now() - startedAt.value;
};

const resumeToast = () => {
    if (!props.toast.pauseOnHover || !timeout.value || !remainingTime.value)
        return;

    startedAt.value = Date.now();

    timeout.value = setTimeout(() => {
        emit("dismiss");
    }, remainingTime.value);
};
/* -------------------------------------------------------------------------- */

/* ------------------------------- Set Timeout ------------------------------ */
onMounted(() => {
    startedAt.value = Date.now();

    if (props.toast.duration) {
        timeout.value = setTimeout(() => {
            emit("dismiss");
        }, props.toast.duration);
    }
});
/* -------------------------------------------------------------------------- */
</script>
