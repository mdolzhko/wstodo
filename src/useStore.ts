import { createWithEqualityFn } from "zustand/traditional";
import * as socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:4000");

export interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
}
export type TTodo = Partial<ITodo>;
export type TID = Pick<ITodo, "id">;
export type TTodoUpdate = Required<TID> & Partial<Pick<ITodo, "title" | "description" | "completed" | "progress">>;

interface IStore {
  todo: ITodo;
  todos: any[];
  error: any;
  loading: boolean;
  fetchTodos: () => void;
  fetchTodosById: (id: TID) => void;
  addTodos: (todo: TTodo) => void;
  deleteTodos: (id: TID) => void;
  updateTodosById: (todo: TTodoUpdate) => void;
  updateProgress: (id: TTodoUpdate) => void;
}
let controller = new AbortController();

export const useTodos = createWithEqualityFn<IStore>()((set, get) => ({
  todos: [],
  todo: {} as ITodo,
  error: null,
  loading: false,
  fetchTodos: async () => {
    set({ loading: true });
    try {
      const response = await fetch("http://localhost:4000/todos", {
        method: "GET",
        signal: controller.signal
      });

      if (!response.ok) throw new Error("Failed fetchTodos.");

      const result = await response.json();
      set({
        todos: result,
        error: null,
      });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      set({ loading: false });
    }
  },
  fetchTodosById: async (id: TID) => {
    set({ loading: true });
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "GET",
        signal: controller.signal
      });

      if (!response.ok) throw new Error(`Failed Todo with id: ${id}`);

      const result = await response.json();
      set({
        todo: result,
        error: null,
      });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      set({ loading: false });
    }
  },
  addTodos: async (todo) => {
    set({ loading: true });
    try {
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo }),
      });

      if (!response.ok) throw new Error("Failed addTodos.");

      const result = await response.json();

      set({
        todos: [result, ...get().todos],
        error: null,
      });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      set({ loading: false });
    }
  },
  deleteTodos: async (id: TID) => {
    set({ loading: true });
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Failed delete Todo with id: ${id}`);

      const filtered = get().todos.filter((item) => item.id !== id);
      set({
        todos: [...filtered],
        error: null,
      });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      set({ loading: false });
    }
  },
  updateTodosById: async (todo: TTodoUpdate) => {
    console.log('todo:::', todo)
    set({ loading: true });
    try {
      const response = await fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: "PUT",
        signal: controller.signal,
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...todo}),
      });
      const result = await response.json();
      console.log('result ::::', result)

      if (!response.ok) throw new Error(`Failed Todo with id: ${todo.id}`);

    //   set({
    //     todo: ,
    //     error: null,
    //   });

      get().fetchTodos();
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      set({ loading: false });
    }
  },
  updateProgress: async (todo: TTodoUpdate) => {
    socket.emit("updateProgress", todo);
    socket.on("todos", data => set({ todos: data }));
  },
}));
