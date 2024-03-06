import TopicsTab from '@/components/TopicsTab/TopicsTab';
import Footer from '@/components/Footer/Footer';
import React from 'react';
import { axiosFetch } from '@/axios';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: {
    languageId: string,
  }
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.languageId
  const link = `/api/language/by-id/${id}`;
  // fetch data
  const languageData = (await axiosFetch.get(link)).data.data;
 
  return {
    title: `IronCodeMan | ${languageData?.name}`,
    description: languageData.description
  }
}

export default function LanguageLayout({children}:{children: React.ReactNode}) {
  return (
    <div className={`
      2xl:w-[1600px]
      w-[100%] mx-auto flex
    `}>
      <TopicsTab />
      <section
        className={`
        relative w-[100%] bg-[#FDFDFD]
        dark:bg-[#1B1B1B]
        `}
      >
        {children}
        <Footer />
      </section>
    </div>
  )
}
