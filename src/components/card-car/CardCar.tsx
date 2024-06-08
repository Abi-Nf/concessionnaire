'use client';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { Button, Chip } from '@mui/material';
import { Info, ShoppingCart } from 'lucide-react';
import { apiProvider } from '@/src/provider/api-provider';
import { Montserrat } from 'next/font/google';
import { CarData } from '@/src/provider/api/car';
import { AppointmentModal } from '@/src/components/appointment-modal';

const montserrat = Montserrat({ subsets: ['latin'] });

interface Props {
  car: CarData;
}

export const CardCar = ({ car = {} as CarData }: Props) => {
  const { data: image } = useQuery({
    queryKey: ['get-car-image', car.id],
    queryFn: () =>
      apiProvider.carImage.getCarImagesUrl(car.id).then((v) => v[0]),
  });

  return (
    <div className="rounded-xl bg-zinc-800 overflow-hidden group shadow-lg p-3">
      <div className="w-full overflow-hidden rounded-lg">
        <img
          alt=""
          src={image?.imageUrl}
          className="w-full group-hover:scale-110 rounded-lg transition-transform aspect-[3/2] object-cover"
        />
      </div>
      <div className="mt-3">
        <div className="w-full flex items-center justify-between text-white">
          <h2
            className={'text-xl font-bold line-clamp-1 ' + montserrat.className}
          >
            {car.name}
          </h2>
          <Chip
            label={(car.price || 0).toLocaleString() + ' Ar'}
            className="font-semibold text-white"
          />
        </div>
        <div className="text-white">
          <span className="text-sm font-semibold text-zinc-300">
            {car.model}, {car.engineType}
          </span>
          <p
            className="line-clamp-2 text-zinc-400 "
            dangerouslySetInnerHTML={{ __html: car.description }}
          ></p>
        </div>

        <div className="pt-2 flex items-center text-gray-800 gap-4 justify-end">
          <Button
            size="small"
            color="inherit"
            variant="contained"
            className="text-black font-semibold"
            component={Link}
            href={'/car/' + car.id}
            startIcon={<Info />}
          >
            More info
          </Button>
          <AppointmentModal carId={car.id}>
            <Button
              size="small"
              variant="contained"
              sx={{
                background: 'rgb(31 41 55)',
                color: 'white',
              }}
              startIcon={<ShoppingCart />}
            >
              Buy this
            </Button>
          </AppointmentModal>
        </div>
      </div>
    </div>
  );
};
