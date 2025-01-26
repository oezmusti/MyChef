import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKachel from '../layout/RezeptKachel';
import HeroSlider from '../layout/HeroSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import MyChefHero from '../layout/MyChefHero';
// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Swiper Modules
import { Autoplay, Navigation } from 'swiper/modules';

function Home() {
    return (
        <>
            <Header />
            <MyChefHero />
            <Swiper
                centeredSlides={true}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <HeroSlider
                        name="Hamburger"
                        description="Ein leckerer Hamburger, perfekt für den schnellen Genuss!"
                        time="30"
                        category="Vollkost"
                        backgroundImage="/uploads/hamburger.jpg"
                    />
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <HeroSlider
                        name="Pizza"
                        description="Eine leckere Pizza, die jeden Geschmack trifft!"
                        time="25"
                        category="Vegi"
                        backgroundImage="/uploads/pizza.jpg"
                    />
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <HeroSlider
                        name="Salat"
                        description="Ein gesunder Salat für jede Gelegenheit!"
                        time="15"
                        category="Vegan"
                        backgroundImage="/uploads/salat.jpg"
                    />
                </SwiperSlide>
            </Swiper>
            <div className='content'>
                <div className='headline'>
                    Favoriten
                </div>
                <div className='slider'>
                    <div className='flex flex-row gap-8'>
                        <RezepteKachel />
                        <RezepteKachel />
                        <RezepteKachel />
                        <RezepteKachel />
                        <RezepteKachel />
                        <RezepteKachel />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
