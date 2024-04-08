import { useState } from "react";
import { shallow } from "zustand/shallow";
import { TTodoUpdate, useTodos } from "../useStore";

type TEvent = React.ChangeEvent<HTMLInputElement>;

const Form = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { addTodos } = useTodos(
    (state) => ({
      loading: state.loading,
      error: state.error,
      addTodos: state.addTodos,
    }),
    shallow
  );
  const handleAddTodo = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const rawdata = new FormData(e.target);
    addTodos({
      title: rawdata.get("title"),
      description: rawdata.get("description"),
      progress: Number(rawdata.get("progress")),
    } as TTodoUpdate);
    clear();
  };
  const clear=() => {
    setTitle('');
    setDescription('');
  }

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Todo List:
      </h2>
      <form className="space-y-6" onSubmit={handleAddTodo}>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-white"
            >
              Title
            </label>
          </div>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e: TEvent) => setTitle(e.target.value)}
              required
              autoComplete="current-password"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-white"
            >
              Description
            </label>
          </div>
          <div className="mt-2">
            <input
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e: TEvent) => setDescription(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            ADD TODO
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
