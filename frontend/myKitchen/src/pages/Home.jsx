import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import RezepteKachel from '../layout/RezeptKachel';
import HeroSlider from '../layout/HeroSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import MyChefHero from '../layout/MyChefHero';
import Introduction from '../layout/Introduction';
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
            <Introduction />
            <div className='w-screen bg-white h-auto pt-16 pb-16'>
                <div className='hl-1-small text-center'>So könnte es dann <span className='hl-accente'> aussehen ... </span></div>
            </div>
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
            <div className='w-screen bg-white h-auto pt-16 pb-16'>
                <div className='content'>
                    <div className='hl-1-small'>Dir <span className='hl-accente'> gefällt </span> was du siehst?</div>
                    <div className='hl-2'>Dann hör auf zu warten <span className='hl-accente'>... </span> </div>
                    <div className='primary-button'>
                        <a href="/register" className='button primary-buton'>
                            Jetzt Regisstrieren
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
