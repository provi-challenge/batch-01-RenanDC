import { getDb } from './db.js';

const db = getDb();

export const Customer = {
  async get(id) {
    if (id) {
      const [data] = await db.query(`SELECT * FROM customer WHERE id = ${id}`, { type: db.QueryTypes.SELECT});
      return data;
    }

    const [data]  = await db.query('SELECT * FROM customer', { type: db.QueryTypes.SELECT});
    return data;
  },

  async post(customer) {
    customer.cpf = customer.cpf.replace(/[|&;$%@"<>()+,.-]/g, "");
    if (!customer.id_financing) {
      customer.id_financing = null,
      customer.id_payment = null
    }

    const values = [customer.name, customer.email, customer.cpf, customer.input_value, customer.id_financing, customer.id_payment];
    const [[results]] = await db.query(`INSERT INTO customer(name, email, cpf, input_value, id_form_financing, id_form_payment) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id;`, { bind: values })

    return results
  },

  async put(customer) {
    const values = [customer.id_financing, customer.id_payment, customer.id];
    console.log(values)
    const insert = await db.query(`UPDATE customer set id_form_financing = $1, id_form_payment = $2 where id = $3;`, { bind: values });

    return insert
  },
};
