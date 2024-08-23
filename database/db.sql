-- 생성된 테이블

CREATE TABLE task (
    _id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    isCompleted BOOLEAN NOT NULL DEFAULT false,
    isImportant BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userId TEXT NOT NULL
);

-- 데이터 조회

SELECT * FROM task


-- 특정 사용자 데이터 필터 조회

SELECT * FROM task where userId = 'hoon'


-- 데이터 추가

INSERT INTO task(id, title, description, date, isCompleted, isImportant, userId) values('1234','할일1','할일1 설명','2021-08-01','lee')





--사용자 테이블 생성--
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);



INSERT INTO users(name, email, password) values('1234','할일1','할일1 설명','2021-08-01','lee')