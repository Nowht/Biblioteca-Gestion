import AddUserForm from "../components/forms/AddUserForm"

function AddUserPage() {
    return (
        <div className="max-w-md mx-auto md:px-4 md:py-10">
            <h1 className="text-3xl font-bold mb-6">Agregar Usuario</h1>
            <AddUserForm />
        </div>
    )
}

export default AddUserPage