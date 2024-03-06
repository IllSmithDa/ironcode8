/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react'
import watchMobile from '../../../public/Ads/mobile/watches_mobile.png';
import homeMobile from '../../../public/Ads/mobile/home_mobile.png';
import Image from 'next/image';
//import sneakersMobile from '../../assets/images/ads/mobile/sneaker_mobile.png';
//import fashionMobile from'../../assets/images/ads/mobile/fashion_mobile.png';
// import adImg3 from'../../assets/images/ads/tradingcard_banner.jpg';

const watchLink = "https://ebay.us/zPdf5J";
const homeLink = "https://ebay.us/oLhteO";
// const sneakersLink = "https://ebay.us/9F4wIK";
// const fashionLink = "https://ebay.us/FL0Lj2";

export default function MobileAds1() {
  const adlist  = [
    { 
      id: 1,
      imgLink: homeMobile,
      link: homeLink
    },
    { 
      id: 2,
      imgLink: watchMobile,
      link: watchLink
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
    const timer = setTimeout(() => { setSelectedAd(nextVal) }, 6000);
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
