/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react'
// import homeAd from '../../assets/images/ads/home_banner.png';
import cardAd from'../../../public/Ads/tradingcard_banner.jpg';
// import cardAd from'../../assets/images/ads/tradingcard_banner.jpg';
import sneakerAd from '../../../public/Ads/Sneakers_banner.png';
import Image from 'next/image';

// import watchAd from '../../assets/images/ads/watches_banner.png';
// const homeLink = "https://ebay.us/oLhteO";
const tradingCardLink = "https://ebay.us/hkw3l5";
// const watchLink = "https://ebay.us/zPdf5J";
const sneakersLink = "https://ebay.us/9F4wIK";
export default function Ads2() {
  const adList  = [
    { 
      id: 1,
      imgLink: sneakerAd,
      link: sneakersLink
    },
    { 
      id: 2,
      imgLink: cardAd,
      link: tradingCardLink
    },
    // { 
    //   id: 3,
    //   imgLink: adImg3,
    //   link: "https://ebay.us/zPdf5J"
    // },
  ]; 
  const [selectedAd, setSelectedAd] = useState(1)
  
  useEffect(() => {
    // // const nextVal = selectedAd === adlist.length ? 1 : (selectedAd + 1);
    const nextVal = selectedAd ===  1 ? 2 : 1;
    // console.log(nextVal);
    const moveLeft = () => {
      const adContainer = document.getElementById(`ads3_container`)
      if (adContainer) {
        if (selectedAd === 1) {
         adContainer.scrollLeft += 728;
        } else {
          adContainer.scrollLeft -= 728;
        }
      }
    }
    const timer = setTimeout(() => {
      moveLeft();
      setSelectedAd(nextVal);
    }, 6000)

    return (() => clearTimeout(timer))
  }, [selectedAd])

  const renderAds = Object.values(adList).map((ad, index) => (
  
    <a
      key={`ads2_${ad.id}`}
      id={`ads2_${ad.id}`}
      href={ad.link}
      target='_blank'
      className={`
        lg:w-[728px] w-[100%] left-[${index * 728}px]
      `}  
    >
      <Image
        src={ad.imgLink}
        className='w-[728px] max-w-[100vw]'
        alt="ebay ad 1"
      />
    </a>
  ))

  return (
    <section id="ads3_container"  className='pt-[2rem] flex lg:w-[728px] w-[auto] h-[auto] overflow-x-hidden scroll-smooth'>
      {renderAds}
    </section>

  )
}
