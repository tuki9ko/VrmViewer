import { nanoid } from 'nanoid'
import  { hashSync } from 'bcrypt'
import { ArgumentError } from '../../error/Error'

const MAX_USER_ID_LENGTH = 16;
const SALT_ROUNDS = 10;

export class ViewUser{
	private _viewUserId: string;
	private _password: string;
	private _isEnabled: boolean;
	private _expireDate: Date;

	constructor(viewUserId: string, password: string, isEnabled: boolean, expireDate: Date){
		if(!viewUserId || !password || !isEnabled){
			throw new ArgumentError('Not enough arguments.');
		}

		if(viewUserId.length > MAX_USER_ID_LENGTH){
			throw new ArgumentError('ViewUserId is too long.');
		}

		this._viewUserId = viewUserId;
		this._password = hashSync(password, SALT_ROUNDS);
		this._isEnabled = isEnabled ?? true;
		this._expireDate = expireDate ?? Date.now();
	}

	enable(){
		this._isEnabled = true;
	}

	disable(){
		this._isEnabled = false;
	}

	get viewUserId(): string{
		return this._viewUserId;
	}

	get password(): string{
		return this._password;
	}

	get isEnabled(): boolean{
		return this._isEnabled;
	}

	get expireDate(): Date{
		return this._expireDate;
	}
}