import PortadaPlaceholder from "../common/PortadaPlaceholder"

function BookImageSection({img}) {
  return (
    <figure className="flex items-center w-80 h-96 md:w-lg md:h-[600px]">
        {img ? (
          <img src={img} alt="portada libro" className="w-full h-full object-contain" />
        ): <PortadaPlaceholder size={true} />}
    </figure>
  )
}

export default BookImageSection