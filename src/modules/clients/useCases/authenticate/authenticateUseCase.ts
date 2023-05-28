import { prisma } from "@/database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import "dotenv/config"

export class AuthenticateUseCase {
  async execute(username: string, password: string) {
    const clientExists = await prisma.client.findUnique({
      where: {
        username
      }
    })

    if(!clientExists) {
      throw new Error('Invalid username or password.')
    }

    const doesPasswordMatch = await compare(password, clientExists.password)

    if(!doesPasswordMatch) {
      throw new Error('Invalid username or password.')
    }

    const token = sign({ username }, process.env.JWT_SECRET, {
      subject: clientExists.id,
      expiresIn: "1d"
    })

    return {
      token
    }
  }
}