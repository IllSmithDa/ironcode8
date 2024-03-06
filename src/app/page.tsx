import Image from 'next/image';
import mainImg from '../../public/iron_title.svg';import HomeLayout from './HomeLayout';
``
export default function Home() {
  return (
    <HomeLayout>
      <section
        className={`
          flex flex-col items-center min-h-[100px] h-[95vh] z-[-100] relative w-[100%] mt-[47px] pt-[13rem]
          md:min-h-[1000px]
        `}
      >
        <Image
          src={mainImg}
          alt='main title image'
          className={`
            w-max-[400px] max-h-[400px]
            xl:w-[30%]
            lg:w-[35%]
            w-[40%]
            fadeInLeft
          `}
        />
        <h1
          className={`
            lg:text-[6.5rem] lg:m-[5rem]
            md:text-[4rem]
            sm:text-[3rem]
            text-[2.2rem]
            font-[700] mt-[5rem] mb-[2.5rem] dark:text-white text-black
          `}
        >
          IronCodeMan
        </h1>
        <h2 className='fadeInLeft'>
          A Reference for Programmers
        </h2>
        <h4 className='fadeInLeft'>
          Select topic or language
        </h4>
  
      </section>
    </HomeLayout>
  )
}
