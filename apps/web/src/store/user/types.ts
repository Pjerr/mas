import { Role } from 'shared';

export interface User {
    id: string;
    role: Role;
}

export interface UserState {
    user: User | null;
}

export interface SetUserAction {
    user: User;
}

export interface SetUserRole {
    role: Role;
}
