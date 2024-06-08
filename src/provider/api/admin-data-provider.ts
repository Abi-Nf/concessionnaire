import { AxiosRequestConfig } from 'axios';
import { DataProvider } from 'react-admin';
import { BaseApi } from './baseApi';

const authorizationHeader = (): AxiosRequestConfig['headers'] => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const dataProvider: DataProvider = {
  // get a list of records based on sort, filter, and pagination
  getList: async (resource, params) => {
    const baseApi = new BaseApi(resource, authorizationHeader());
    const allResource: any[] = await baseApi.all();
    return {
      data: allResource,
      total: allResource.length,
    };
  },
  // get a single record by id
  getOne: async (resource, params) => {
    const baseApi = new BaseApi(
      resource === 'car-image' ? 'car-image/object' : resource,
      authorizationHeader(),
    );
    const oneResource: any = await baseApi.get(params.id);
    return {
      data: oneResource,
    };
  },
  // get a list of records based on an array of ids
  getMany: async (resource, params) => {
    const baseApi = new BaseApi(resource, authorizationHeader());
    const manyResource: any = await baseApi.getManyById(params.ids);
    return {
      data: manyResource,
    };
  },
  // get the records referenced to another record, e.g. comments for a post
  getManyReference: (resource, params) => {
    console.log('Resource: ', resource);
    console.log('Target: ', params.target);
    console.log('Target id: ', params.id);
    return Promise.resolve({ data: [] });
  },
  // create a record
  create: async (resource, params) => {
    const baseApi = new BaseApi(resource, authorizationHeader());
    const createResource: any = await baseApi.create(params.data);
    return {
      data: createResource,
    };
  },
  // update a record based on a patch
  update: async (resource, params) => {
    const baseApi = new BaseApi(resource, authorizationHeader());
    const updateResource: any = await baseApi.update(params.id, {
      ...params.previousData,
      ...params.data,
    });

    return {
      data: updateResource,
    };
  },
  // update a list of records based on an array of ids and a common patch
  updateMany: (resource, params) => Promise.resolve({ data: [] }),
  // delete a record by id
  delete: async (resource, params) => {
    const baseApi = new BaseApi(resource, authorizationHeader());
    const deleteResource: any = await baseApi.delete(params.id);

    return {
      data: deleteResource,
    };
  },
  // delete a list of records based on an array of ids
  deleteMany: async (resource, params) => {
    const baseApi = new BaseApi(resource, authorizationHeader());
    const deleteManyResource: any = await baseApi.deleteManyById(params.ids);
    return {
      data: deleteManyResource,
    };
  },
};
