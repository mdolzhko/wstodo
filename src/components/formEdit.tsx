import { useState } from "react";
import { ITodo } from "../useStore";

type TEvent = React.ChangeEvent<HTMLInputElement>;
interface Props {
  todo: ITodo;
  handleSubmit: (e: React.FormEvent) => void;
}

const FormEdit = ({ todo, handleSubmit }: Props) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [progress, setProgress] = useState(todo.progress);

  return (
    <form className="space-y-6 min-w-[500px]" onSubmit={handleSubmit}>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="progress"
            className="block text-sm font-medium leading-6 text-white mt-4"
          >
            Progress
          </label>
          <input
            id="progress"
            name="progress"
            type="number"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            autoComplete="current-password"
            className="mt-2 block w-auto rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-white mt-2"
          >
            Title
          </label>
        </div>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e: TEvent) => setTitle(e.target.value)}
            required
            autoComplete="current-password"
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mt-4">
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
            required
            autoComplete="current-password"
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mt-8">
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save Todo
        </button>
      </div>
    </form>
  );
};

export default FormEdit;
