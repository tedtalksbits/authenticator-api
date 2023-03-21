type RequestSession = {
    user: {
        username: string;
        id: string;
        token?: string;
        roleId?: string;
    };
};

declare namespace Express {
    export interface Request {
        session?: RequestSession | null;
    }
}
