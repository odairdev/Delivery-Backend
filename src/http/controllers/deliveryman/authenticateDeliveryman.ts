import { AuthenticateDeliveryman } from "@/modules/deliveryman/authenticateDeliveryman/authenticateDeliveryman";
import { Request, Response } from "express";

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateDeliverymanUseCase = new AuthenticateDeliveryman();

    const { token } = await authenticateDeliverymanUseCase.execute(
      username,
      password
    );

    return response.status(200).json(token);
  }
}
