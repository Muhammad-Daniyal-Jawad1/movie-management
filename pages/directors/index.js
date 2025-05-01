import useSWR from 'swr';
import Link from 'next/link';

const fetcher = url => fetch(url).then(res => res.json());

export default function Directors() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div>Error loading</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Directors</h1>
      {data.map(director => (
        <div key={director.id} style={{ marginBottom: '2rem' }}>
          <h3>{director.name}</h3>
          <p>{director.biography}</p>
          <h4>Movies Directed:</h4>
          <ul>
            {director.movies.map(movie => (
              <li key={movie.id}>
                <Link href={`/movies/${movie.id}`}>
                  {movie.title}
                </Link>
                {' '}({movie.releaseYear}) - Rating: {movie.rating}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
