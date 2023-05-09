export class WorkQueue {
    readonly id: string;
    readonly user_id: string;
    readonly work_id: string;
    readonly work_type: string;
    readonly status: string;
    readonly created_at: Date;
    readonly updated_at: Date;

    constructor(id: string, userId: string, workId: string, workType: string, status: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.user_id = userId;
        this.work_id = workId;
        this.work_type = workType;
        this.status = status;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
    }

    static fromSqlRow(sqlRow: WorkQueue): WorkQueue {
        return new WorkQueue(sqlRow.id, sqlRow.user_id, sqlRow.work_id, sqlRow.work_type, sqlRow.status, sqlRow.created_at, sqlRow.updated_at);
    }
}