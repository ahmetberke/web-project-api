import { PrismaClient, User } from "@prisma/client";
import { Service } from "./service";
import { hashPassword } from "../utils/secret"
import { UserValidator } from "../validations/user.validator";

export class UserService extends Service {

    constructor(repository: PrismaClient) {
        super(repository);
    }

    public async create(user : User): Promise<User> {

        const validator = new UserValidator(user);
        validator.validate();

        user.password = await hashPassword(user.password);

        return await this.repository.user.create({
            data : user
        });

    }

}