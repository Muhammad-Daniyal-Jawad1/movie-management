import { useRouter } from 'next/router';

export default function Help() {
  const { slug } = useRouter().query;
  return <div>{slug ? `Help: ${slug.join(' / ')}` : 'Helps Home'}</div>;
}