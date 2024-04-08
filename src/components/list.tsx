import { useEffect } from "react";
import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { TID, TTodoUpdate, useTodos } from "../useStore";
import { RoutePath } from "../App";
import ListHeader from "./listHeader";
type TEvent = React.ChangeEvent<HTMLInputElement>;

const List = () => {
  const { todos, fetchTodos, deleteTodos, updateTodosById, updateProgress } =
    useTodos(
      (state) => ({
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        fetchTodos: state.fetchTodos,
        addTodos: state.addTodos,
        deleteTodos: state.deleteTodos,
        updateTodosById: state.updateTodosById,
        updateProgress: state.updateProgress,
      }),
      shallow
    );

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteTodo = (id: TID) => deleteTodos(id);
  const handleDoneTodo = (params: TTodoUpdate) => updateTodosById(params);
  const handleSetSrogress = (params: TTodoUpdate) => updateProgress(params);

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <ListHeader />
                    <tbody className="divide-y divide-gray-800">
                      {todos.map((item) => {
                        const isDisabled = item.progress === 10;
                        return (
                          <tr key={item.id}>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4  text-right text-sm font-medium">
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={(e: TEvent) =>
                                  handleDoneTodo({
                                    id: item.id,
                                    completed: e.target.checked,
                                  })
                                }
                              />
                            </td>

                            <td className="whitespace-nowrap py-4 pl- pr-3  text-sm text-left font-medium text-white sm:pl-0">
                              {item.title}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-300">
                              <p>{item.description}</p>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                disabled={isDisabled}
                                value={item.progress}
                                onChange={(e: any) =>
                                  handleSetSrogress({
                                    id: item.id,
                                    progress: Number(e.target.value),
                                  })
                                }
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                required
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                              <button
                                type="button"
                                onClick={() => handleDeleteTodo(item.id)}
                                className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                              >
                                Delete
                              </button>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <Link
                                to={`${RoutePath.TODO}${item.id}`}
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                Edit
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default List;
