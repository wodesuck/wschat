CREATE TABLE user (
  id       INT AUTO_INCREMENT,
  username VARCHAR(32) UNIQUE,
  password VARCHAR(32),
  PRIMARY KEY (id)
);

CREATE TABLE message (
  id     INT AUTO_INCREMENT,
  type   INT,
  sender VARCHAR(32),
  msg    TEXT,
  stamp  INT,
  PRIMARY KEY (id),
  INDEX (stamp)
);
