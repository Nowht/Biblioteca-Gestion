function BookImageSection({img}) {
  return (
    <figure className="flex justify-center items-center p-6">
        {img ? (
          <img src={img} alt="portada libro" />
        ): <img src="https://placehold.co/500x600" alt="portada libro" />}
    </figure>
  )
}

export default BookImageSection