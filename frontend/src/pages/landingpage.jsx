import Hero from '../components/ui/hero.jsx'
import BookCatalog from '../components/layouts/BookCatalog.jsx'
import ErrorMessage, {getErrorMessage} from '../components/common/ErrorMessage.jsx'
import LoadingMessage from '../components/common/LoadingMessage.jsx'

import { useBooks } from '../hooks/useBooks.js'

import { useState } from 'react'

function landingpage() {

    const [searchQuery, setSearchQuery] = useState("")

    const { data, isLoading, isError, error, refetch } = useBooks(searchQuery)

    if (isLoading) return <LoadingMessage message='Cargando Libros' />
    if (isError) return <ErrorMessage message={getErrorMessage(error)} retryFn={refetch} />
    

    return (
        <>
            <Hero onSearch={setSearchQuery} />
            <BookCatalog to="/book" books={data} />
        </>
    )
}

export default landingpage