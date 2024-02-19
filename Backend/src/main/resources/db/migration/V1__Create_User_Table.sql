create sequence _user_seq start with 1 increment by 50;

create table _user
(
    created_at timestamp(6) not null,
    id         bigint       not null unique,
    updated_at timestamp(6) not null,
    email      varchar(255) not null unique,
    first_name varchar(255) not null,
    last_name  varchar(255) not null,
    password   varchar(255) not null,
    role       varchar(255) not null check (role in ('USER', 'ADMIN')),
    username   varchar(255) not null unique,
    primary key (id)
);