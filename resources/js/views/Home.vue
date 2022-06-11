<template>
    <Container class="py-6">
        <CreateUpdateTodoModal
            v-model="modals.createAndUpdate"
            :todo-edit-id="todoEditId"
            :edit-mode="editMode"
            @close="onCloseCreateAndUpdateModal"
        />

        <DeleteTodoModal v-model="modals.delete" :todo-id="todoDeleteId" />

        <div class="flex">
            <Button class="ml-auto" @click="openAddTodoModal">
                Add Todo
            </Button>
        </div>

        <div class="mt-6">
            <div class="relative overflow-x-auto rounded-xl border shadow-lg">
                <table class="w-full bg-white text-left text-sm">
                    <thead
                        class="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase text-slate-700"
                    >
                        <tr>
                            <th scope="col" class="px-6 py-3 pt-4 font-bold">
                                Todo
                            </th>
                            <th scope="col" class="px-6 py-3 pt-4">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y text-slate-500">
                        <tr
                            v-if="
                                loading && !anyModalIsOpen && !isCompletingTodo
                            "
                        >
                            <td class="px-6 py-4 text-center" colspan="3">
                                <p class="inline-flex items-center">
                                    <LoaderIcon
                                        class="mr-2 h-5 w-5 text-blue-500"
                                    />
                                    Loading todos...
                                </p>
                            </td>
                        </tr>
                        <tr v-else-if="!todos.length">
                            <td class="px-6 py-4 text-center" colspan="3">
                                No todos found.
                            </td>
                        </tr>
                        <tr v-else v-for="todo in todos" :key="todo.id">
                            <th
                                scope="row"
                                class="inline-flex items-center whitespace-nowrap px-6 py-4 font-medium text-slate-900"
                            >
                                <Switch
                                    :value="todo.is_completed"
                                    @input="completeTodo(todo.id)"
                                    class="mr-3"
                                />
                                {{ todo.name }}
                            </th>
                            <td
                                class="space-x-3 whitespace-nowrap px-6 py-4"
                                align="right"
                            >
                                <button @click="openEditTodoModal(todo.id)">
                                    <PencilIcon
                                        class="inline-block h-5 w-5 cursor-pointer text-blue-500 transition hover:text-blue-600 active:text-blue-700"
                                    />
                                </button>
                                <button @click="openDeleteTodoModal(todo.id)">
                                    <TrashIcon
                                        class="inline-block h-5 w-5 cursor-pointer text-red-500 transition hover:text-red-600 active:text-red-700"
                                    />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Container>
</template>

<script setup lang="ts">
/* --------------------------------- Imports -------------------------------- */
import { computed, onBeforeMount, reactive, ref } from "vue";
import { TrashIcon, PencilIcon } from "@heroicons/vue/outline";
import {
    getTodo,
    getTodos,
    todos,
    updateTodo,
    type Todo,
} from "@/stores/todos";
import { clearErrors } from "@/stores/errors";
import { loading } from "@/stores/loading";

import Container from "@/components/Container.vue";
import Button from "@/components/Button.vue";
import CreateUpdateTodoModal from "../components/CreateUpdateTodoModal.vue";
import DeleteTodoModal from "../components/DeleteTodoModal.vue";
import Switch from "../components/Switch.vue";
import LoaderIcon from "../components/LoaderIcon.vue";
/* -------------------------------------------------------------------------- */

/* --------------------------------- Modals --------------------------------- */
const modals = reactive({
    createAndUpdate: false,
    delete: false,
});

const openModal = (name: keyof typeof modals) => (modals[name] = true);

const anyModalIsOpen = computed(() =>
    Object.values(modals).some((modal: boolean) => modal)
);

const onCloseCreateAndUpdateModal = () => {
    clearErrors();
};
/* -------------------------------------------------------------------------- */

/* ------------------------------ Complete Todo ----------------------------- */
const isCompletingTodo = ref<boolean>(false);
const completeTodo = async (id: Todo["id"]) => {
    isCompletingTodo.value = true;
    const todo = await getTodo(id);

    await updateTodo(id, { ...todo, is_completed: !todo.is_completed });
    isCompletingTodo.value = false;
};
/* -------------------------------------------------------------------------- */

/* -------------------------------- Add Todo -------------------------------- */
const openAddTodoModal = () => {
    todoEditId.value = undefined;
    editMode.value = false;
    openModal("createAndUpdate");
};
/* -------------------------------------------------------------------------- */

/* -------------------------------- Edit Todo ------------------------------- */
const todoEditId = ref<Todo["id"] | undefined>(undefined);
const editMode = ref<boolean>(false);

const openEditTodoModal = (id: Todo["id"]) => {
    todoEditId.value = id;
    editMode.value = true;
    openModal("createAndUpdate");
};
/* -------------------------------------------------------------------------- */

/* ------------------------------- Delete Todo ------------------------------ */
const todoDeleteId = ref<Todo["id"] | undefined>(undefined);

const openDeleteTodoModal = (id: Todo["id"]) => {
    todoDeleteId.value = id;
    openModal("delete");
};
/* -------------------------------------------------------------------------- */

onBeforeMount(async () => {
    await getTodos();
});
</script>
