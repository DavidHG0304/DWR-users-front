type HttpClientVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

class HttpClient {
    private url: string;
    constructor() {
        this.url = 'http://localhost:3000/api';
    }
    
    private getOptions(verb: HttpClientVerb, body?: unknown): RequestInit {
        const options: RequestInit = {
            method: verb,
            headers: {
                'Accept': 'application/json',
            },
        };

        // Solo agregar Content-Type y body para métodos que lo necesiten
        if (body && verb !== 'GET') {
            (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        return options;
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }

    async get(path: string) {
        const response = await fetch(`${this.url}/${path}`, this.getOptions('GET'));
        return this.handleResponse(response);
    }
    
    async post(path: string, body: unknown) {
        const response = await fetch(`${this.url}/${path}`, this.getOptions('POST', body));
        return this.handleResponse(response);
    }
    
    async put(path: string, body: unknown) {
        const response = await fetch(`${this.url}/${path}`, this.getOptions('PUT', body));
        return this.handleResponse(response);
    }
    
    async patch(path: string, body: unknown) {
        const response = await fetch(`${this.url}/${path}`, this.getOptions('PATCH', body));
        return this.handleResponse(response);
    }
    
    async delete(path: string) {
        const response = await fetch(`${this.url}/${path}`, this.getOptions('DELETE'));
        return this.handleResponse(response);
    }
};

export default HttpClient;