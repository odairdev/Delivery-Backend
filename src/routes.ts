import { Router } from "express";
import { CreateClientController } from "./http/controllers/clients/createClient";
import { AuthenticateClientController } from "./http/controllers/clients/authenticateClient";
import { CreateDeliveryman } from "./http/controllers/deliveryman/createDeliveryman";
import { AuthenticateDeliverymanController } from "./http/controllers/deliveryman/authenticateDeliveryman";
import { CreateDeliveryController } from "./http/controllers/deliveries/createDelivery";
import { ensureAuthenticatedClient } from "./http/middlewares/ensureAuthenticatedClient";

const routes = Router()

const createClientController = new CreateClientController()
const authenticateController = new AuthenticateClientController()

const createDeliverymanController = new CreateDeliveryman()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const createDeliveryController = new CreateDeliveryController()

routes.post('/client', createClientController.handle)
routes.post('/client/authenticate', authenticateController.handle)

routes.post('/deliveryman', createDeliverymanController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)

routes.post('/delivery', ensureAuthenticatedClient, createDeliveryController.handle)

export { routes }