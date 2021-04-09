import { Pool, PoolClient } from 'pg'

const DEFAULT_CONNECTION_STRING = "postgresql://postgres:postgres@localhost:5432/db";
const pool = new Pool({ connectionString: process.env.POSTGRES_DB_URL || DEFAULT_CONNECTION_STRING });

export class Postgres{
	private client!: PoolClient;

	private constructor(){}

	/**
	 * Pool から client を取得
	 * @returns {Poromise<void>}
	 */
	async init(): Promise<void>{
		this.client = await pool.connect();
	}

	/**
	 * SQL を実行する
	 * @param query 
	 * @param params 
	 * @returns {Promise<*>}
	 */
	async execute(query: string, params: string[]): Promise<any>{
		return (await this.client.query(query, params)).rows;
	}

	/**
	 * client を開放する
	 * @returns {Promise<*>}
	 */
	async release(): Promise<void>{
		await this.client.release(true);
	}

	/**
	 * トランザクション開始
	 * @returns {Promise<void>}
	 */
	async begin(): Promise<void>{
		await this.client.query('BEGIN');
	}

	/**
	 * トランザクションコミット
	 * @returns {Promise<void>}
	 */
	async commit(): Promise<void>{
		await this.client.query('COMMIT');
	}

	/**
	 * トランザクションロールバック
	 * @returns {Promise<void>}
	 */
	async rollback(): Promise<void>{
		await this.client.query('ROLLBACK');
	}

	/**
	 * クライアントを取得する
	 * @returns {Promise<Postgres>}
	 */
	static async getClient(): Promise<Postgres>{
		const postgres = new Postgres();
		await postgres.init();
		return postgres;
	}
}

