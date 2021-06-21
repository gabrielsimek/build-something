import pool from '../lib/utils/pool';

export default class Order {
    id;
    userName;
    items;

    constructor(row){
      this.id = row.id;
      this.userName = row.user_name;
      this.items = row.items;
    }

    static async insert({ userName, items }){
      const { rows } = await pool.query(
        `INSERT INTO orders (user_name, items)
        VALUES ($1, $2)
        RETURNING *
      `, [userName, items]
      ); 
      return new Order(rows[0]);
    }

    static async findById(id){
      const { rows } = await pool.query(
        `SELECT * FROM orders
        WHERE id = $1
      `, [id]
      ); 
      return new Order(rows[0]);
    }

    static async findAll(){
      const { rows } = await pool.query(`
      SELECT * FROM orders
      `);
      return rows.map(order => new Order(order));
    }

    static async update(items, id){
      const { rows } = await pool.query(
        `UPDATE orders
        SET items = $1
        WHERE id = $2
        RETURNING *
        `, [items, id]
      );
      return new Order(rows[0]);
    }

    static remove(id){
      return pool.query(
        `DELETE FROM orders
          WHERE id = $1
          RETURNING *
        `, [id]
      ).then(({ rows }) => new Order(rows[0]));
      
    }


}
