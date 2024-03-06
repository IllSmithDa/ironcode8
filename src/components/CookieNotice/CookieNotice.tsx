'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CookieNotice() {
  const { push } = useRouter();
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>();

  const toggleCookieAccept = (val :boolean) => {
    localStorage.setItem('iron_man_code_cookie_accept', JSON.stringify(val))
    setCookiesAccepted(val);
  }

  useEffect(() => {
    if (localStorage.getItem('iron_man_code_cookie_accept') === null) {
      localStorage.setItem('iron_man_code_cookie_accept', JSON.stringify(false))
    } else {
      const val = JSON.parse(localStorage.getItem('iron_man_code_cookie_accept') as string) as boolean ;
      setCookiesAccepted(val);
    }
  }, [cookiesAccepted])

  return (
    <div
      className={`
        bg-[#3333DD] w-[100%] fixed bottom-0 left-0 z-[100] px-[2rem] py-[1rem]
        2xl:w-[1600px] 2xl:left-[50%] 2xl:translate-x-[-50%] ${cookiesAccepted ? 'hidden': 'block'}
      `}
    >
      <section>

        <p className="my-[2rem] text-[#FFF]">
          We use cookies to enhance your browsing experience, serve personalized ads or content and analyze our traffic. By clicking &apos;Accept All&apos;, you consent to our use of cookies. 
        </p>
        <div
          className={`flex gap-[1rem] justify-end`}
        >
          <button
            onClick={() => {
              push('/cookies')
            }}
            className={`
              w-[75px] h-[37px] p-[1rem] bg-[#2A2A2A] text-[0.8rem]
              md:w-[150px] md:text-[1.5rem] md:h-[40px] 
              hover:bg-[#373737]
              dark:text-[#FFF] text-[#FFF]
            `}
          >Learn More</button>
          {/*
          <button
            onClick={() => {

            }}
            className={`
              w-[75px] h-[37px] p-[1rem] bg-[#2A2A2A] text-[0.8rem]
              md:w-[150px]  md:text-[1.5rem] md:h-[40px] 
              hover:bg-[#373737]
              dark:text-[#FFF] text-[#FFF]
            `}
          >Reject All</button>
          */}
          <button
            onClick={() => {
              toggleCookieAccept(true)
            }}
            className={`
              w-[75px] h-[37px] p-[1rem] bg-[#2A2A2A] text-[0.8rem]
              md:w-[150px] md:text-[1.5rem] md:h-[40px] 
              hover:bg-[#373737]
              dark:text-[#FFF] text-[#FFF]
            `}
          >
            Accept All
          </button>
        </div>
      </section>
    </div>
  )
}
