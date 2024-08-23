const database = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 20;

exports.postUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, salt);
    const values = [req.body.name, req.body.email, hash];
    await database.query(
      'INSERT INTO users(name, email, password ) values($1,$2,$3)', // 쿼리문에서 column 값은 동일하게 지정해야한다.
      values
    );

    return res.status(201).json({ message: 'Signup successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { rows } = await database.query(
      'SELECT * FROM users WHERE email = $1',
      [req.body.email]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const compare = await bcrypt.compare(req.body.password, rows[0].password);

    if (!compare) {
      return res.status(401).json({ message: 'Password not matched' });
    }

    const name = rows[0].name;
    const email = rows[0].email;
    const token = jwt.sign({ name, email }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    }); //암호화될 데이터, 비밀키, 잔존시간

    res.cookie('token', token, {
      httpOnly: true, // 클라이언트에서 쿠키를 자바스크립트로 접근하지 못하게 함
      sameSite: 'None', // CORS 상황에서 쿠키가 전달될 수 있도록 설정
    });

    return res.status(201).json({ token: token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
