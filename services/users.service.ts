import { PrismaClient, User } from "@prisma/client";
import { Service } from "./service";
import { hashPassword } from "../utils/secret"

export class UserService extends Service {

    constructor(repository: PrismaClient) {
        super(repository);
    }

    public async create(user : User): Promise<User> {

        user.password = await hashPassword(user.password);

        return await this.repository.user.create({
            data : user
        });
        
    }

}