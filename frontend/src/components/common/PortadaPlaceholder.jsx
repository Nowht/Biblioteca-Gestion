import { BookImage } from "lucide-react"

function PortadaPlaceholder({size=false}) {

    const cardsize = "w-12 h-12"
    const imagesize = "w-40 h-60"

  return (
    <div className={`h-full w-full min-w-28 min-h-48 bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg`}>
        <BookImage className={`${size ? imagesize : cardsize} text-gray-400 mb-2`} />
        <span className={`${size ? "text-lg": "text-xs"} font-medium text-gray-500 text-center px-2`}>Sin portada disponible</span>
    </div>
  )
}

export default PortadaPlaceholder