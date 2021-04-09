import { VRM } from "@pixiv/three-vrm";
import { nanoid } from "nanoid";
import { ArgumentError } from "../../error/Error";

const MAX_URL_LENGTH = 64;
const MAX_NAME_LENGTH = 64;
const MAX_USER_ID_LENGTH = 16;


export class ModelInfo{
	private _modelId: string;
	private _modelUrl: string;
	private _modelName: string;
	private _model: VRM;
	private _isPublished: boolean;
	private _internalUserId: string;

	/**
	 * 
	 * @param modelId
	 * @param modelUrl
	 * @param modelName 
	 * @param model 
	 * @param isPublished
	 * @param internalUserId 
	 * @throws {ArgumentError}
	 */
	 constructor(modelId: string, modelUrl: string, modelName: string, model: VRM, isPublished: boolean, internalUserId: string){
		if(!modelUrl || !modelName || !model || !internalUserId){
			throw new ArgumentError("Not enough arguments.");
		}

		let urlReg = /(.*)(?:\.([^.]+$))/
		const urlRes = modelUrl.match(urlReg);

		if(urlRes){
			if(urlRes[1].length > MAX_URL_LENGTH){
				throw new ArgumentError("The Url is too long.");
			}
		} else {
			throw new ArgumentError("The Url is invalid.");
		}
		
		if(modelName.length > MAX_NAME_LENGTH){
			throw new ArgumentError("The Name is too long.");
		}

		if(internalUserId.length > MAX_USER_ID_LENGTH){
			throw new ArgumentError("The UserID is too long.");
		}

		if(modelId){
			this._modelId = modelId;
		} else {
			this._modelId = nanoid(16);
		}
		this._modelUrl = modelUrl;
		this._modelName = modelName
		this._model = model;
		if(isPublished){
			this._isPublished = isPublished;
		} else {
			this._isPublished = true;
		}
		this._internalUserId = internalUserId;
	}

	publish(){
		this._isPublished = true;
	}

	unPublish(){
		this._isPublished = false;
	}

	get modelId(): string{
		return this._modelId;
	}

	get modelUrl(): string{
		return this._modelUrl;
	}

	get modelName(): string{
		return this._modelName;
	}

	get model(): VRM{
		return this._model;
	}

	get isPublished(): boolean{
		return this._isPublished;
	}

	get internalUserId(): string{
		return this._internalUserId;
	}

}