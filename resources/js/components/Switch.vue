<template>
    <Switch
        v-model="isEnabled"
        :class="[
            'relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full border-4 border-transparent transition-colors focus:outline-none',
            {
                'bg-blue-500': isEnabled,
                'bg-gray-400': !isEnabled,
            },
        ]"
    >
        <div
            :class="[
                'pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg transition',
                {
                    'translate-x-4': isEnabled,
                    'translate-x-0': !isEnabled,
                },
            ]"
        />
    </Switch>
</template>

<script setup lang="ts">
/* --------------------------------- Imports -------------------------------- */
import { Switch } from "@headlessui/vue";
import { computed } from "vue";
/* -------------------------------------------------------------------------- */

/* --------------------------------- Globals -------------------------------- */
const props = defineProps<{
    value?: boolean | undefined;
}>();

const emit = defineEmits<{
    (_e: "input", _value: boolean | undefined): void;
}>();

const isEnabled = computed({
    get: () => props.value,
    set: (value) => emit("input", value),
});
/* -------------------------------------------------------------------------- */
</script>
