import { useRouter } from 'next/router';

export default function HelpPage() {
  const router = useRouter();
  let slug = [];
  let content;
  if (router.query.slug) {
      slug = router.query.slug;
  }


  
   if (slug[0] === 'faqs') {
    content = <h1>Frequently Asked Questions</h1>;
  } else if (slug[0] === 'contact') {
    content = <h1>Contact Us</h1>;
  } else if (slug[0] === 'privacy') {
    content = <h1>Privacy Policy</h1>;
  } else {
    content = <h1>Page Not Found</h1>;
  }

  return <div>{content}</div>;
}
