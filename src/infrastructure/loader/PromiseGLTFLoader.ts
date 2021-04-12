import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export class PromiseGLTFLoader extends GLTFLoader{
	promiseLoad(url: string, onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined){
		return new Promise<GLTF>((resolve, reject) => {
			super.load(url, resolve, onProgress, reject);
		});
	}
};