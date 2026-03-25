import { useState } from "react";
import { useGetTodosQuery } from "../../../services/todoApi";
import { useAddTodoMutation } from "../../../services/todoApi";
import { useUpdateTodoMutation } from "../../../services/todoApi";
import { useDeleteTodoMutation } from "../../../services/todoApi";
  

function Todolist() {
  const { data,isLoading, error } = useGetTodosQuery();
  const todos = Array.isArray(data) ? data : [];
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = async () => {
    if (!title.trim()) return;

    if (editId) {
      await updateTodo({
        id: editId,
        title: title,
        status: false,
      });
      setEditId(null);
    } else {
      await addTodo({ title, status: false });
    }

    setTitle("");
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  const handleEditClick = (todo) => {
    setTitle(todo.title);   
    setEditId(todo._id);   
  };

  if (isLoading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h2 className="text-center mt-5 text-danger">Error</h2>;

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body text-center">
          <h2 className="mb-3">Todo List</h2>

          <div className="d-flex mb-3">
            <input
              className="form-control me-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo"
            />

            <button
              className={`btn ${editId ? "btn-secondary" : "btn-primary"}`}
              onClick={handleAddOrUpdate}
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>

          <ul className="list-group">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{todo.title}</span>

                <div>
                  {/* ✅ Edit button */}
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(todo)}
                  >
                    Edit
                  </button>

                  {/* ✅ Delete */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todolist;