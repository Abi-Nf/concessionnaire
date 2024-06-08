'use client';
import { BrandData } from '@/src/provider/api/brand';
import { Syne } from 'next/font/google';
import { useQuery } from 'react-query';
import { apiProvider } from '@/src/provider/api-provider';

const fontStyle = Syne({
  subsets: ['latin'],
  weight: 'variable',
});

interface Props {
  onSelect(value: BrandData): void;
}

export const BrandList = ({ onSelect }: Props) => {
  const { data } = useQuery({
    queryKey: ['list-of-brands'],
    queryFn: () => apiProvider.brand.all(),
  });

  return (
    <div className="flex items-center gap-4 max-w-[60%] overflow-x-auto display-none-scrollbar">
      {data?.map((v) => (
        <div
          key={v.id}
          onClick={() => onSelect(v)}
          className="py-1 px-3 flex flex-col gap-1 items-center justify-center hover:scale-110"
        >
          <img
            alt="logo"
            src={v.logoUrl as string}
            draggable={false}
            className="h-[3rem] object-fit"
          />
          <span
            className={
              fontStyle.className + ' text-[1rem] font-extrabold text-center'
            }
          >
            {v.name}
          </span>
        </div>
      ))}
    </div>
  );
};
