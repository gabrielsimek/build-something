import pool from '../lib/utils/pool';

export default class Order {
    id;
    item;
    quantity;
    userName;

    constructor(row){
      this.id = row.id;
      this.item = row.item;
      this.quantity = row.quantity;
      this.userName = row.user_name;
    }

    static async insert({ userName, order }){
    
      return Promise.all(
        order.map(({ item, quantity }) => {
          return pool.query(
            `INSERT INTO orders (item, quantity, user_name)
            VALUES ($1, $2, $3)
            RETURNING *
              `, [item, quantity, userName]
          );
        })
      ).then(contents => {
        return contents.map(item =>  new Order(item.rows[0]));
      });
      //JSON b insert entire obj as one row
      //setup sql
      //
      
    }
}
