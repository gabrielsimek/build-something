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

      //JSON b insert entire obj as one row
      //setup sql
      //
      
    }
}
