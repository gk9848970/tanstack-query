import { SubmitHandler, useForm } from "react-hook-form";
import { useTodoIds, useTodos } from "../services/queries";
import { Todo } from "../types/todo";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";

export default function Todos() {
  const todosIdsQuery = useTodoIds();
  const todosQuery = useTodos(todosIdsQuery.data);

  const { handleSubmit, register } = useForm<Todo>();
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkAsDone = (data: Todo) => {
    updateTodoMutation.mutate({ ...data, checked: true });
  };

  const handleDeleteTodo = async (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo:</h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating" : "Create Todo"}
        />
      </form>

      {todosQuery.map(
        ({ data }) =>
          data && (
            <li key={data.id}>
              <div>ID: {data.id}</div>
              <span>
                <strong>Title:</strong> {data.title || ""}
                <strong>Description:</strong> {data.description || ""}
              </span>
              <div>
                <button
                  type="button"
                  onClick={() => handleMarkAsDone(data)}
                  disabled={data.checked}
                >
                  {data.checked ? "Done" : "Mark as done"}
                </button>
                <button type="button" onClick={() => handleDeleteTodo(data.id)}>
                  Delete
                </button>
              </div>
            </li>
          )
      )}
    </>
  );
}
