import { ModelInfo } from "../model/ModelInfo";

export interface IModelInfoRepository{
	save(modelInfo: ModelInfo): Promise<void>;
	findById(modelId: string): Promise<ModelInfo>;
}