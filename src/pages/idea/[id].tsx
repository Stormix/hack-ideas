import Loading from '@/components/atoms/Loading';
import Comments from '@/components/molecules/Comments';
import Hero from '@/components/molecules/Hero';
import IdeaCard from '@/components/molecules/IdeaCard';
import { api } from '@/utils/api';
import { type NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const Idea: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data: idea, isLoading } = api.ideas.getOne.useQuery({
    id: id as string
  });
  const { data: comments, isLoading: commentsLoading } = api.comments.getAll.useQuery({
    ideaId: id as string
  });

  return (
    <>
      <NextSeo
        title={`Project Idea: ${idea?.title}`}
        description={`${(idea?.description ?? '').substring(0, 160)}...`}
      />
      <div className="container mx-auto flex flex-col items-center justify-center">
        <Hero noPadding empty>
          <div className="flex flex-grow flex-col"></div>
        </Hero>
        {isLoading && (
          <div className="flex w-full items-center justify-center">
            <Loading className="h-6 w-6" />
          </div>
        )}
        {idea && (
          <>
            <IdeaCard idea={idea} className="w-full" />
            <div className="mt-12 w-full">
              <Comments idea={idea} comments={comments ?? []} loading={commentsLoading} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Idea;
