import { ref } from "vue";
import axios from "axios";

export interface Todo {
    id: number;
    name: string;
    is_completed: boolean;
}

/* ---------------------------------- State --------------------------------- */
export const todos = ref<Todo[]>([]);
/* -------------------------------------------------------------------------- */

/* --------------------------------- Actions -------------------------------- */
export const getTodos = async (): Promise<void> => {
    const { data } = await axios.get<Todo[]>("/api/todos");
    todos.value = data;
};

export const getTodo = async (id: Todo["id"]): Promise<Todo> => {
    const savedTodo = todos.value.find((todo) => todo.id === id);
    if (savedTodo) return Object.create(savedTodo);

    const { data: todo } = await axios.get<Todo>(`/api/todos/${id}`);
    return todo;
};

export const createTodo = async (todo: Omit<Todo, "id">): Promise<void> => {
    const { data: newTodo } = await axios.post<Todo>("/api/todos", todo);
    todos.value.push(newTodo);
};

export const updateTodo = async (
    id: Todo["id"],
    todo: Partial<Todo>
): Promise<void> => {
    const { data: updatedTodo } = await axios.put<Todo>(
        `/api/todos/${id}`,
        todo
    );
    todos.value = todos.value.map((_todo) =>
        _todo.id !== updatedTodo.id ? _todo : updatedTodo
    );
};

export const deleteTodo = async (id: Todo["id"]): Promise<void> => {
    await axios.delete(`/api/todos/${id}`);
    todos.value = todos.value.filter((todo) => todo.id !== id);
};

export const createEmptyTodo = (): Partial<Todo> => ({
    id: undefined,
    name: undefined,
    is_completed: false,
});
/* -------------------------------------------------------------------------- */
