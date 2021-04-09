import { User } from '../model/User'

export interface IUserRepository{
	save(user: User): void;
	findByUserId(userId: string): User;
}