import { prisma } from "@/database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthenticateDeliveryman {
  async execute(username: string, password: string) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if(!deliveryman) {
      throw new Error("Invalid username or password")
    }

    const doesPasswordMatch = await compare(password, deliveryman.password)

    if(!doesPasswordMatch) {
      throw new Error("Invalid username or password")
    }

    const token = sign({username}, process.env.JWT_SECRET, {
      subject: deliveryman.id,
      expiresIn: "1d"
    })

    return {
      token
    }
  }
}