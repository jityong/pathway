DROP TABLE IF EXISTS UserInfo;
DROP TABLE IF EXISTS UserFeedback;

CREATE TABLE UserInfo
(
    id          SERIAL,
    postalCode  VARCHAR(6),
    age         VARCHAR(2),
    nationality VARCHAR(50),
    subsidyType VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE UserFeedback
(
    id SERIAL,
    userExperience INTEGER,
    usefulness     INTEGER,
    feedback VARCHAR(300),
    PRIMARY KEY (id)
)