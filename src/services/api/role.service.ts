import API from './handlers/base.service';
import {Role} from '@/interfaces/Client';
import {AxiosResponse} from 'axios';

const ROLE_DEFAULT_PATH = 'api/role/'

const RoleAPI = {
    roleList(params?: Record<string, any>) {
        return API.get(ROLE_DEFAULT_PATH, {params});
    },
    async update(id: string | number, data: any) {
        const response = await API.put(`${ROLE_DEFAULT_PATH}${id}`, data);
        return response.data;
    },
    async save(payload: Role): Promise<Role> {
        return API.post(`${ROLE_DEFAULT_PATH}`, payload).then((response: AxiosResponse) => response.data);
    },
    async delete(id: number): Promise<boolean> {
        return API.delete(`api/client/delete/${id}`).then((response: AxiosResponse) => response.data);
    },
};

export default RoleAPI;
