import SearchBar from "../common/SearchBar";

function hero() {
  return (
    <section className="bg-blue-500 flex flex-col items-center text-center text-white p-10 md:p-20 md:mx-10 md:rounded-xl space-y-8">
      <h1 className="text-4xl font-bold">¡Bienvenido a la Biblioteca!</h1>
      <p className="">Explora nuestra colección de libros y recursos</p>
      <form action="" className="w-full max-w-md">
        <SearchBar />
      </form>
    </section>
  )
}

export default hero;