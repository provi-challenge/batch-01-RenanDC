import { getDb } from './db.js';

const db = getDb();

export const Financing = {
  async get(id) {
    if (id) {
      const [data] = await db.query(`SELECT * FROM form_financing WHERE id = ${id}`, { type: db.QueryTypes.SELECT});
      return data;
    }

    const data = await db.query('SELECT * FROM form_financing', { type: db.QueryTypes.SELECT});
    return data;
  },
  //geting the types of financing for client

  async getFinancing(input_value) {
    if (input_value > 10) {
      return await db.query('SELECT * FROM form_financing', { type: db.QueryTypes.SELECT});
    } else {
      return await db.query('SELECT * FROM form_financing where id in (2,3)', { type: db.QueryTypes.SELECT});
    }
  },
};