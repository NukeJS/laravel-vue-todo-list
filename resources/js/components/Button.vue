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
                'opacity-75': disabled,
                'w-full': block,
                'cursor-pointer': !disabled,
            },
            {
                'rounded-md px-4 py-1': size === 'sm',
                'rounded-md px-6 py-2': size === 'md',
                'rounded-lg px-8 py-3 text-lg': size === 'lg',
                'rounded-lg px-10 py-4 text-xl': size === 'xl',
            },
            {
                'bg-blue-500 text-white': variant === 'primary',
                'hover:bg-blue-600 focus:ring-blue-200 active:bg-blue-700':
                    variant === 'primary' && !disabled,

                'bg-zinc-500 text-white': variant === 'secondary',
                'hover:bg-zinc-600 focus:ring-zinc-200 active:bg-zinc-700':
                    variant === 'secondary' && !disabled,

                'bg-green-500 text-white': variant === 'success',
                'active:green-700 hover:bg-green-600 focus:ring-green-200':
                    variant === 'success' && !disabled,

                'bg-amber-500 text-white': variant === 'warning',
                'active:amber-700 hover:bg-amber-600 focus:ring-amber-200':
                    variant === 'warning' && !disabled,

                'bg-red-500 text-white': variant === 'danger',
                'hover:bg-red-600 focus:ring-red-200 active:bg-red-700':
                    variant === 'danger' && !disabled,

                'bg-sky-500 text-white': variant === 'info',
                'active:sky-700 hover:bg-sky-600 focus:ring-sky-200':
                    variant === 'info' && !disabled,
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
            | "danger"
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
