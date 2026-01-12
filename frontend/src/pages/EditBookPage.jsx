import EditBookForm from "../components/forms/BookForm"

import { useParams } from "react-router-dom"

function EditBookPage() {
    const { id } = useParams()
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Editar Datos</h1>
            <EditBookForm />
        </div>
    )
}

export default EditBookPage