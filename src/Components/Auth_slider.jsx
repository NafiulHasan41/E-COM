import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import {Autoplay, Pagination } from 'swiper/modules';

const Auth_slider = () => {




  const custom_slide =(
    
    <>
    <SwiperSlide  ><img className='w-full h-full' src="/e-com-b1.jpeg" alt="slide1" /></SwiperSlide>
    <SwiperSlide  ><img className='w-full h-full' src="/e-com-b2.jpeg" alt="slide2" /></SwiperSlide>
    <SwiperSlide  ><img className='w-full h-full' src="/e-com-b3.jpeg" alt="slide3" /></SwiperSlide>
    
      </> 
  );




    return (
        <>
      <Swiper
       pagination={true}
       autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
        modules={[Autoplay , Pagination]}
        loop={true}
        className="mySwiper md:max-h-[802px] md:max-w-[648px]   w-full  md:h-[802px] md:rounded-2xl">
       {
        custom_slide
       }
      </Swiper>
    </>
    );
};

export default Auth_slider;