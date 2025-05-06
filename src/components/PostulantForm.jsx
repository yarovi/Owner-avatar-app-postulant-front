import { useState, useEffect } from "react";

export default function PostulantForm({ onSave, current, onCancel }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    documentNumber: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (current) setForm(current);
  }, [current]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      firstName: "",
      lastName: "",
      documentNumber: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white shadow p-4 rounded-md"
    >
      <h2 className="text-lg font-bold">
        {form.id ? "Edit" : "New"} Postulant
      </h2>
      {[
        "firstName",
        "lastName",
        "documentNumber",
        "email",
        "phone",
        "address",
      ].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full p-2 border rounded"
        />
      ))}
      <div className="flex justify-end gap-2">
        {form.id && (
          <button type="button" onClick={onCancel} className="text-gray-500">
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {form.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
