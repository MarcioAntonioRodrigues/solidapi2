import { Response } from "express";
import { GetUsersUseCase } from "./GetUsersUseCase";

export class GetUsersController
{
    constructor(private getUsersUseCase: GetUsersUseCase)
    {

    }

    async handle(response: Response): Promise<Response>
    {
        try
        {
            let users = await this.getUsersUseCase.execute();

            return response.status(201).json({
                users
            });
        }
        catch (err)
        {
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }
}