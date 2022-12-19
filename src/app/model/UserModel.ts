export class UserModel {
    constructor( private name: string, private code: number) {
        this.name = name;
        this.code = code;
    }

    public getCode() {
        return this.code;
    }

    public getName() {
        return this.name;
    }
}