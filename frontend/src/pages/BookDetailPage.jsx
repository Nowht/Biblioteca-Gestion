import BookImageSection from '../components/books/BookImageSection.jsx'
import BookInfoSection from '../components/books/BookInfoSection.jsx'

function BookDetailPage() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 place-items-center min-h-screen">
      <BookImageSection />
      <BookInfoSection />
    </div>
  )
}

export default BookDetailPage