import { useState } from 'react';
import Link from 'next/link';

export async function getStaticProps() {
  const moviesRes = await fetch('http://localhost:3000/api/movies');
  const genresRes = await fetch('http://localhost:3000/api/genres');

  const movies = await moviesRes.json();
  console.log(movies);
  const genres = await genresRes.json();
  console.log(genres);

  return {
    props: {
      movies,
      genres,
    },
    revalidate: 10,
  };
}

export default function MoviesPage({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies = selectedGenre === 'all'
    ? movies
    : movies.filter((movie) => movie.genre_id === selectedGenre);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>All Movies</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Filter by Genre: </label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="all">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '1rem',
              width: '250px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <h2>{movie.title}</h2>
            <p>
              <strong>Year:</strong> {movie.releaseYear}
            </p>
            <p>
              <strong>Rating:</strong> {movie.rating}
            </p>
            <Link href={`/movies/${movie.id}`}>
              <button style={{ marginTop: '0.5rem' }}>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
