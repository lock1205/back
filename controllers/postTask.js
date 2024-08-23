const database = require('../database/database');

const { v4: uuid4 } = require('uuid');

exports.postTasks = async (req, res) => {
  const _id = uuid4();
  console.log(_id);
  console.log(req.body);
  const { title, description, date, isCompleted, isImportant, userId } =
    req.body;
  //console.log(title, description, date, isCompleted, isImportant, userId);
  try {
    await database.query(
      'INSERT INTO task(_id, title, description, date, userId) values($1,$2,$3,$4,$5)', // 쿼리문에서 column 값은 동일하게 지정해야한다.
      [_id, title, description, date, userId]
    );

    return res.status(201).json({ message: 'Task create succesfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
