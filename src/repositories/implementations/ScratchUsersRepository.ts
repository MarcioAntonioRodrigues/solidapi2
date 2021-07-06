import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { LocalStorage } from "node-localstorage";

export class ScratchUsersRepository implements IUsersRepository
{
    private users: User[] = [];
    private localStorage = new LocalStorage('./scratch');
    private USERS_LIST_KEY = 'usersList';

    async findByEmail(email: string): Promise<User>
    {
        this.users = this.getUsersList();
        return this.users.find(usr => usr.email == email);
    }

    async save(user: any): Promise<void>
    {
        const exists = await this.findByEmail(user.email);

        if(exists)
        {
            throw new Error('User already exists.');
        }
        
        let userListToSave = this.getUsersList();
        userListToSave.push(user);
        this.localStorage.setItem(this.USERS_LIST_KEY, JSON.stringify(userListToSave));
    }

    getUsersList(): User[]
    {
        let usersList = [];
        let usersListStringfy = this.localStorage.getItem(this.USERS_LIST_KEY);

        if(usersListStringfy !== '' && usersListStringfy !== null)
            usersList = JSON.parse(usersListStringfy);
        else usersList = [];

        return usersList;
    }  
}
