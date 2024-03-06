import { Language } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import UseAllLanguages from '@/hooks/languages';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { axiosFetch } from '@/axios';
import { useQuery } from '@tanstack/react-query';

export default function LanguageMenu() {
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const params = useParams<{ languageId: string }>()
  const selectedId = params.languageId

  const languages:Language[] = UseAllLanguages();

  const selectLanguageQuery = useQuery({
    queryKey:['select-language', selectedId],
    queryFn: async () => {
      const link = `/api/language/by-id/${selectedId}`;
      const res = await axiosFetch.get(link);
      return res.data.data.name
    },
    enabled: !!selectedId,
  })

  const languageName = selectLanguageQuery.data;

  useEffect(() => {
    if (mobileDropdown) {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.add('modal-open')
    } else {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.remove('modal-open')
    }
  }, [mobileDropdown])

  const renderData = languages?.map((entry) => (
    <section key={entry.id}>
    {
      selectedId === entry.id ? 
      <Link 
        href={`/language/${entry.id}`}
        className={`
          relative z-[150] block text-[1.6rem] p-[1.5rem] bg-[#F9F9F9]
          dark:bg-[#393939] dark:border-[#555]
          lg:md:border-b-[0]
        `}
        onClick={() => {
          setDesktopDropdown(false);
          setMobileDropdown(false);
        }}
      >
        {entry.name}
      </Link>:
      <Link 
        href={`/language/${entry.id}`}
        className={`
          relative z-[150] block text-[1.6rem] p-[1.5rem] bg-[#D1D1D1] active:bg-[#F9F9F9] border-b-[1px] border-[#AAA] 
          dark:bg-[#181818] dark:hover:bg-[#393939] dark:border-[#555]
          lg:md:border-b-[0]
          hover:bg-[#F9F9F9] 
        `}
        onClick={() => {
          setDesktopDropdown(false);
          setMobileDropdown(false);
        }}
      >
        {entry.name}
      </Link>
      }
    </section>
  ))

  return (
    <section className='relative'>
      <button
        onClick={() => setDesktopDropdown(!desktopDropdown)}
        className={`
          hidden h-[47px] px-4 w-[150px] text-[1.5rem] bg-[#CFCFCF] hover:bg-[#DADADA] focus:bg-[#DADADA] z-[1]
          lg:block 
          dark:bg-[#181818] dark:hover:bg-[#333]
        `}
      >
        {languageName ? languageName : `Select`} {desktopDropdown ? <>▲</> : <>▼</>}
      </button>
      <button
        onClick={() => setMobileDropdown(!mobileDropdown)}
        className={`
          h-[47px] px-4 w-[150px] text-[1.5rem] bg-[#CFCFCF] hover:bg-[#DADADA] focus:bg-[#DADADA] z-[1]
          lg:hidden
          dark:bg-[#181818] dark:hover:bg-[#333]
        `}
      >
        {languageName ? languageName : `Select`} {mobileDropdown ? <>▲</> : <>▼</>}
      </button>
      {
        desktopDropdown ?
        <section
          className={`
            hidden absolute bg-[#DDD] w-[150px] left-0
            lg:block
            dark:bg-[#1C1C1C]
          `}
        >
          {renderData}
        </section>:
        <></>
      }
      { 
        mobileDropdown ?
        <section
          key="mobile-language-nav"
          className={`
            h-[100vh] w-[100vw] fixed bg-[#D1D1D1] top-0 left-0 overflow-y-scroll
            lg:hidden lg:w-[150px] lg:min-h-[auto] lg:top-[auto] lg:left-[auto] lg:right-0
            dark:bg-[#181818] p-[1rem]
            moveInLeft
          `}
        >
          <button 
            onClick={() => setMobileDropdown(!mobileDropdown)}
            aria-label="close mobile navigation topics menu"
            className={`
              w-[47px] h-[47px] ml-[auto] block
              lg:hidden
            `}  
          >
            <FontAwesomeIcon
              icon={faClose}
              tabIndex={-1}
              className={`
                text-[2rem] font-[700]
              `}
            />
          </button>
          <h4
            className={`
              lg:hidden
              block m-0 py-[1rem]
              border-b-[1px]
              text-[1.7rem]
            `}
          >
            Select Language
          </h4>
          {renderData}
        </section>:
        <></>
      }
      {
        desktopDropdown ? 
        <div className={`
          fixed z-[50] left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto
        `} onClick={() => {
          setDesktopDropdown(false);
        }}></div>:
        <></>
      }

    </section>
  )
}
