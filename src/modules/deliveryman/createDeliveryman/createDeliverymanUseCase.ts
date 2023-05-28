import { prisma } from "@/database/prismaClient";
import { hash } from "bcryptjs";

interface ICreateDeliveryManRequest {
  username: string,
  password: string
}

export class CreateDeliveryManUseCase {

  async execute({username, password}: ICreateDeliveryManRequest) {
    const deliverymanAlreadyExists = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if(deliverymanAlreadyExists) {
      throw new Error("Username already in use.")
    }

    const password_hash = await hash(password, 6)

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: password_hash
      }
    })

    //@ts-ignore
    delete deliveryman.password

    return deliveryman
  }
}