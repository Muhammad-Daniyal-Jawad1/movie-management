import Link from 'next/link';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/genres');
  
  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const genres = await res.json();

  return {
    props: { genres },
  };
}

export default function Genres({ genres }) {
  return (
    <div>
      <h1>Genres</h1>
      {genres.map((genre) => (
        <div key={genre.id}>
          <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
        </div>
      ))}
    </div>
  );
}
