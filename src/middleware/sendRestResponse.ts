import { Response } from 'express';

export type RestResponse<T> = {
    status: number;
    message?: string;
    data: T;
    links?: {
        self: string;
        related?: Record<string, string>;
    };
};

type SendRestResponseOptions<T> = {
    res: Response;
    data: T;
    status?: number;
    message?: string;
};

export function sendRestResponse<T>({ res, data, status = 200, message }: SendRestResponseOptions<T>) {
    const response: RestResponse<T> = {
        data,
        message,
        status,
        links: {
            self: res.req.originalUrl,
        },
    };

    res.status(status).json(response);
}
