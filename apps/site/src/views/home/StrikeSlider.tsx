import Slider, { LazyLoadTypes } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StrikeCard from './StrikeCard';

export default function StrikeSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    vertical: true,
    verticalSwiping: true,
  };
  return (
    <>
      <Slider className="slider-container m-0 p-0 w-[288px]" {...settings}>
        <StrikeCard key={0} image="card1.png" />
        <StrikeCard key={1} image="card2.png" />
      </Slider>
      <Slider
        className="slider-container m-0 p-0 w-[288px]"
        {...settings}
        rtl={true}
      >
        <StrikeCard key={0} image="card3.png" />
        <StrikeCard key={1} image="card4.png" />
      </Slider>
    </>
  );
}
