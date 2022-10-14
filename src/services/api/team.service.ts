import API from './handlers/base.service';
import {TeamMember} from '@/interfaces/User';
import {AxiosPromise, AxiosResponse} from 'axios';
import {PageModel} from "@/interfaces/pages";

const TEAM_DEFAULT_PATH = 'api/team/'
const TeamAPI = {
        usersList(): AxiosPromise<PageModel<any>> {
        return API.get(TEAM_DEFAULT_PATH);
    },
    async save(data: TeamMember): Promise<TeamMember> {
        const response = await API.post(TEAM_DEFAULT_PATH, data);
        return response.data;
    },
    async update(id: string | number, data: TeamMember): Promise<TeamMember> {
        const response = await API.put(`${TEAM_DEFAULT_PATH}${id}`, data);
        return response.data;
    },
    async delete(id: number): Promise<boolean> {
        return API.delete(`${TEAM_DEFAULT_PATH}${id}`).then((response: AxiosResponse) => response.data);
    },
};

export default TeamAPI;
