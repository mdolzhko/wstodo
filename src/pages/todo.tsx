import { Link, useParams } from "react-router-dom";
import { TID, useTodos } from "../useStore";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { RoutePath } from "../App";

function Todo() {
  const { id } = useParams();
  const { todo, fetchTodosById } = useTodos(
    (state) => ({
      todo: state.todo,
      fetchTodosById: state.fetchTodosById,
    }),
    shallow
  );

  useEffect(() => {
    fetchTodosById(id as unknown as TID);
  }, []);

  return (
    <div className="bg-white px-6 py-8 lg:px-8 min-w-[800px] text-left rounded-xl ">
      <div className="flex justify-between">
        <Link
          to={`${RoutePath.HOME}`}
          className="text-indigo-400 hover:text-indigo-300"
        >{`< Back`}</Link>
        <Link
          to={`/${RoutePath.TODO}${id}/${RoutePath.EDIT}`}
          className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >{`Edit`}</Link>
      </div>

      <div className="mx-auto mt-16 max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          <span>Status: </span>

          {todo.progress === 0 && "Not Started"}
          {todo.progress > 0 && `In progress: ${todo.progress}`}
          {todo.completed && "% Completed"}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {todo.title}
        </h1>
        <p className="mt-6 text-xl leading-8">
          {todo.description ? todo.description : "No Description yet."}
        </p>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to={`/${RoutePath.TODO}${id}/${RoutePath.EDIT}`}
          className="text-indigo-400 hover:text-indigo-300 text-center"
        >
          add more description
        </Link>
      </div>
    </div>
  );
}
export default Todo;
