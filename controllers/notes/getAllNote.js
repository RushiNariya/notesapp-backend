const runQuery = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const getNotes = async (req, res) => {
  try {
    const query = `select b.id, b.blog_author, b.blog_title, b.blog_description, b.created_date, b.updated_date, b.blog_tags, concat(u.first_name, ' ', u.last_name) as authorName from blogs b join users u on b.blog_author = u.id order by b.updated_date desc`;
    const response = await runQuery(query);
    if (response.rowCount === 0) {
      throw new Error('note not found!');
    }
    const output = response.rows;

    return commonResponse(res, 200, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = getNotes;
