<template>
    <div
        :class="[
            'mx-auto w-full px-4',
            {
                'max-w-screen-lg xl:max-w-screen-xl': !fluid,
            },
        ]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
/* --------------------------------- Globals -------------------------------- */
defineProps<{
    fluid?: boolean;
}>();
/* -------------------------------------------------------------------------- */
</script>
