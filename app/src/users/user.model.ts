export interface User {
    admin_id: number;
    email: string;
    password: string;
    salt: string;
    name: string;
    is_god: number;
    fail_count: number;
    is_possible: number;
    refresh_token: string;
}