import { VRM } from "@pixiv/three-vrm";
import { PromiseGLTFLoader } from "./../loader/PromiseGLTFLoader";

import { Postgres } from "./Postgres"
import { ModelInfo } from "../../domain/model/ModelInfo";
import { IModelInfoRepository } from "../../domain/repository/IModelInfoRepository";


export class ModelInfoRepository implements IModelInfoRepository{
	async save(modelInfo: ModelInfo): Promise<void>{
		const db = await Postgres.getClient();

		try{
			const sql = `
				INSERT INTO MODEL_INFO(model_id, model_url, model_name, is_published, internal_user_id) VALUES($1, $2, $3, $4, $5)
				ON CONFLICT ON CONSTRAINT model_info_model_id_key
				DO
				UPDATE SET model_url = $2, model_name = $3 is_published = $4, internal_user_id = $5`;
			const params = [modelInfo.modelId, modelInfo.modelUrl, modelInfo.modelName, modelInfo.isPublished.toString(), modelInfo.internalUserId];

			await db.begin();
			await db.execute(sql, params);
			await db.commit();
		} catch(e){
			await db.rollback();
			throw e;
		} finally {
			await db.release();
		}
	}

	async findById(modelId: string): Promise<ModelInfo>{
		const db = await Postgres.getClient();

		try{
			const sql = `
				SELECT model_id, model_url, model_name, is_published, internal_user_id
				FROM model_info
				WHERE model_id = $1
			`;
			const params = [modelId];

			const res = await db.execute(sql, params);
			
			const loader = new PromiseGLTFLoader();
			const gltf = await loader.promiseLoad(
				res.model_url,
				progress =>{
					console.log(
						'Loading model...',
						100.0 * (progress.loaded / progress.total),
						'%',
					)
				},
			);
			const vrm = await VRM.from(gltf);
			
			return new ModelInfo(res.model_id, res.model_url, res.model_name, vrm, res.is_published, res.internal_user_id);
		} catch(e){
			throw e;
		} finally {
			await db.release();
		}
	}
}