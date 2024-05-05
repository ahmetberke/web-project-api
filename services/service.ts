import { PrismaClient } from "@prisma/client";

export class Service {

    protected repository: PrismaClient;
    constructor(repository: PrismaClient) {
        this.repository = repository;
    }

}