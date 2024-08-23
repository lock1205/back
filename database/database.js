const { Pool } = require('pg'); //postgres 모듈 불러오기
require('dotenv').config(); //.env 파일 사용 설정

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = pool; //{ pool } => 객체처리({})를 안해도 된다. 하지만 객체처리를 한다면 await database.query('SELECT * FROM test_db'); 이부분에 database.pool.query 로 변경해야한다.
