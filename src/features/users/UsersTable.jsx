// src/features/users/UsersTable.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, userAdded, userUpdated, userDeleted } from "./usersSlice";
import UserForm from "./UserForm";

export default function UsersTable() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);

  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAdd = (values) => {
    dispatch(userAdded(values));
  };

  const handleUpdate = (values) => {
    dispatch(
      userUpdated({
        id: editingUser.id,
        changes: values,
      })
    );
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    dispatch(userDeleted(id));
  };

  return (
    <div>
      <h2>Users</h2>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <UserForm
        key={editingUser ? editingUser.id : "create"}
        initialValues={
          editingUser || { name: "", email: "", username: "" }
        }
        onSubmit={editingUser ? handleUpdate : handleAdd}
        mode={editingUser ? "Edit" : "Create"}
        onCancel={() => setEditingUser(null)}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Username
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((u) => (
            <tr key={u.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {u.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {u.name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {u.username}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {u.email}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <button onClick={() => setEditingUser(u)}>Edit</button>
                <button
                  onClick={() => handleDelete(u.id)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {!loading && list.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
