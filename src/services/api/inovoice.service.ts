import API from './handlers/base.service';
import { TeamMember } from '@/interfaces/User';
import { AxiosResponse } from 'axios';
const InvoicesAPI = {
    invoicesList(params?: Record<string, any>) {
        // return API.get('api/invoice/', params);
        return Promise.resolve([
            {
                quantity: "10.00",
                name: "Web App",
                unitPrice: "20.00",
                amount: "20.00",
            },
            {
                quantity: "10.00",
                name: "Web Development",
                unitPrice: "40.00",
                amount: "200.00",
            },
            {
                quantity: "10.00",
                name: "Web Page Design",
                unitPrice: "50.00",
                amount: "500.00",
            },
        ])
    },
    async save(data:any) {
        const response = await API.post(`/invoice/`, data);
        return response.data;
    },
    async update(id: string | number, data: TeamMember): Promise<TeamMember> {
        const response = await API.put(`/invoice/${id}`, data);
        return response.data;
    },
    async delete(id: number): Promise<boolean> {
        return API.delete(`/invoice/${id}`).then((response: AxiosResponse) => response.data);
    },
};

export default InvoicesAPI;
