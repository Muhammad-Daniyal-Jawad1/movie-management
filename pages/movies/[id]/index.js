import { getMovieById, getAllMovieIds, getDirectorById } from '../../../utils/dataUtils';
import Link from 'next/link';

export async function getStaticPaths() {
  return { paths: getAllMovieIds(), fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const movie = getMovieById(params.id);
  if (!movie) return { notFound: true };

  const director = getDirectorById(movie.directorId);

  return {
    props: {
      movie,
      directorName: director?.name || 'Unknown Director',
    },
    revalidate: 10,
  };
}

export default function MovieDetails({ movie, directorName }) {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Year: {movie.releaseYear}</p>
      <p>Rating: {movie.rating}</p>
      <Link href={`/movies/${movie.id}/director`}>
        {directorName}
      </Link>
    </div>
  );
}
