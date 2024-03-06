'use client';
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link';
import { ConceptTopic } from '../../types';
import UseConceptTopics from '@/hooks/concepts';

export default function TopicsTab() {

  const params = useParams<{ topicId: string }>()
  const selectedId = params.topicId;
  const topics:ConceptTopic[] = UseConceptTopics();

  const topicList = [
    {
      title: 'Basics',
      value: 'basic'
    }, 
    {
      title: 'Data Structure',
      value: 'data'
    }, 
    {
      title: 'Iterables',
      value: 'iterables'
    }, 
    {
      title: 'Classes',
      value: 'class'
    }, 
    {
      title: 'Regex',
      value: 'regex'
    }, 
  ]


  const renderData = (category: string) => {
    return (
      <>
      {
        topics?.filter(topic => topic.category === category).map((topic) => (
          <section key={topic.id}>
            {
              topic.id === selectedId ?
              <Link
                href={`/topic/${topic.id}`}
                className={`
                 block w-[100%] p-[1rem] bg-[#FDFDFD] text-[1.5rem] 
                 dark:bg-[#444]
              `}
              >
                {topic.name}
              </Link>:
              <Link
                href={`/topic/${topic.id}`}
                className={`
                  block w-[100%] p-[1rem] hover:bg-[#FDFDFD] text-[1.5rem]
                  dark:hover:bg-[#444]
                `}
              >
                {topic.name}
              </Link>
            }
          </section>
        ))
      }
      </>
    )
  };

  return (
    <section
      id='topic-tab'
      data-testid='topics-tab'
      className={`
        xl:block
        hidden bg-[#DEDEDE] w-[200px] pb-[15rem] px-[2px]
        dark:bg-[#181818] 
      `}
    >
      {
        topicList.map((topicOjb) => {
          return (
            <section key={topicOjb.title}>
              <h4
                className={`
                  p-[1rem]  border-b-[1px] text-[1.6rem] w-[100%] font-[600]
                `}
              >
                {topicOjb.title}  
              </h4>
              {renderData(topicOjb.value)}
            </section>
          )
        })
      }
    </section>
  )
}
