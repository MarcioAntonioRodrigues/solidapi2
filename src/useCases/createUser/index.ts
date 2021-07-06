import { Environments } from "../../../Environments";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { RabbitMQConsumerProvider } from "../../providers/implementations/RabbitMQConsumerProvider";
import { RabbitMQProvider } from "../../providers/implementations/RabbitMQProvider";

const conn: Environments = new Environments()
const mailtrapMailProvider = new MailtrapMailProvider()
const rabbitMQProvider = new RabbitMQProvider();
const rabbitMQConsumerProvider = new RabbitMQConsumerProvider(conn.prd, rabbitMQProvider)

const createUserUseCase = new CreateUserUseCase(
    mailtrapMailProvider,
    rabbitMQConsumerProvider,
    rabbitMQProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }
