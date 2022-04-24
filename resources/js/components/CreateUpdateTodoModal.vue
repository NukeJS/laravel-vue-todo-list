<template>
    <BaseModal ref="modal" :title="modalTitle">
        <template #default="{ close }">
            <form @submit.prevent="submitCreateUpdateTodo">
                <div class="space-y-3">
                    <Input
                        v-model="todo.name"
                        label="Todo"
                        :error="getFirstError('name')"
                    />
                </div>
                <div
                    class="mt-4 grid grid-cols-1 space-y-3 sm:grid-cols-2 sm:space-y-0 sm:space-x-3"
                >
                    <Button variant="secondary" @click="close"> Cancel </Button>
                    <Button type="submit">
                        {{ editMode ? "Update" : "Create" }}
                    </Button>
                </div>
            </form>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
/* --------------------------------- Imports -------------------------------- */
import { computed, ref, watch } from "vue";
import {
    createEmptyTodo,
    updateTodo,
    createTodo,
    getTodo,
    type Todo,
} from "@/stores/todos";
import { clearErrors, getFirstError, hasAnyErrors } from "@/stores/errors";

import BaseModal from "./BaseModal.vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
/* -------------------------------------------------------------------------- */

/* --------------------------------- Globals -------------------------------- */
const props = defineProps<{
    todoEditId?: Todo["id"];
    editMode?: boolean;
}>();

const modal = ref<InstanceType<typeof BaseModal> | null>(null);
const modalTitle = computed(() =>
    props.editMode ? "Edit Todo" : "Create Todo"
);
/* -------------------------------------------------------------------------- */

/* ----------------------------- Auto Fill Form ----------------------------- */
watch(
    () => [props.editMode, props.todoEditId],
    async () => {
        if (props.editMode) {
            todo.value = await getTodo(props.todoEditId as Todo["id"]);
        } else {
            todo.value = createEmptyTodo();
        }
    }
);
/* -------------------------------------------------------------------------- */

/* --------------------------- Create Update Todo --------------------------- */
const todo = ref<Partial<Todo>>(createEmptyTodo());

const submitCreateUpdateTodo = async () => {
    clearErrors();

    if (props.editMode) {
        await updateTodo(todo.value.id as Todo["id"], todo.value);
    } else {
        await createTodo(todo.value as Todo);
    }

    if (!hasAnyErrors()) {
        todo.value = createEmptyTodo();

        if (!modal.value) return;
        modal.value.isOpen = false;
    }
};
/* -------------------------------------------------------------------------- */
</script>
