import Link from 'next/link';

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/movies');
  const movies = await res.json();

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const movieRes = await fetch(`http://localhost:3000/api/movies/${params.id}`);
  if (!movieRes.ok) return { notFound: true };

  const rawMovie = await movieRes.json();
  const movie = {
    id: rawMovie.id,
    title: rawMovie.title,
    description: rawMovie.description,
    releaseYear: rawMovie.release_year,
    rating: rawMovie.rating,
    directorId: rawMovie.director_id,
    genreId: rawMovie.genre_id,
  };

  const directorRes = await fetch(`http://localhost:3000/api/directors/${movie.directorId}`);
  const director = directorRes.ok ? await directorRes.json() : null;

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
    <div style={{ padding: '2rem' }}>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Year: {movie.releaseYear}</p>
      <p>Rating: {movie.rating}</p>
      <Link href={`/movies/${movie.id}/director`} style={{ textDecoration: 'underline', color: 'blue' }}>
        {directorName}
      </Link>
    </div>
  );
}
