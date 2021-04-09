import { nanoid } from 'nanoid'
import { ArgumentError } from '../../error/Error'

export class User{
	private userId: string;
	private internalUserId: string;

	/**
	 * 
	 * @param userId 
	 * @throws {ArgumentError}
	 */
	constructor(userId: string){
		if(!userId){
			throw new ArgumentError();
		}
		this.userId = userId;
		this.internalUserId = nanoid(16);
	}
}