'use client';
import { Button, Chip } from '@mui/material';
import { useQuery } from 'react-query';
import { Montserrat, Quicksand, Syne } from 'next/font/google';
import { apiProvider } from '@/src/provider/api-provider';
import { AppointmentModal } from '@/src/components/appointment-modal';

const montserratFont = Montserrat({
  subsets: ['latin'],
  weight: 'variable',
  fallback: ['sans-serif'],
});
const quicksandFont = Quicksand({
  subsets: ['latin'],
  weight: 'variable',
  fallback: ['sans-serif'],
});
const syneFont = Syne({
  subsets: ['latin'],
  weight: 'variable',
  fallback: ['sans-serif'],
});

interface Props {
  id: string;
}

export const InfoCase = ({ id }: Props) => {
  const { data } = useQuery(['get-car-info', id], async () => {
    const carData = await apiProvider.car.get(id);
    return { carData };
  });

  return (
    <div className="w-1/2 py-5 pr-5 h-fit">
      <div className="p-5 bg-gray-300 h-full w-full rounded-xl ">
        <div className="flex items-start gap-2">
          <h2 className={syneFont.className + ' text-xl font-extrabold'}>
            {data?.carData.name || 'Name'}
          </h2>
          {data?.carData.available ? (
            <Chip
              label="Available"
              size="small"
              color="success"
              className="text-sm font-bold"
            />
          ) : (
            <Chip
              label="Out of stock"
              size="small"
              color="error"
              className="text-sm font-bold"
            />
          )}
        </div>
        <div className="py-5 flex flex-col gap-2">
          <Line label="Model" value={data?.carData.model} />
          {data?.carData.brandId && <BrandLine id={data?.carData.brandId} />}
          <Line label="Power" value={data?.carData.power} />
          <Line label="Engine" value={data?.carData.engineType.toLowerCase()} />
          <Line label="Seats" value={data?.carData.placeNumber} />
          {data?.carData.typeId && <TypeLine typeId={data?.carData.typeId} />}
        </div>
        <div className="mt-3">
          <p
            className={
              quicksandFont.className +
              ' text-semibold text-lg max-h-96 overflow-y-auto'
            }
            dangerouslySetInnerHTML={{
              __html: data?.carData.description || '',
            }}
          ></p>
        </div>
        <div className="mt-4">
          <AppointmentModal carId={data?.carData.id as string}>
            <Button
              variant="contained"
              color="inherit"
              className="text-white shadow-none border-gray-500"
            >
              <span
                className={quicksandFont.className + ' text-black text-bold'}
              >
                Buy for{' '}
                {(data?.carData.price.toLocaleString() || 0).toLocaleString()}{' '}
                Ar
              </span>
            </Button>
          </AppointmentModal>
        </div>
      </div>
    </div>
  );
};

const BrandLine = ({ id }: { id: string }) => {
  const { data } = useQuery(['get-brand', id], () => apiProvider.brand.get(id));
  return <Line label="Brand" value={data?.name} />;
};

const TypeLine = ({ typeId: id }: { typeId: string }) => {
  const { data } = useQuery(['get-car-type', id], () =>
    apiProvider.carType.get(id),
  );
  return <Line label="Type" value={data?.name} />;
};

const Line = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => {
  return (
    <tr>
      <td className={montserratFont.className + ' font-extrabold text-xl'}>
        {label}
      </td>
      <td className={quicksandFont + ' font-semibold text-lg'}>
        {value || 'unknown'}
      </td>
    </tr>
  );
};
