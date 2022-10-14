import API from './handlers/base.service';
import {Role} from '@/interfaces/Client';
import {AxiosResponse} from 'axios';

const PERMISSIONS_DEFAULT_PATH = '/api/permission';

const PermissionsAPI = {
  list(params?: Record<string, any>) {
    return API.get(PERMISSIONS_DEFAULT_PATH, {params});
  },
  async update(id: string | number, data: any) {
    const response = await API.put(`${PERMISSIONS_DEFAULT_PATH}/${id}`, data);
    return response.data;
  },
  async save(payload: Role): Promise<Role> {
    return API.post(`${PERMISSIONS_DEFAULT_PATH}`, payload).then((response: AxiosResponse) => response.data);
  },
  async delete(id: number): Promise<boolean> {
    return API.delete(`${PERMISSIONS_DEFAULT_PATH}/${id}`).then((response: AxiosResponse) => response.data);
  },
};

export default PermissionsAPI;
