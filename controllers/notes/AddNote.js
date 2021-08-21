const runQuery = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateBody = (noteTitle, description, tags) => {
  if (!noteTitle || !description || !tags) {
    return false;
  }
  return true;
};

const addNote = async (req, res) => {
  try {
    const { noteTitle, description, tags } = req.body;
    const user = req.user;
    const authorId = user.id;

    if (!validateBody(noteTitle, description, tags)) {
      throw new Error('please enter required data!');
    }

    const query = `insert into blogs (blog_title, blog_description, blog_tags, blog_author) values('${noteTitle}', '${description}','${tags}', '${authorId}') RETURNING id`;

    const result = await runQuery(query);
    const output = { ...result.rows[0] };

    return commonResponse(res, 201, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = addNote;
