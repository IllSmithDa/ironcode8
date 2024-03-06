'use client';
import { useEffect } from 'react';
import { ActiveConceptItem, ActiveLanguages, ConceptItem, ConceptTopic, Language } from '@/types';

import { useQuery } from '@tanstack/react-query';
import { axiosFetch } from '@/axios';
import UseAllLanguages from '@/hooks/languages';
import { parseConcepts } from '@/helper/parseData';
import LanguageSelect from './LanguageSelect';
import Loader from '@/components/Loader/Loader';
import MobileAds2 from '@/components/Ads/MobileAds2';
import Ads2 from '@/components/Ads/Ads2';
import MobileAds1 from '@/components/Ads/MobileAds1';
import Ads from '@/components/Ads/Ads';
import NoMatch from '@/components/NoMatch/NoMatch';
import { useParams, useSearchParams } from 'next/navigation'

export default function Topic() {
  const params = useParams<{ topicId: string }>()
  const {topicId} = params
  // keeps returning null
  console.log(topicId)
  // const [conceptsAndLanguages, setConceptsAndLangauges] = useState<ActiveConceptItem[]>();
  const languages:Language[] = UseAllLanguages();

  const TopicDataQuery = useQuery({
    queryKey:["topicData", topicId],
    queryFn: async() => {
      const topicRes = await axiosFetch.get(`/api/concept/topic-object/${topicId}`);
      const result:ConceptTopic = topicRes.data.data;
      return result;
    },
    enabled: !!topicId
  })

  const topic: ConceptTopic = TopicDataQuery.data as ConceptTopic;
  
  const ConceptItemsQuery = useQuery({
    queryKey: ["activeConcepts", topicId],
    queryFn: async () => {
      const conceptLink = `/api/concept/topic-id/${topicId}`;
      const conceptRes = await axiosFetch.get(conceptLink);
      const result: ConceptItem[] = conceptRes.data.data;
      console.log(result);
      let activeLanguages: ActiveLanguages = {};
      if (localStorage.getItem('iron_code_languages') === null) {
        languages.forEach((entry) => {
          activeLanguages[entry.name] = true;
        })
        localStorage.setItem('iron_code_languages', JSON.stringify(activeLanguages))
      } else {
        activeLanguages = JSON.parse(localStorage.getItem('iron_code_languages') as string);
      }
      
      const activeConcepts:ActiveConceptItem[] = result.map((entry) => {
        return {
          ...entry,
          checked: activeLanguages[entry.language],
        }
      });
      console.log(activeConcepts);
      return activeConcepts;
    },
    enabled: !!topicId && languages?.length > 0
  })

  const conceptsAndLanguages: ActiveConceptItem[] = ConceptItemsQuery.data as ActiveConceptItem[];


  useEffect(() => {
    if (conceptsAndLanguages?.length) {
      for(let i = 0; i < conceptsAndLanguages.length; i += 1) {
        parseConcepts(conceptsAndLanguages[i].text, `${conceptsAndLanguages[i].id}_code`);
      }
    }

  }, [conceptsAndLanguages])


  const updateLanguages = (language: string, newChecked: boolean) => {
    conceptsAndLanguages?.map((data: ConceptItem) => {
      if (data.language === language) {
        return {
          ...data,
          language: data.language,
          checked: newChecked
        } 
      }
      return data;
    });
  }

  const renderData = (conceptsAndLanguages as ActiveConceptItem[])?.map((data) => (
    <>
      {
        data.checked ? 
        <article
          key={data.language}
          className={`
            w-[100%]  bg-[#EAEAEA] p-[1.5rem] mt-[2rem] h-[max]
            lg:w-[auto] xl:mt-0
            dark:bg-[#272727]
            fadeInLeft
          `}
        >
          <h4>{data.language}</h4>
          <pre
            id={`${data.id}_code`}
          >
            {data.text}
          </pre>
        </article>:
        <></>
      }
      </>
  ))

  /*
  if (TopicDataQuery.isLoading || ConceptItemsQuery.isLoading) {
    return (
      <Loader />
    )
  }
  */
 
  if (TopicDataQuery.isError || ConceptItemsQuery.isError) {
    return (
      <NoMatch msg="Error: Data fetching failed. Data does not exists or server has gone offline. Please try again later." />
    )
  }

  return (
    <section
      className={`
        px-[2rem]
      `}
    >
      <section
        className='xl:flex justify-center py-[2rem] w-[100%] hidden'
      >
        <Ads />
      </section>
      <section
        className='flex justify-center w-[100%] mt-[2rem] xl:hidden'
      >
        <MobileAds1 />
      </section>
      <article className={
        `my-[2rem]`
      }>
        <h3>{topic?.name}</h3>
        <p className='fadeInLeft'>{topic?.description}</p>
      </article>
      {
        ConceptItemsQuery.isLoading ?
         <Loader />:
         <section className='my-[2rem]'>
           <LanguageSelect languages={conceptsAndLanguages} updateLanguages={updateLanguages}/>
         </section>
      }
      <h4
        className={`
          mt-[2rem]
        `}
      >Examples</h4>
      {
        ConceptItemsQuery.isLoading ?
        <Loader />:
        <section
          key="language-listing"
          className={`
            pb-[20rem] block flex-wrap gap-[2rem]
            xl:flex
          `}
        >
          {renderData}
          <section
             className='flex justify-center w-[100%] mt-[2rem] lg:hidden'
           >
             <MobileAds2 />
           </section>
           <section
             className='lg:flex justify-center py-[2rem] w-[100%] hidden'
           >
             <Ads2 />
           </section>
        </section>
      }
    </section>
  )
}
