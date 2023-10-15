import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { useEffect, useRef } from 'react';
// import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './Carousel.module.scss';

import image from '../../assets/images/cafe1.jpeg'

// register();

const Carousel = () => {

  const params = {
    modules: [Pagination, Navigation],
    slidesPerView: 2,
    // slidesPerView: "auto",
    centeredSlides: true,
    // spaceBetween: 60,
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

  return (
    <div className={styles.carouselContainer}>
      <Swiper className={styles.swiper} {...params}>
        <div className='swiper-wrapper'>
          <SwiperSlide className={styles.slide}>
            <img src={image} alt='Image1' />
            <p>1</p>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <img src={image} alt='Image2' />
            <p>2</p>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <img src={image} alt='Image3' />
            <p>3</p>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <img src={image} alt='Image4' />
            <p>4</p>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <img src={image} alt='Image5' />
            <p>5</p>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
  
}

export default Carousel