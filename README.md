# How to get Query parameteres in App Router version of Next.js

  1. https://stackoverflow.com/questions/76592804/how-to-access-query-parameters-in-next-js-13-4-with-the-new-app-router

  2. use 'userRouter' from 'next/navigation'

  # Error: returning null instead of the topicId when using uy

    1. seek documentation for addtional help

      a.  const searchParams = useSearchParams();
          const selectedId = searchParams.get('topicId');

    2. Fix 

      a. https://nextjs.org/docs/app/api-reference/functions/use-params

      b. use 'useParams' not useSearchParams();

      c. const params = useParams<{ tag: string; item: string }>()