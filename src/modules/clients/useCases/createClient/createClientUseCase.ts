import { prisma } from "@/database/prismaClient";
import { hash } from "bcryptjs";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    const clientExists = await prisma.client.findFirst({
      where: {
        username,
      },
    });

    if (clientExists) {
      throw new Error("Client already exists.");
    }

    const password_hash = await hash(password, 6);

    const client = await prisma.client.create({
      data: {
        username,
        password: password_hash,
      },
    });

    // @ts-ignore
    delete client.password;

    return client;
  }
}
