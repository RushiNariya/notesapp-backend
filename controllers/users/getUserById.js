const runQuery = require('../../dbConn');
const { comparePassword } = require('../../utils/bcryptUtils');
const { generateToken } = require('../../utils/jwtUtils');
const commonResponse = require('../../helpers/index');

const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    const query = `select id, first_name as firstName, last_name as lastName, email from users where id = '${userId}'`;
    const response = await runQuery(query);

    if (response.rowCount === 0) {
      throw new Error('user not found!');
    }

    const output = { ...response.rows[0] };

    return commonResponse(res, 201, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { getUserById };
