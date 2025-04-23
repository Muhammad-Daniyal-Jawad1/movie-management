import { getGenres } from '../../utils/dataUtils';
import Link from 'next/link';

export async function getServerSideProps() {
  return { props: { genres: getGenres() } };
}

export default function Genres({ genres }) {
  return (
    <div>
      <h1>Genres</h1>
      {genres.map(genre => (
        <div key={genre.id}>
          <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
        </div>
      ))}
    </div>
  );
}