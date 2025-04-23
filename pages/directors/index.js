import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function Directors() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div>Error loading</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Directors</h1>
      {data.map(director => (
        <div key={director.id}>
          <h3>{director.name}</h3>
          <p>{director.biography}</p>
        </div>
      ))}
    </div>
  );
}
