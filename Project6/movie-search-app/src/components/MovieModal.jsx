const MovieModal = ({ movie, onClose }) => {
    if (!movie) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="mt-4 flex flex-col md:flex-row gap-6">
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full md:w-64 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/342x513?text=No+Image'
                }}
              />
              <div>
                <p className="text-gray-600 mb-4">{movie.overview}</p>
                <p className="text-sm text-gray-500">
                  Release Year: {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default MovieModal