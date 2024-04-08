import { Link, useParams } from "react-router-dom";
import { TID, TTodoUpdate, useTodos } from "../useStore";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { RoutePath } from "../App";
import FormEdit from "../components/formEdit";

function Edit() {
  const { id } = useParams();
  const { todo, fetchTodosById, updateTodosById } = useTodos(
    (state) => ({
      todo: state.todo,
      error: state.error,
      fetchTodosById: state.fetchTodosById,
      deleteTodos: state.deleteTodos,
      updateTodosById: state.updateTodosById,
      updateProgress: state.updateProgress,
    }),
    shallow
  );

  useEffect(() => {
    fetchTodosById(id as unknown as TID);
  }, []);

  const handleUpdateTodo = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const rawdata = new FormData(e.target);
    updateTodosById({
      id,
      title: rawdata.get("title"),
      description: rawdata.get("description"),
      progress: Number(rawdata.get("progress")),
    } as TTodoUpdate);
  };
  return (
    <>
      <div className="flex text-left">
        <Link
          to={`${RoutePath.HOME}`}
          className="text-left"
        >{`< Back to Home`}</Link>
      </div>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Edit Todo:
      </h2>
      {Object.keys(todo).length && (
        <FormEdit todo={todo} handleSubmit={handleUpdateTodo} />
      )}
    </>
  );
}
export default Edit;
