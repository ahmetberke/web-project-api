import { PrismaClient, User } from "@prisma/client";
import { Service } from "./service";
import { hashPassword } from "../utils/secret"
import { UserValidator } from "../validations/user.validator";
import { USER_NOT_FOUND_ERROR } from "../errors/user.error";

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

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            throw USER_NOT_FOUND_ERROR
        }
        return user;
    }

    public async findByUsername(username: string): Promise<User | null> {
        const user = await this.repository.user.findUnique({
            where: {
                username
            }
        });
        if (!user) {
            throw USER_NOT_FOUND_ERROR
        }
        return user;
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.repository.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            throw USER_NOT_FOUND_ERROR
        }
        return user;
    }

}