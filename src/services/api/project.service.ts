import API from './handlers/base.service';
import { Project } from '@/interfaces/Client';
import { AxiosResponse } from 'axios';
const ProjectAPI = {
    projectList(params?: Record<string, any>){
    return API.get('api/project/get', params);
    // return Promise.resolve([
    //   {   webId: 10,
    //     name: 'Test Client',
    //     email: 'test@client.com',
    //     address: 'test Address'
    //   },
    //   {
    //     webId: 11,
    //     name: 'Admin Client',
    //     email: 'admin@client.com',
    //     address: 'Admin Address'
    //   },
    // ])
  },
  async update(id: string | number, data: Project): Promise<Project> {
    const response = await API.put(`api/project/update/${id}`, data);
    return response.data;
  },
    async save(payload: Project): Promise<Project> {
    return API.post(`/api/project/add`,payload).then((response: AxiosResponse) => response.data);
  },
    async delete(id: number): Promise<boolean> {
    return API.delete(`/api/project/delete/${id}`).then((response: AxiosResponse) => response.data);
  },
};

export default ProjectAPI;
