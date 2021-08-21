const runQuery = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateBody = (noteTitle, description, tags) => {
  if (!noteTitle || !description || !tags) {
    return false;
  }
  return true;
};

const editNote = async (req, res) => {
  try {
    const { noteTitle, description, tags } = req.body;

    const noteId = parseInt(req.params.id, 10);

    const currentdate = new Date();
    const updateDate =
      currentdate.getFullYear() +
      '-' +
      currentdate.getMonth() +
      '-' +
      currentdate.getDay() +
      ' ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds();
    console.log(updateDate);
    const user = req.user;
    const userId = user.id;

    if (!noteId) {
      throw new Error('noteId not found!');
    }

    const query = `select * from blogs where id = '${noteId}'`;
    const response = await runQuery(query);
    if (response.rowCount === 0) {
      throw new Error('note not found!');
    }
    console.log(req.body);

    if (!validateBody(noteTitle, description, tags)) {
      throw new Error('please enter required data!');
    }
    const updateQuery = `update blogs set blog_title='${noteTitle}', blog_description='${description}', blog_tags='${tags}', updated_date='${updateDate}' where id = '${noteId}' RETURNING id`;

    const result = await runQuery(updateQuery);
    const output = { ...result.rows[0] };
    return commonResponse(res, 204, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = editNote;
