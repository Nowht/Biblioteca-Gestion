import AddBookForm from "../components/forms/BookForm"

function AddBookPage() {
  return (
    <section className="max-w-6xl mx-auto md:px-4 md:py-10">
        <h1 className="text-3xl font-bold mb-6">Agregar Libro</h1>
        <AddBookForm/>
    </section>
  )
}

export default AddBookPage