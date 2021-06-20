import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController
{
    constructor(private createUserUseCase: CreateUserUseCase)
    {

    }

    async handle(): Promise<void>
    {
        try
        {
            await this.createUserUseCase.execute();
        }
        catch (err)
        {
            return err.message;
        }
    }
}