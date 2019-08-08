export default class Fetch {
    static headers: HeadersInit;
    static credentials: RequestCredentials;
    static debug: boolean;
    static get(url: string, params?: Object): Promise<any>;
    static post(url: string, body?: any): Promise<any>;
    static put(url: string, body?: Object): Promise<any>;
    static delete(url: string, body?: Object): Promise<any>;
    static fetch(url: string, options: RequestInit): Promise<any>;
}
