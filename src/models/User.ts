export class User {
    readonly id: string;
    username: string;
    password: string;
    role_id: string;

    constructor(id: string, username: string, password: string, roleId: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role_id = roleId;
    }

    static fromSqlRow(sqlRow: User): User {
        return new User(sqlRow.id, sqlRow.username, sqlRow.password, sqlRow.role_id);
    }
}
