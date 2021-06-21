import { Environments } from "../../../Environments";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { RabbitMQConsumerProvider } from "../../providers/implementations/RabbitMQConsumerProvider";

const conn: Environments = new Environments()
const mailtrapMailProvider = new MailtrapMailProvider()
const rabbitMQConsumerProvider = new RabbitMQConsumerProvider(conn.prd)

const createUserUseCase = new CreateUserUseCase(
    mailtrapMailProvider,
    rabbitMQConsumerProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }
