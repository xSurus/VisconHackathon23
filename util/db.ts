import { Pool, PoolConfig } from "pg";

class Db {
    private static _instance: Db;
    private pool: Pool;

    private constructor() {
        this.pool = new Pool();
    }

    /** Loads credentials from env vars, see docs */
    public static get get() {
        if (!this._instance) {
            this._instance = new this();
        }

        return this._instance.pool;
    }
}

export default Db.get;