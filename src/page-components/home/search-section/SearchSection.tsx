'use client';
import { useQuery } from 'react-query';
import { Poppins } from 'next/font/google';
import { SearchBar } from './SearchBar';
import { BrandList } from './BrandList';
import { useSearch } from '@/src/hooks/useSearch';
import { apiProvider } from '@/src/provider/api-provider';
import { CardCar } from '@/src/components/card-car';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  fallback: ['sans-serif'],
});

export const SearchSection = () => {
  const { data } = useQuery({
    queryKey: ['get-6-cars-sample'],
    queryFn: () => apiProvider.car.all().then((v) => v.slice(0, 8)),
  });
  const search = useSearch(data);
  return (
    <div>
      <div className="h-0 w-full flex items-center justify-center">
        <SearchBar hook={search} />
      </div>
      <div className="flex flex-col items-center gap-4 justify-center mt-16">
        <h2 className={poppins.className + ' text-2xl font-extrabold'}>
          Our brands associated
        </h2>
        <BrandList onSelect={search.handleSelectBrand} />
      </div>
      {search.result.length > 0 ? (
        <div className="grid grid-cols-4 py-5 px-8 gap-4">
          {search.result.map((v, i) => (
            <CardCar key={i} car={v} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[15rem] flex items-center justify-center text-center">
          <span className="font-bold text-lg">No content to show !</span>
        </div>
      )}
    </div>
  );
};
