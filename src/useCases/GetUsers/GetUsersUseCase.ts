import { LocalStorage } from "node-localstorage";

export class GetUsersUseCase
{
    private localStorage = new LocalStorage('./scratch');
    private USERS_LIST_KEY = 'usersList';

    async execute()
    {
        let usersList = [];
        let usersListStringfy = await this.localStorage.getItem(this.USERS_LIST_KEY);

        if(usersListStringfy !== '' && usersListStringfy !== null)
            usersList = JSON.parse(usersListStringfy);
        else usersList = [];

        return usersList;
    }
}