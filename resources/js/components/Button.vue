<template>
    <component
        :is="to ? 'RouterLink' : href ? 'a' : 'button'"
        v-bind="{
            ...(href && { href }),
            target,
            type,
            disabled,
            to,
        }"
        :class="[
            'inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring',
            {
                'opacity-75': disabled || loading,
                'w-full': block,
            },
            {
                'rounded-md px-4 py-1': size === 'sm',
                'rounded-md px-6 py-2': size === 'md',
                'rounded-lg px-8 py-3 text-lg': size === 'lg',
                'rounded-lg px-10 py-4 text-xl': size === 'xl',
            },
            {
                'enabled:hover:bg-blue-600 enabled:focus:ring-blue-200 enabled:active:bg-blue-700 bg-blue-500 text-white':
                    variant === 'primary',
                'enabled:hover:bg-zinc-600 enabled:focus:ring-zinc-200 enabled:active:bg-zinc-700 bg-zinc-500 text-white':
                    variant === 'secondary',
                'enabled:hover:bg-green-600 enabled:focus:ring-green-200 enabled:active:bg-green-700 bg-green-500 text-white':
                    variant === 'success',
                'enabled:hover:bg-amber-600 enabled:focus:ring-amber-200 enabled:active:bg-amber-700 bg-amber-500 text-white':
                    variant === 'warning',
                'enabled:hover:bg-red-600 enabled:focus:ring-red-200 enabled:active:bg-red-700 bg-red-500 text-white':
                    variant === 'error',
                'enabled:active:sky-700 enabled:hover:bg-sky-600 enabled:focus:ring-sky-200 bg-sky-500 text-white':
                    variant === 'info',
            },
        ]"
    >
        <LoaderIcon
            v-if="loading"
            :class="[
                'inline-block',
                {
                    'h-6 w-6': size === 'sm' || size === 'md',
                    'h-7 w-7': size === 'lg',
                    'h-8 w-8': size === 'xl',
                },
            ]"
        />
        <slot v-else />
    </component>
</template>

<script setup lang="ts">
/* --------------------------------- Imports -------------------------------- */
import type { RouteLocationRaw } from "vue-router";

import LoaderIcon from "./LoaderIcon.vue";
/* -------------------------------------------------------------------------- */

/* --------------------------------- Globals -------------------------------- */
withDefaults(
    defineProps<{
        to?: RouteLocationRaw;
        href?: string;
        target?: string;
        type?: string;
        disabled?: boolean;
        variant?:
            | "primary"
            | "secondary"
            | "success"
            | "warning"
            | "error"
            | "info";
        block?: boolean;
        size?: "sm" | "md" | "lg" | "xl";
        loading?: boolean;
    }>(),
    {
        to: undefined,
        href: undefined,
        target: undefined,
        type: "button",
        variant: "primary",
        size: "md",
    }
);
/* -------------------------------------------------------------------------- */
</script>
