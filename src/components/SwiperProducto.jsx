import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import SwiperCore, {
    Pagination,
    Autoplay
} from "swiper";
import { useSelector } from 'react-redux';

const SwiperProducto = () => {

    const producto = useSelector(state => state.Producto.producto);

    SwiperCore.use([Pagination]);
    SwiperCore.use([Autoplay]);

    return(
        <Swiper className="swiper-producto" pagination={true} loop={true} autoplay={{delay:3000, disableOnInteraction: true}}>
            <SwiperSlide className="swiper-producto-detalles"><img alt={producto.nombre} className="imagenSwiper" src={producto.imagenPortada}/></SwiperSlide>
            { producto.imagenes !== 0 ? producto.imagenes.map(el => <SwiperSlide key={el} className="swiper-producto-detalles"><img className="imagenSwiper" src={el}/></SwiperSlide>) : null }
        </Swiper>
    );
}

export default SwiperProducto;