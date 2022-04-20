import { getDb } from './db.js';

const db = getDb();

export const Courses = {
  async get(id) {
    if (id) {
      const [data] = await db.query(`SELECT * FROM courses WHERE id = ${id}`, { type: db.QueryTypes.SELECT});
      return data;
    }

    const [data]  = await db.query('SELECT * FROM courses', { type: db.QueryTypes.SELECT});
    return data;
  },
};
