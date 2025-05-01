import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAllMovies } from '../utils/dataUtils';

export async function getStaticProps() {
  const movies = getAllMovies().slice(0, 3);
  return { props: { movies },
  revalidate: 10 };
}

export default function Home({ movies }) {
  const router = useRouter();
  return (
    <div>
      <h1>Trending Movies</h1>
      {movies.map(movie => (
        <div key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </div>
      ))}
      <button onClick={() => router.push('/genres')}>Browse Genres</button>
    </div>
  );
}
