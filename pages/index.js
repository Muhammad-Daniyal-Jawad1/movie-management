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
    <div style={{ padding: '20px' }}>
      <h1>Trending Movies</h1>
      {movies.map(movie => (
        <div key={movie.id} style={{ marginBottom: '10px' }}>
          <Link href={`/movies/${movie.id}`} style={{ fontSize: '18px', textDecoration: 'none', color: '#0070f3' }}>
            {movie.title}
          </Link>
          
          
        </div>
      ))}
      <button onClick={() => router.push('/genres')} style={{ marginBottom: '20px', padding: '10px' }}>
        Browse Genres
      </button>

      
      <div style={{ marginBottom: '10px' }}>
        <Link href="/faq" style={{ marginRight: '10px', textDecoration: 'underline' }}>FAQ</Link>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Link href="/help" style={{ marginRight: '10px', textDecoration: 'underline' }}>Help</Link>
      </div>
      <div>
        
        <Link href="/movies" style={{ textDecoration: 'underline' }}>All Movies</Link>
      </div>
      <div>
      <Link href={`/directors/`} style={{ fontSize: '14px', textDecoration: 'underline' }}>
              Directors
            </Link>
      </div>
    </div>
  );
}
