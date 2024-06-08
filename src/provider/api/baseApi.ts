import { apiClient } from '@/src/provider/client';
import { AxiosRequestConfig } from 'axios';

type UsableId = string | number;

export class BaseApi<
  Id extends UsableId,
  Data,
  Create = unknown,
  Update = Partial<Create>,
> {
  constructor(
    protected readonly resource_name: string,
    private readonly headers?: AxiosRequestConfig['headers'],
  ) {
    this.resource_name = '/' + resource_name;
  }

  async create(data: Create): Promise<Data> {
    return (
      await apiClient.post(this.resource_name, data, {
        headers: this.headers,
      })
    ).data;
  }

  async all(): Promise<Data[]> {
    return (
      await apiClient.get(this.resource_name, {
        headers: this.headers,
      })
    ).data;
  }

  async get(id: Id): Promise<Data> {
    return (
      await apiClient.get(this.resource_name + '/' + id, {
        headers: this.headers,
      })
    ).data;
  }

  async patch(id: Id, data: Update) {
    return (
      await apiClient.patch(this.resource_name + '/' + id, data, {
        headers: this.headers,
      })
    ).data;
  }

  async update(id: Id, data: Update): Promise<Data> {
    return (
      await apiClient.patch(this.resource_name + '/' + id, data, {
        headers: this.headers,
      })
    ).data;
  }

  async delete(id: Id): Promise<Data> {
    return (
      await apiClient.delete(this.resource_name + '/' + id, {
        headers: this.headers,
      })
    ).data;
  }

  async getManyById(ids: Id[]): Promise<Data[]> {
    return (
      await apiClient.get(this.resource_name + '/ids', {
        headers: this.headers,
        params: {
          ids,
        },
      })
    ).data;
  }

  async deleteManyById(ids: Id[]): Promise<Data[]> {
    return (
      await apiClient.delete(this.resource_name + '/ids', {
        headers: this.headers,
        params: {
          ids,
        },
      })
    ).data;
  }
}
