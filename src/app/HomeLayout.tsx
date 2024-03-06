import HomeAds from "@/components/Ads/HomeAds"
import Footer from "@/components/Footer/Footer"
import TopicsTab from "@/components/TopicsTab/TopicsTab"

export async function generateMetadata(){
  // read route params
  return {
    title: `IronCodeMan | Home`,
    description: `Ironcodeman: A reference for Programmers. Select topic or language`
  }
}

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <div
      className={`
        2xl:w-[1600px]
        w-[100%] mx-auto flex bg-[#FDFDFD]
        dark:bg-[#1B1B1B]
      `}
    >
      <TopicsTab />
      <section
        data-testid="main-content"
        className={`
        relative w-[100%] z-0
        `}
      >      
        <section
          className='flex justify-center w-[100%] px-[5px]'
        >
          <HomeAds />
        </section>
        {children}
        <Footer />
      </section>
    </div>
  )
}
