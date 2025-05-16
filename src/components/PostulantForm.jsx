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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["firstName", "lastName", "documentNumber", "email"];

    requiredFields.forEach((field) => {
      if (!form[field]?.trim()) {
        newErrors[field] = `Este campo es requerido`;
      }
    });

    // Validación adicional para email
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Ingrese un email válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (current) setForm(current);
  }, [current]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

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

  const handleCancel = () => {
    setForm({
      firstName: "",
      lastName: "",
      documentNumber: "",
      email: "",
      phone: "",
      address: "",
    });
    setErrors({});

    onCancel();
  };

  const fields = [
    { name: "firstName", label: "Nombre", required: true },
    { name: "lastName", label: "Apellido", required: true },
    { name: "documentNumber", label: "DNI", required: true },
    { name: "email", label: "Email", required: true },
    { name: "phone", label: "Teléfono", required: false },
    { name: "address", label: "Dirección", required: false },
  ];

  return (
  <form
    onSubmit={handleSubmit}
    className="space-y-3 bg-white shadow p-4 rounded-md"
  >
    <h2 className="text-lg font-bold">
      {current?.id ? "Editar" : "Nuevo"} Postulante
    </h2>

    {fields.map((field) => (
      <div key={field.name}>
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </label>
        <input
          name={field.name}
          value={form[field.name] || ""}
          onChange={handleChange}
          placeholder={field.label}
          className={`w-full p-2 border rounded ${
            errors[field.name] ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors[field.name] && (
          <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
        )}
      </div>
    ))}

    <div className="flex justify-end gap-2 pt-4">
      {current?.id && (
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
      )}
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {current?.id ? "Actualizar" : "Crear"}
      </button>
    </div>
  </form>)
    
}
