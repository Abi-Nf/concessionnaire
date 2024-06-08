'use client';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useQuery } from 'react-query';
import { Montserrat, Poppins, Quicksand, Syne } from 'next/font/google';
import { DashHorizon } from '@/src/assets/fonts/dash-horizon';
import { apiProvider } from '@/src/provider/api-provider';
import { CarData } from '@/src/provider/api/car';
import { AppointmentModal } from '@/src/components/appointment-modal';

const carNameFont = Poppins({
  subsets: ['latin'],
  weight: '700',
  fallback: ['sans-serif'],
});
const brandFont = Syne({
  subsets: ['latin'],
  weight: '800',
});
const modelNameFont = Quicksand({ subsets: ['latin'] });
const descriptionFont = Montserrat({ subsets: ['latin'] });

interface Props {
  isCurrent: boolean;
  data: CarData;
}

export const CarItem = ({ data, isCurrent }: Props) => {
  const { data: image } = useQuery({
    queryKey: ['get-car-image', data.id],
    queryFn: () =>
      apiProvider.carImage.getCarImagesUrl(data.id).then((v) => v[0]),
  });

  const { data: brand } = useQuery({
    queryKey: ['get-car-brand', data.brandId],
    queryFn: async () => apiProvider.brand.get(data.brandId),
  });

  return (
    <div className="flex relative">
      <img
        src={image?.imageUrl}
        alt=""
        className="w-full h-[35rem] object-cover"
      />
      <div className="absolute w-full h-full flex flex-col text-white">
        <div className="h-full relative">
          <div className="flex items-center gap-2 absolute top-[2rem] left-[1rem]">
            <img
              alt=""
              src={brand?.logoUrl as string}
              className="w-[3rem] h-[3rem] object-fit"
            />
            <span className={brandFont.className + ' font-extrabold text-3xl'}>
              {brand?.name}
            </span>
          </div>

          <div className="absolute bottom-[1rem] left-[4rem] backdrop-blur-md border-2 border-opacity-15 border-white p-5 rounded-2xl">
            <div className="flex items-end gap-2">
              <h2 className={'text-5xl font-bold ' + carNameFont.className}>
                {data.name}
              </h2>
              <span className="text-zinc-300 bg-zinc-600 bg-opacity-60 rounded-xl px-1 py-[0.2rem]">
                {data.price.toLocaleString()} Ar
              </span>
            </div>
            <h3
              className={
                'text-3xl font-semibold text-zinc-300 ' +
                modelNameFont.className
              }
            >
              {data.model}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-center pb-3 gap-4 mb-8">
          <Button
            component={Link}
            href={'/car/' + data.id}
            variant="outlined"
            color="inherit"
            className="backdrop-blur-2xl rounded-2xl"
          >
            <span className="font-bold">More info</span>
          </Button>
          <AppointmentModal carId={data.id}>
            <Button variant="contained" className="rounded-2xl" color="inherit">
              <span className="text-black">Buy this one</span>
            </Button>
          </AppointmentModal>
        </div>
      </div>
    </div>
  );
};
