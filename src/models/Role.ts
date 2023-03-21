export class Role {
    readonly id: string;
    role_type: string;

    constructor(id: string, role_type: string) {
        this.id = id;
        this.role_type = role_type;
    }

    static fromSqlRow(sqlRow: Role): Role {
        return new Role(sqlRow.id.toString(), sqlRow.role_type);
    }
}
