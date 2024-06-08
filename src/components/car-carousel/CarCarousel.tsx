'use client';
import './style.css';
import { apiProvider } from '@/src/provider/api-provider';
import { PropsWithChildren, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from 'react-query';
import Slider, { Settings } from 'react-slick';
import { CarItem } from './CarItem';

export const CarCarousel = () => {
  const [currentIndex, setImgIndex] = useState(0);
  const { data, isError, isLoading } = useQuery({
    queryKey: ['list-cars-for-carousel'],
    queryFn: () => apiProvider.car.getFavorites(),
  });

  const settings: Settings = {
    infinite: true,
    lazyLoad: 'anticipated',
    speed: 600,
    autoplay: true,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '0',
    nextArrow: (
      <Button>
        <ChevronRight size="2rem" />
      </Button>
    ),
    prevArrow: (
      <Button left>
        <ChevronLeft size="2rem" />
      </Button>
    ),
    beforeChange: (current: number, next: number) => setImgIndex(next),
  };

  return (
    <div className="relative">
      {data ? (
        <Slider {...settings} className="flex">
          {data.map((v, i) => (
            <CarItem key={i} data={v} isCurrent={i === currentIndex} />
          ))}
        </Slider>
      ) : (
        <div className="h-[35rem] bg-zinc-900 flex items-center justify-center">
          {isError ? (
            <span className="text-xl text-red-500 font-bold">
              Could not load cars
            </span>
          ) : (
            <span className="text-xl font-bold text-white">
              {isLoading
                ? !data
                  ? 'cars empty'
                  : 'loading cars'
                : 'no cars loaded'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const Button = ({
  children,
  left,
  ...rest
}: PropsWithChildren<{ left?: boolean }>) => {
  return (
    <button
      {...rest}
      className={
        'absolute top-[50%] z-[10] text-white ' +
        (left ? 'left-[1rem]' : 'right-[1rem]')
      }
    >
      {children}
    </button>
  );
};
