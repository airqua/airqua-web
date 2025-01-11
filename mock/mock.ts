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
    },
    {
        url: makeUrl('/auth/sessions'),
        method: 'get',
        response: makeGenericOk( [
            {
                "id": "ahaSnMOd",
                "created_at": "2025-01-09T13:10:29.000Z",
                "valid_until": "2025-01-23T13:10:29.000Z"
            }
        ])
    },
    {
        url: makeUrl('/auth/token'),
        method: 'get',
        response: makeGenericOk( {
            token: 'qwertyqwertyqwertyqwertyqwertyqwertyqwerty'
        })
    },
    {
        url: makeUrl('/sensors'),
        method: 'get',
        response: makeGenericOk([
            {
                "own": false,
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "coordinates": {
                    "lat": 51.45641,
                    "lng": -2.594192
                },
                "address": {
                    "street": "1 Main Street",
                    "city": "Bristol"
                },
                "active": true,
                "last_reading": {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "values": [
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "metric": {
                                "id": "co2",
                                "name": "Carbon dioxide",
                                "description": "It is one of three main greenhouse gases in the atmosphere of Earth",
                                "max": 10,
                                "unit": "ppm"
                            },
                            "value": 5
                        }
                    ],
                    "created_at": "2025-01-09T13:22:29.645Z"
                }
            },
            {
                "own": false,
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "coordinates": {
                    "lat": 51.47641,
                    "lng": -2.594192
                },
                "address": {
                    "street": "3 Main Street",
                    "city": "Bristol"
                },
                "active": false,
                "last_reading": {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "values": [
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "metric": {
                                "id": "co2",
                                "name": "Carbon dioxide",
                                "description": "It is one of three main greenhouse gases in the atmosphere of Earth",
                                "max": 10,
                                "unit": "ppm"
                            },
                            "value": 5
                        }
                    ],
                    "created_at": "2025-01-09T13:22:29.645Z"
                }
            },
            {
                "own": true,
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                "coordinates": {
                    "lat": 51.46661,
                    "lng": -2.594192
                },
                "address": {
                    "street": "2 Main Street",
                    "city": "Bristol"
                },
                "active": true,
                "last_reading": {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                    "values": [
                        {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                            "metric": {
                                "id": "co2",
                                "name": "Carbon dioxide",
                                "description": "It is one of three main greenhouse gases in the atmosphere of Earth",
                                "max": 10,
                                "unit": "ppm"
                            },
                            "value": 15
                        }
                    ],
                    "created_at": "2025-01-09T13:22:29.645Z"
                },
                "visible": true,
                "approved": true
            }
        ])
    },
    {
        url: makeUrl('/sensors/:sensorId/readings'),
        method: 'get',
        response: makeGenericOk([
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa3",
                "values": [
                    {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "metric": {
                            "id": "co2",
                            "name": "Carbon dioxide",
                            "description": "It is one of three main greenhouse gases in the atmosphere of Earth",
                            "max": 10,
                            "unit": "ppm"
                        },
                        "value": 100
                    }
                ],
                "created_at": "2025-01-09T14:21:02.611Z"
            },
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "values": [
                    {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "metric": {
                            "id": "co2",
                            "name": "Carbon dioxide",
                            "description": "It is one of three main greenhouse gases in the atmosphere of Earth",
                            "max": 10,
                            "unit": "ppm"
                        },
                        "value": 100
                    }
                ],
                "created_at": "2025-01-09T14:21:02.611Z"
            }
        ])
    }
] as MockMethod[];