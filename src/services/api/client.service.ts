import API from './handlers/base.service';
import {Client} from '@/interfaces/Client';
import {AxiosResponse} from 'axios';

const ClientAPI = {
  clientList(params?: Record<string, any>) {
    return API.get('api/client/get', {params});
  },
  async update(id: string | number, data: Client): Promise<Client> {
    const response = await API.put(`api/client/update/${id}`, data);
    return response.data;
  },
  async save(payload: Client): Promise<Client> {
    return API.post(`api/client/add`, payload).then((response: AxiosResponse) => response.data);
  },
  async delete(id: number): Promise<boolean> {
    return API.delete(`api/client/delete/${id}`).then((response: AxiosResponse) => response.data);
  },
};

export default ClientAPI;
