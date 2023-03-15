type RequestSession = {
    user: {
        username: string;
        id: string;
        token?: string;
    };
};

declare namespace Express {
    export interface Request {
        session?: RequestSession | null;
    }
}
