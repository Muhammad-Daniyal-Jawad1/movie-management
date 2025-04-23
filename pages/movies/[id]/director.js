import { getAllMovies, getDirectorById } from '../../../utils/dataUtils';

export async function getStaticPaths() {
  const movies = getAllMovies();

  const paths = movies.map((movie) => ({
    params: { id: movie.id }
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const movieId = params.id;
  const movies = getAllMovies();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  const director = getDirectorById(movie.directorId);

  return {
    props: {
      director,
      movieTitle: movie.title,
    },
    revalidate: 10, 
  };
}

export default function DirectorPage({ director, movieTitle }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Director of {movieTitle}</h1>
      <h2>{director.name}</h2>
      <p>{director.biography}</p>
    </div>
  );
}
