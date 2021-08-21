const runQuery = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const getNoteById = async (req, res) => {
  try {
    const noteId = parseInt(req.params.id, 10);

    if (!noteId) {
      throw new Error('noteId not found!');
    }

    const user = req.user;
    const userId = user.id;

    const query = `select b.id, b.blog_title, b.blog_description, b.created_date, b.updated_date, b.blog_tags, concat(u.first_name, ' ', u.last_name) as authorName from blogs b join users u on b.blog_author = u.id and b.id = '${noteId}'`;
    const response = await runQuery(query);

    if (response.rowCount === 0) {
      throw new Error('note not found!');
    }

    const output = { ...response.rows[0] };

    return commonResponse(res, 200, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = getNoteById;
