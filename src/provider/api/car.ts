import { BaseApi } from '@/src/provider/api/baseApi';
import { apiClient } from '@/src/provider/client';

export type EngineType = 'DIESEL' | 'HYBRID' | 'ELECTRIC' | 'GASOLINE';

export interface CarData {
  id: string;
  model: string;
  name: string;
  description: string;
  price: number;
  engineType: EngineType;
  placeNumber: number;
  color: string;
  power: number;
  available: boolean;
  fav: boolean;
  typeId: string;
  brandId: string;
}

export type CarCreatePayload = Omit<CarData, 'id'>;

interface ParamSearch {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  motor?: string;
  type?: string;
  brand?: string;
}

export class Car extends BaseApi<CarData['id'], CarData, CarCreatePayload> {
  constructor() {
    super('car');
  }

  async getFavorites(): Promise<CarData[]> {
    return (await apiClient.get(this.resource_name + '/fav')).data;
  }

  async search(params: ParamSearch): Promise<CarData[]> {
    const queries = new URLSearchParams(params as Record<string, string>);
    return (
      await apiClient.get(this.resource_name + '/search?' + queries.toString())
    ).data;
  }
}

export interface CarImagePayload {
  image: File;
}

export interface CarImageData {
  id: string;
  imageUrl: string;
  carId: string;
}

export interface CarUpdatePayload {
  imageUrl: string;
  carId: string;
}

export class CarImage extends BaseApi<
  CarImageData['id'],
  CarImageData,
  CarImagePayload,
  CarUpdatePayload
> {
  constructor() {
    super('car-image');
  }

  /**
   * @deprecated use createImage() instead
   * @param data
   */
  async create(data: CarImagePayload): Promise<CarImageData> {
    throw new Error('cannot use this method, use createImage() instead');
  }

  async createImage(
    carId: CarImageData['id'],
    data: CarImagePayload,
  ): Promise<CarImageData> {
    const response = await apiClient.post(
      this.resource_name + '/' + carId,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  }

  async get(id: CarImageData['id']): Promise<CarImageData> {
    throw new Error('not implemented');
  }

  async getCarImagesUrl(carId: CarData['id']): Promise<CarImageData[]> {
    return (await apiClient.get(this.resource_name + '/' + carId)).data;
  }
}

export interface CarTypeData {
  id: string;
  name: string;
  description: string;
}

export type CarTypeCreateDto = Omit<CarTypeData, 'id'>;

export class CarType extends BaseApi<
  CarTypeData['id'],
  CarTypeData,
  CarTypeCreateDto
> {
  constructor() {
    super('car-type');
  }
}
