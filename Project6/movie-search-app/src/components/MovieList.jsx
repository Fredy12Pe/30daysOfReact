const MovieList = ({ movies, onMovieClick, isLoading, error }) => {
  if (error) {
    return <div className="text-center mt-8 text-red-400">{error}</div>;
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="flex flex-col bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-700 transition-colors overflow-hidden h-full"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[450px] object-cover object-top"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500x750?text=No+Image";
              }}
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-white text-xl mb-2">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {new Date(movie.release_date).getFullYear()}
              </p>
              <p className="text-gray-400 line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="flex justify-center items-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </>
  );
};

export default MovieList;
