import Link from 'next/link';
import { getGenreById, getMoviesByGenreId } from '../../../utils/dataUtils';

export async function getServerSideProps({ params }) {
  const genre = getGenreById(params.id);
  const movies = getMoviesByGenreId(params.id);

  if (!genre) return { notFound: true };

  return {
    props: { genre, movies },
  };
}

export default function GenreDetails({ genre, movies }) {
  return (
    <div>
      <h1>{genre.name}</h1>
      {movies.map(movie => (
        <div key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </div>
      ))}
    </div>
  );
}
