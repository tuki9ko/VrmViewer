import { nanoid } from 'nanoid'
import  { hashSync } from 'bcrypt'
import { ArgumentError } from '../../error/Error'
import { ViewUser } from './ViewUser';

const MAX_USER_ID_LENGTH = 16;
const SALT_ROUNDS = 10;

export class User{
	private _userId: string;
	private _password: string;
	private _internalUserId: string;
	private _ViewUsers: Array<ViewUser>;

	/**
	 * 
	 * @param userId 
	 * @throws {ArgumentError}
	 */
	constructor(userId: string, password: string, internalUserId: string, viewUsers: Array<ViewUser>){
		if(!userId || !password){
			throw new ArgumentError('Not enough arguments.');
		}

		if(userId.length > MAX_USER_ID_LENGTH){
			throw new ArgumentError('The userId is too long');
		}

		this._userId = userId;
		this._password = hashSync(password, SALT_ROUNDS);
		this._internalUserId = internalUserId ?? nanoid(16);
		this._ViewUsers = viewUsers ?? new Array<ViewUser>();
	}

	get userId(): string{
		return this._userId;
	}

	get password(): string{
		return this._password;
	}

	get internalUserId(): string{
		return this._internalUserId;
	}

	get viewUsers(): Array<ViewUser>{
		return this._ViewUsers;
	}
}