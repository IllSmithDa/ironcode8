/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react'
// import homeMobile from '../../assets/images/ads/mobile/home_mobile.png';
import sneakersMobile from '../../../public/Ads/mobile/sneaker_mobile.png';
import fashionMobile from'../../../public/Ads/mobile/fashion_mobile.png';
import Image from 'next/image';

// const homeLink = "https://ebay.us/oLhteO";
const fashionLink = "https://ebay.us/FL0Lj2";
const sneakersLink = "https://ebay.us/9F4wIK";

export default function MobileAds2() {
  const adlist  = [
    { 
      id: 1,
      imgLink: sneakersMobile,
      link: sneakersLink
    },
    { 
      id: 2,
      imgLink: fashionMobile,
      link: fashionLink
    },
    // { 
    //   id: 3,
    //   imgLink: adImg3,
    //   link: "https://ebay.us/zPdf5J"
    // },
  ]; 
  const [selectedAd, setSelectedAd] = useState(1)
  
  useEffect(() => {
    const nextVal = selectedAd ===  1 ? 2 : 1;
    const timer = setTimeout(() => { setSelectedAd(nextVal) }, 6000)
    return (() => clearTimeout(timer))
  }, [selectedAd])

  const renderAds = Object.values(adlist).map((ad) => (
    <>
      {
        ad.id === selectedAd ? 
        <div 
          className='
            my-slides
          ' 
          key={`ad_${ad.id}`}
        >
          <a href={ad.link} target='_blank'>
            <Image
              src={ad.imgLink}
              alt="mobile ad 1"
              className='
                 block aspect-auto
              '
            />
          </a>
        </div>:
        <></>
      }
    </>
  ))

  return (
    <section>
      {renderAds}
    </section>

  )
}
