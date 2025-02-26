import {APIRequestContext, APIResponse} from '@playwright/test';
import {RequestOptions} from "../types/request-options";

export class PlaywrightApiClient {
    private readonly apiRequestContext: APIRequestContext
    private readonly headers: Map<string, string> = new Map();

    constructor(apiRequestContext: APIRequestContext) {
        this.apiRequestContext = apiRequestContext;
    }

    public async sendRequest(method: string, endpoint: string, options: RequestOptions | null = null): Promise<APIResponse> {
        console.debug(`Sending request to endpoint: ${endpoint}`);
        this.setRequestHeaders(options);

        switch (method.toUpperCase()) {
            case 'GET':
                return this.apiRequestContext.get(endpoint, {
                    ...options,
                })
            case 'POST':
                return this.apiRequestContext.post(endpoint, options || {});
            case 'PUT':
                return this.apiRequestContext.put(endpoint, options || {});
            case 'PATCH':
                return this.apiRequestContext.patch(endpoint, options || {});
            case 'DELETE':
                return this.apiRequestContext.delete(endpoint, options || {});
            default:
                throw new Error(`Invalid HTTP method: ${method}`);
        }
    }

    public addDefaultHeader(key: string, value: string): void {
        this.headers.set(key, value);
    }

    public getHeaders(): Map<string, string> {
        return this.headers;
    }

    private setRequestHeaders(options: RequestOptions | null): void {
        if (!options) return;
        for (const [key, value] of this.headers.entries()) {
            if (!options.headers) {
                options.headers = {};
            }
            options.headers[key] = value;
        }
    }
}