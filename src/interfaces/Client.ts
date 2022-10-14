export interface Client {
    clientId: number;
    clientName: string;
    email: string;
    address: string;
  }
  export interface Project {
    projectId: number;
    projectName: string;
    client: string;
    amount: number;
  }
  export interface Role {
    roleId: number;
    title: string;
  }