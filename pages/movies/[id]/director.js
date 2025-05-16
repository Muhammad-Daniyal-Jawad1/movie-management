export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/movies');
  const movies = await res.json();

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

  const movieRes = await fetch(`http://localhost:3000/api/movies/${movieId}`);
  if (!movieRes.ok) {
    return {
      notFound: true,
    };
  }

  const rawMovie = await movieRes.json();

  const movie = {
    id: rawMovie.id,
    title: rawMovie.title,
    directorId: rawMovie.director_id,
  };

  const directorRes = await fetch(`http://localhost:3000/api/directors/${movie.directorId}`);
  if (!directorRes.ok) {
    return {
      notFound: true,
    };
  }

  const director = await directorRes.json();

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
