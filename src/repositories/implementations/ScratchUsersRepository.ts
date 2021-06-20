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
        return this.users.find(usr => usr.email == email);
    }

    async save(user: User): Promise<void>
    {
        console.log('usuario no save!', user)
        let userListToSave = this.insertIntoUsersList(user);
        this.localStorage.setItem(this.USERS_LIST_KEY, JSON.stringify(userListToSave));
    }

    insertIntoUsersList(user: User): User[]
    {
        let usersList = [];
        let usersListStringfy = this.localStorage.getItem(this.USERS_LIST_KEY);

        if(usersListStringfy !== '' && usersListStringfy !== null)
            usersList = JSON.parse(usersListStringfy);
        else usersList = [];

        usersList.push(user);

        return usersList;
    }  
}
