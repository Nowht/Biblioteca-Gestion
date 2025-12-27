import Hero from '../components/ui/hero.jsx'
import BookCatalog from '../components/layouts/BookCatalog.jsx'

function landingpage() {
    return (
        <div>
            <Hero></Hero>
            <BookCatalog to="/book"></BookCatalog>
        </div>
    )
}

export default landingpage