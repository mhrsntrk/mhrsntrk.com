import Container from '../components/Container';
import { getAllGears } from '@/lib/strapi';
import { NextSeo } from 'next-seo';
import Gear from '@/components/Gear';
import markdownToHtml from '@/lib/markdownToHtml';

export default function Uses({ allGears }) {
  return (
    <Container>
      <NextSeo
        title="Gear – mhrsntrk"
        description={` `}
        canonical="https://mhrsntrk.com/gear"
        openGraph={{
          url: 'https://mhrsntrk.com/gear',
          title: 'Gear – mhrsntrk',
          description: `Welcome to my personal blog. You can find all of my gear and setup that I am currently using.`
        }}
      />
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          My Gear
        </h1>
        <p className="mt-2 mb-0 text-gray-700 dark:text-gray-300">
          You can find all of my gear and setup that I am currently using. 
        </p>
      </div>
      <div className="w-full mb-8 prose dark:prose-dark max-w-none">
          <Gear content={allGears.content} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  try {
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
    const allGears = await getAllGears(isBuildTime);
    
    // Check if we have valid gear data
    const first = Array.isArray(allGears) && allGears.length > 0 ? allGears[0] : null;
    
    // During revalidation (not build time), if we get empty gear data, throw an error
    // This ensures Next.js serves the stale cached page instead of updating with empty data
    if (!isBuildTime && !first) {
      throw new Error('Failed to fetch gear data during revalidation - keeping stale cache');
    }
    
    // If no gear data at build time, use empty content
    const gearData = first || { content: '' };
    const content = await markdownToHtml(gearData.content || '');
    
    return {
      props: {
        allGears: {
          ...gearData,
          content
        }
      },
      // Revalidate every hour, but serve cached page if revalidation fails
      revalidate: 3600, // 1 hour
    };
  } catch (error) {
    console.warn('Failed to fetch gear data:', error.message);
    
    // During build time, return empty content (we need to build the page)
    // During revalidation, throw error to keep stale cache
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
    if (!isBuildTime) {
      // Re-throw error during revalidation so Next.js serves stale cached page
      throw error;
    }
    
    return {
      props: {
        allGears: {
          content: ''
        }
      },
      revalidate: 60,
    };
  }
}
