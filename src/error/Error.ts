export class BaseError extends Error{
	constructor(e?: string){
		super(e);
		this.name = new.target.name;
	}
}

export class ArgumentError extends BaseError{}
