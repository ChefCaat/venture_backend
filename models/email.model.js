const query = require('../db/db-connection');
const {multipleColumnSet} = require('../utils/common.utils');
const uuid = require('uuid')

class EmailModel {
  tableName = 'email';


  findOne = async (params) => {
    const {columnSet, values} = multipleColumnSet(params)

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (user)
    return result[0];
  }

  create = async ({id = uuid.v4(), email}) => {

    const sql = `INSERT INTO ${this.tableName}
        ( id, email ) VALUES (? , ?)`;

    const result = await query(sql, [id, email]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  }
}

module.exports = new EmailModel;
