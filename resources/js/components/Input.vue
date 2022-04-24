<template>
    <div>
        <label v-if="label" class="text-sm font-semibold text-zinc-900">
            {{ label }}
            <span v-if="required" class="text-blue -ml-1">*</span>
        </label>
        <input
            v-bind="{
                value: modelValue,
                type,
                required,
                placeholder,
                disabled,
            }"
            :class="[
                'block w-full rounded-md border border-slate-300 px-3 py-2 text-zinc-900 placeholder-slate-500 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200/50 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500',
                {
                    'border-red-500 focus:border-red-300 focus:ring-red-200/50':
                        error,
                },
            ]"
            @input="update"
        />
        <p v-if="error" class="mt-1 text-xs font-medium text-red-700">
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
/* --------------------------------- Globals -------------------------------- */
withDefaults(
    defineProps<{
        type?: string;
        modelValue: string | number | null | undefined;
        label: string;
        required?: boolean;
        placeholder?: string;
        disabled?: boolean;
        error?: string;
    }>(),
    {
        type: "text",
        placeholder: undefined,
        error: undefined,
    }
);

const emit = defineEmits<{
    (_e: "update:modelValue", _value: string | number | null | undefined): void;
}>();

const update = (e: Event) =>
    emit("update:modelValue", (<HTMLInputElement>e.target).value);
/* -------------------------------------------------------------------------- */
</script>
