import SearchBar from "../common/SearchBar"
import Button from "./Button"
import ButtonLink from "./ButtonLink"

import { Plus, Trash2 } from "lucide-react"

function SectionHero({ title, paragraph, children, createTo, deleteAlert }) {
    return (
        <section className="w-full md:px-8 flex flex-col h-full overscroll-contain md:h-full">
            <header className="flex flex-col shrink-0">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-gray-600 mb-4">{paragraph}</p>
                <div className="mb-4 flex flex-col md:flex-row justify-between">
                    <SearchBar />
                    <div className="flex space-x-2 mt-3 justify-center md:my-0">
                        {deleteAlert && (
                            <Button variant="danger">
                                <Trash2 />
                            </Button>
                        )}

                        {createTo && (
                            <ButtonLink to={createTo} variant="primary">
                                <Plus size={24} />
                                <span className="text-base">Añadir</span>
                            </ButtonLink>
                        )}

                    </div>
                </div>
            </header>
            <div className="flex-1 min-h-72 md:min-h-0">
                {children}
            </div>
        </section>
    )
}

export default SectionHero