import Link from 'next/link';

export async function getServerSideProps({ params }) {
  const genreId = params.id;
  const genreRes = await fetch(`http://localhost:3000/api/genres`);
  const allGenres = await genreRes.json();
  const genre = allGenres.find((g) => g.id === genreId);

  if (!genre) return { notFound: true };

  const moviesRes = await fetch(`http://localhost:3000/api/genres/${genreId}/movies`);
  const movies = await moviesRes.json();

  return {
    props: { genre, movies },
  };
}


export default function GenreDetails({ genre, movies }) {
  return (
    <div>
      <h1>{genre.name}</h1>
      {movies.map((movie) => (
        <div key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </div>
      ))}
    </div>
  );
}
