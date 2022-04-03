import { getDb } from './db.js';

const db = getDb();

export const Payment = {
  async get(id) {
    if (id) {
      const [data] = await db.query(`SELECT * FROM form_payment WHERE id = ${id}`, { type: db.QueryTypes.SELECT});
      return data;
    }

    const data = await db.query('SELECT * FROM form_payment', { type: db.QueryTypes.SELECT});
    return data;
  },
};