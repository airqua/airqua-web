import {MockMethod} from "vite-plugin-mock";

const makeUrl = (route: string) => `/api${route}`;
const makeGenericOk = (payload?: any) => ({ status: 'Ok', payload });

export default [
    {
        url: makeUrl('/auth'),
        method: 'get',
        response: makeGenericOk({
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "created_at": "2025-01-08T19:21:01.022Z",
            "verified": true
        }),
    }
] as MockMethod[];