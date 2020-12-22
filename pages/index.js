import Container from '../components/Container';
import BlogPost from '../components/BlogPost';
//import ProjectCard from '../components/ProjectCard';
import NextLink from 'next/link';

import { getAllPostsForHome } from '@/lib/strapi';

export default function Home({ allPosts }) {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl mb-4 text-black dark:text-white">
          Hello world! It's mhrsntrk.
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus
          porttitor.
        </h2>
        <NextLink href="/blog">
          <a className="font-bold text-3xl md:text-4xl tracking-tight mb-4 text-black dark:text-white hover:underline no-underline">
            <h3>Blog </h3>
          </a>
        </NextLink>

        {allPosts.map((post) => (
          <BlogPost
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
          />
        ))}
        {/* <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          Projects
        </h3>
        <ProjectCard
          title="Fast Feedback"
          description="The easiest way to add comments or reviews to your static site. Built as part of React 2025."
          href="https://fastfeedback.io/"
          icon="fastfeedback"
        /> */}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPostsForHome();
  return {
    props: { allPosts }
  };
}
