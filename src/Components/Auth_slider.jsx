import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import {Autoplay, Pagination } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';

const Auth_slider = () => {


  const isNotMobile = useMediaQuery({ query: '(min-width: 640px)' });

  const custom_slide =(
    
      isNotMobile ? <>
       <SwiperSlide  ><img className='w-full h-full' src="https://www.logisticsinsider.in/wp-content/uploads/2022/06/New-Project-2021-04-23T133156.011-1.png" alt="slide1" /></SwiperSlide>
        <SwiperSlide  ><img src="https://i.ibb.co/chCQbS0/Group-1000001745.png" alt="slide2" /></SwiperSlide>
        <SwiperSlide  ><img src="https://i.ibb.co/chCQbS0/Group-1000001745.png" alt="slide3" /></SwiperSlide>
         </> : <> 
         <SwiperSlide  ><img className='w-full h-full' src="https://www.logisticsinsider.in/wp-content/uploads/2022/06/New-Project-2021-04-23T133156.011-1.png" alt="slide1" /></SwiperSlide>
         <SwiperSlide  ><img src="https://i.ibb.co/C7CTfsW/i-Phone-14-15-Pro-Max-6.png" alt="slide2" /></SwiperSlide>
         <SwiperSlide  ><img src="https://i.ibb.co/C7CTfsW/i-Phone-14-15-Pro-Max-6.png" alt="slide3" /></SwiperSlide>
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
        className="mySwiper md:max-h-[802px] md:max-w-[648px] max-h-[932px] max-w-[430px] w-full  md:h-[802px] md:rounded-2xl">
       {
        custom_slide
       }
      </Swiper>
    </>
    );
};

export default Auth_slider;