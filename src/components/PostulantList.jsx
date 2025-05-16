import { useEffect, useState } from "react";
import {
  getAllPostulants,
  createPostulant,
  updatePostulant,
  deletePostulant,
} from "./PostulantService";
import PostulantForm from "./PostulantForm";

export default function PostulantList() {
  const [postulants, setPostulants] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => getAllPostulants().then((res) => setPostulants(res.data));

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (data) => {
    if (data.id) {
      await updatePostulant(data.id, data);
    } else {
      await createPostulant(data);
    }
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    //await deletePostulant(id);
    //load();
    if (window.confirm("¿Confirmas que deseas eliminar este postulante?")) {
      try {
        const response = await deletePostulant(id);
        if (response.status === 200) {
          await load(); // Recargar la lista
          // Opcional: Mostrar notificación de éxito
          alert("Postulante eliminado correctamente");
        } else if (response.status === 404) {
          alert("El postulante no fue encontrado");
        }
      } catch (error) {
        console.error("Error:", error.response?.data?.error || error.message);
        alert("Ocurrió un error al eliminar");
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PostulantForm
        onSave={handleSave}
        current={editing}
        onCancel={() => setEditing(null)}
      />
      <h2 className="text-xl font-semibold">List of Postulants</h2>
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Name</th>
            <th className="border px-2">Document</th>
            <th className="border px-2">Email</th>
            <th className="border px-2">Phone</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {postulants.map((p) => (
            <tr key={p.id}>
              <td className="border px-2">
                {p.firstName} {p.lastName}
              </td>
              <td className="border px-2">{p.documentNumber}</td>
              <td className="border px-2">{p.email}</td>
              <td className="border px-2">{p.phone}</td>
              <td className="border px-2 space-x-2">
                <button onClick={() => setEditing(p)} className="text-blue-500">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
