export interface AuthState {
    token: string | null;
    user: any;
    company: Record<string, any> | null;
    uploading: boolean;
    selectedUserBranches: number[];
    userAllowedBranches: Array<{ text: string; value: number }>;
}
