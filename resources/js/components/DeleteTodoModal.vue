<template>
    <BaseModal ref="modal" title="Delete Todo">
        <template #default="{ close }">
            <form @submit.prevent="submitDeleteTodo">
                <div class="mt-3">
                    <p class="text-sm text-gray-500">
                        Are you sure you want to delete this todo?
                    </p>
                </div>

                <div
                    class="mt-4 grid grid-cols-1 space-y-3 sm:grid-cols-2 sm:space-y-0 sm:space-x-3"
                >
                    <Button variant="secondary" @click="close"> Cancel </Button>
                    <Button type="danger" :loading="loading"> Delete </Button>
                </div>
            </form>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
/* --------------------------------- Imports -------------------------------- */
import { ref } from "vue";
import { deleteTodo, type Todo } from "@/stores/todos";
import { loading } from "@/stores/loading";

import BaseModal from "./BaseModal.vue";
import Button from "./Button.vue";
/* -------------------------------------------------------------------------- */

/* --------------------------------- Globals -------------------------------- */
const props = defineProps<{
    todoId?: Todo["id"];
}>();

const modal = ref<InstanceType<typeof BaseModal> | null>(null);
/* -------------------------------------------------------------------------- */

/* ------------------------------- Delete Todo ------------------------------ */
const submitDeleteTodo = async () => {
    if (!props.todoId) return;
    await deleteTodo(props.todoId);

    if (!modal.value) return;
    modal.value.isOpen = false;
};
/* -------------------------------------------------------------------------- */
</script>
