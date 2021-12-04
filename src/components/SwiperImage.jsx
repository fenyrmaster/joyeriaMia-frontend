import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import SwiperCore, {
    Pagination,
    Autoplay
} from "swiper";
import ImagenEjemplo from "../img/ejemplo.jpg"
import ImagenLogo from "../img/Logo-2.jpg"

const SwiperImage = () => {

    SwiperCore.use([Pagination]);
    SwiperCore.use([Autoplay]);

    //loop={true} autoplay={{delay:3000, disableOnInteraction: true}}
    return(
        <Swiper className="swiper" pagination={true} loop={true} autoplay={{delay:3000, disableOnInteraction: true}}>
            <SwiperSlide className="swiper-slides"><img alt="imagen-decorativa" src={ImagenEjemplo} /></SwiperSlide>
            <SwiperSlide className="swiper-slides temporal"><img alt="imagen-decorativa" src={ImagenLogo} /></SwiperSlide>
        </Swiper>
    );
}

export default SwiperImage;