import { CreateDeliveryManUseCase } from "@/modules/deliveryman/createDeliveryman/createDeliverymanUseCase";
import { Request, Response } from "express";

export class CreateDeliveryman {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const createDeliverymanUseCase = new CreateDeliveryManUseCase()

    const delvieryman = await createDeliverymanUseCase.execute({ username, password})

    return response.status(201).json(delvieryman)
  }
}