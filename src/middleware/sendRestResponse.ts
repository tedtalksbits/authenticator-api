import { Response } from 'express';

type RestResponse<T> = {
    status: number;
    message: string;
    data: T;
    links?: {
        self: string;
        related?: Record<string, string>;
    };
};

export function sendRestResponse<T>({ res, data, status = 200 }: { res: Response; data: T; status?: number }) {
    const response: RestResponse<T> = {
        data,
        message: 'OK',
        status,
        links: {
            self: res.req.originalUrl,
        },
    };

    res.status(status).json(response);
}
