import { CreateDeliveryUseCase } from "@/modules/deliveries/useCases/createDelivery";
import { Request, Response, response } from "express";

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { item_name } = request.body
    const { client_id } = request


    const createDelivery = new CreateDeliveryUseCase()
    const delivery = await createDelivery.execute({item_name, client_id})

    console.log(delivery)

    return response.json(delivery)
  }
}