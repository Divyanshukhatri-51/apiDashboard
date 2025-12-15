// src/features/users/UserForm.jsx
import { useState, useEffect } from "react";

export default function UserForm({
  initialValues,
  onSubmit,
  mode = "Create",
  onCancel,
}) {
  const [form, setForm] = useState(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (mode === "Create") {
      setForm({ name: "", email: "", username: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "flex-end",
        marginTop: "1rem",
      }}
    >
      <div>
        <label>Name</label>
        <br />
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Username</label>
        <br />
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <br />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">{mode}</button>
      {mode === "Edit" && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
