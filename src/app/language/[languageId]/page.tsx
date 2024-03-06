'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosFetch } from '@/axios';
import { ConceptItem, Language } from '@/types';
import { useParams } from 'next/navigation';
import MobileAds1 from '@/components/Ads/MobileAds1';
import Ads from '@/components/Ads/Ads';
import Loader from '@/components/Loader/Loader';
import MobileAds2 from '@/components/Ads/MobileAds2';
import { parseConcepts } from '@/helper/parseData';
import NoMatch from '@/components/NoMatch/NoMatch';

export default function Languages() {
  // const [isLoading, setIsLoading] = useState(true);
  const [category, SetCategory] = useState("all");
  const [title, setTitle] = useState("All");
  const [categoryDrop, SetCategoryDrop] = useState(false);
  const params = useParams<{ languageId: string }>()
  const {languageId} = params
  const languageLink = `/api/language/by-id/${languageId}`
  const link = `/api/concept/by-language`;
  // const {isDark} = useTheme();
  

  const languageQuery = useQuery({
    queryKey: ['language-item', languageId],
    queryFn: async () => {
      const languageRes = await axiosFetch.get(languageLink)
      return languageRes.data.data;
    }
  })

  const languageData:Language = languageQuery?.data;

  const conceptItemQuery = useQuery({
    queryKey: ['conceptItem', languageData?.name],
    queryFn: async () => {
      const res = await axiosFetch.post(link, { language: languageData?.name})
      const data: ConceptItem[] = res.data.data;
      return data;
    },
    enabled: !!languageData,
  })

  const concepts: ConceptItem[] = (conceptItemQuery?.data as ConceptItem[]);

  useEffect(() => {
    if (concepts?.length) {
      for(let i = 0; i < concepts.length; i += 1) {
        parseConcepts(concepts[i].text, `${concepts[i].id}_code`);
      }
    }

  }, [concepts, category])

  const renderData = () => {
    return (
      <>
        {
          concepts?.filter(topic => topic.category === category || category === 'all').map((data) => (
            <li
              className={`
                w-[[200]%] bg-[#EAEAEA] p-[2rem] my-[2rem] fadeInLeft
                dark:bg-[#272727] 
              `}
              key={data.id}
            >
              <h4>{data.concept_name}</h4>
              <pre id={`${data.id}_code`} className='code'>{data.text}</pre>
            </li>
          ))
        }
      </>
    )
  }
  const handleTabChange = (topic: string, categoryTitle: string) => {
    SetCategory(topic);
    setTitle(categoryTitle);
    SetCategoryDrop(!categoryDrop);
  }

  /*
  if (languageQuery.isLoading || conceptItemQuery.isLoading) {
    return (
      <Loader />
    )
  }
  */
 
  if (languageQuery.isError || conceptItemQuery.isError) {
    return (
      <NoMatch msg="Error: Data fetching failed. Data does not exists or server has gone offline. Please try again later." />
    )
  }

  return (
    <section className={`
      px-[2rem] mb-[20rem] mb-[20rem] w-[100%]
    `}>
      <section
        className='lg:flex hidden justify-center w-[100%] my-[4rem]'
      >
        <Ads />
      </section>
      <section
        className='lg:hidden flex justify-center w-[100%] my-[2rem]'
      >
        <MobileAds2 />
      </section>
      <h3 className='mt-[
        2rem]'>Concepts for {languageData?.name}</h3>
      <p style={{ margin: "2rem 0"}} className='fadeInLeft'>
        {languageData?.description}
      </p>
      {
        !languageData || !concepts?.length?

        <section className={`
          h-[100vh] w-[100%]
        `}>
          <Loader />
        </section>:
        <section className={`
          relative flex
        `}>
        <button
          type='button'
          onClick={() => SetCategoryDrop(!categoryDrop)}
          className={`
            w-[100%] h-[47px] bg-[#EAEAEA] text-[1.5rem]
            hover:bg-[#EFEFEF]
            md:w-[200px]
            dark:bg-[#272727] dark:hover:bg-[#3C3C3C]
          `}
        >
          {title} {categoryDrop ? <>▲</> : <>▼</>}
        </button>
      {
        categoryDrop ?
        <section className={`
          flex flex-col absolute top-[47px] left-0 gap-0 bg-[#EEE] w-[100%]
          md:w-[200px]
        `}>
          <button
            onClick={() => handleTabChange('all', 'All') }
            className={`
              w-[100%] text-[1.5rem] p-[1rem] bg-[#D9D9D9] relative z-[75]
              md:w-[200px]
              hover:bg-[#EFEFEF]
              dark:bg-[#1C1C1C] dark:hover:bg-[#3C3C3C]
            `}
          >
            All
          </button>
          <button
            onClick={() => handleTabChange('basic', 'Basics') }
            className={`
              w-[100%] text-[1.5rem] p-[1rem] bg-[#D9D9D9] relative z-[75]
              md:w-[200px]
              hover:bg-[#EFEFEF]
              dark:bg-[#1C1C1C] dark:hover:bg-[#3C3C3C]
            `}
          >
            Basics
          </button>
          <button
            onClick={() => handleTabChange('data', 'Data Structures') }
            className={`
              w-[100%] text-[1.5rem] p-[1rem] bg-[#D9D9D9] relative z-[75]
              md:w-[200px]
              hover:bg-[#EFEFEF]
              dark:bg-[#1C1C1C] dark:hover:bg-[#3C3C3C]
            `}
          >
            Data Structures
          </button>
          <button
            onClick={() => handleTabChange('iterables', 'Iterables') }
            className={`
              w-[100%] text-[1.5rem] p-[1rem] bg-[#D9D9D9] relative z-[75]
              md:w-[200px]
              hover:bg-[#EFEFEF]
              dark:bg-[#1C1C1C] dark:hover:bg-[#3C3C3C]
            `}
          >
            Iterables
          </button>
          <button
            onClick={() => handleTabChange('class', 'Classes') }
            className={`
              w-[100%] text-[1.5rem] p-[1rem] bg-[#D9D9D9] relative z-[75]
              md:w-[200px]
              hover:bg-[#EFEFEF]
              dark:bg-[#1C1C1C] dark:hover:bg-[#3C3C3C]
            `}
          >
            Classes
          </button>
          <button
            onClick={() => handleTabChange('regex', 'Regex') }
            className={`
              w-[100%] text-[1.5rem] p-[1rem] bg-[#D9D9D9] relative z-[75]
              md:w-[200px]
              hover:bg-[#F2F2F2]
              dark:bg-[#1C1C1C] dark:hover:bg-[#3C3C3C]
            `}
          >
            Regex
          </button>
            </section>:
            <></>
          }
        </section>
      }
      <ul>
        {renderData()}
      </ul>
      <section
        className='xl:hidden flex justify-center w-[100%] my-[2rem]'
      >
        <MobileAds1 />
      </section>
      <section
        className='lg:flex justify-center w-[100%] mb-[4rem] hidden' 
      >
        <Ads />
      </section>
      {
        categoryDrop ? 
        <div
          className={`
            fixed z-50 left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto
          `}
          onClick={() => {
            SetCategoryDrop(false); 
          }}
        >
        </div>:
        <></>
      }
    </section>
  )
}
