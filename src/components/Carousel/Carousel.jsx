import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { forwardRef } from 'react';
// import { useEffect, useRef } from 'react';
// import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './Carousel.module.scss';

import image1 from '../../assets/images/cafe1.jpeg'

// register();

const Carousel = forwardRef(({ images }, ref) => {
  const params = {
    modules: [Pagination, Navigation],
    slidesPerView: 1,
    // slidesPerView: "auto",
    centeredSlides: true,
    // spaceBetween: 10,
    loop: true,
    // touchEventsTarget: 'wrapper',
    pagination: {
      clickable: true,
    },
    navigation: {
      hideOnClick: true,
      // preventClicks: true, //防止快速點擊按钮
      // preventClicksPropagation: true, //防止快速點擊按钮
    },
  };

  const slides = images
    .filter((image) => image !== null && image !== undefined)
    .map((image, index) => {
      return (
        <SwiperSlide key={index} className={styles.slide}>
          <img src={image} alt={`${index + 1}`} />
          <p>{index + 1}</p>
        </SwiperSlide>
      );
    });

  return (
    <div className={styles.carouselContainer} ref={ref}>
      <Swiper className={styles.swiper} {...params}>
        <div className='swiper-wrapper'>
          {slides}
        </div>
      </Swiper>
    </div>
  );
});

export default Carousel