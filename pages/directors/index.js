import useSWR from 'swr';
import Link from 'next/link';

const fetcher = url => fetch(url).then(res => res.json());

function DirectorDetails({ id }) {
  const { data, error } = useSWR(`/api/directors/${id}`, fetcher);

  if (error) return <div>Error loading director</div>;
  if (!data) return <div>Loading director...</div>;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>{data.name}</h3>
      <p>{data.biography}</p>
      <h4>Movies Directed:</h4>
      <ul>
        {data.movies.map(movie => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>{movie.title}</Link>{' '}
            ({movie.releaseYear}) - Rating: {movie.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Directors() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div>Error loading directors</div>;
  if (!data) return <div>Loading directors...</div>;

  return (
    <div>
      <h1>Directors</h1>
      {data.map(director => (
        <DirectorDetails key={director.id} id={director.id} />
      ))}
    </div>
  );
}
