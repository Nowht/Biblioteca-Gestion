import Hero from '../components/ui/hero.jsx'
import BookCatalog from '../components/layouts/BookCatalog.jsx'

import { useState } from 'react'

function landingpage() {

    const [searchQuery, setSearchQuery] = useState("")
    return (
        <>
            <Hero onSearch={setSearchQuery} />
            <BookCatalog to="/book" query={searchQuery} />
        </>
    )
}

export default landingpage