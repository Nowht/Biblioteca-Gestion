import { useParams } from 'react-router-dom'

import BookImageSection from '../components/books/BookImageSection.jsx'
import BookInfoSection from '../components/books/BookInfoSection.jsx'

import { useBook } from '../hooks/useBooks.js'

function BookDetailPage() {

  const { id } = useParams()

  const { data: book, isLoading, isError, error } = useBook(id)

  if (isLoading) return <div>Cargando detalles del libro...</div>
  if (isError) return <div>Error al cargar: {error.message}</div>

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 place-items-center min-h-screen">
      <BookImageSection />
      <BookInfoSection info={book} />
    </div>
  )
}

export default BookDetailPage