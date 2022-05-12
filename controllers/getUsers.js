import { fetchUsers } from "../models/index";

const getUsers = async (UsersData) => {
    const Users = await fetchUsers(UsersData)

    return Users;
}

export default getUsers;