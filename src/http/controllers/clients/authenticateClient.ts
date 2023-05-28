import { AuthenticateUseCase } from "@/modules/clients/useCases/authenticate/authenticateUseCase";
import { Request, Response } from "express";

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateClientUseCase = new AuthenticateUseCase();

    const { token } = await authenticateClientUseCase.execute(
      username,
      password
    );

    return response.status(200).json(token);
  }
}
