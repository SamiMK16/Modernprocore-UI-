/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import API from './handlers/base.service';
import { AxiosResponse } from 'axios';
import {TimeTracking} from "@/interfaces/TimeTracking";
const TimeTrackingAPI = {
  getList(params?: Record<string, any>) {
    return API.get('api/tracker/get', params);
  },

  async save(data: TimeTracking): Promise<TimeTracking> {
    const response = await API.post(`api/tracker/add`, data);
    return response.data;
  },
  async update(id: string | number, data: TimeTracking): Promise<TimeTracking> {
    const response = await API.put(`api/tracker/update/${id}`, data);
    return response.data;
  },
    async delete(id: number): Promise<boolean> {
    return API.delete(`api/tracker/delete/${id}`).then((response: AxiosResponse) => response.data);
  },
};

export default TimeTrackingAPI;
