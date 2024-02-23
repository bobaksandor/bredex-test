create sequence f1team_seq start with 1 increment by 50;

create table f1team (
                        championships_won integer not null check (championships_won>=0),
                        founding_year integer not null check ((founding_year>=1950) and (founding_year<=2024)),
                        has_payed boolean not null,
                        created_at timestamp(6) not null,
                        id bigint not null,
                        updated_at timestamp(6) not null,
                        name varchar(255),
                        primary key (id)
);

INSERT INTO f1team (championships_won, founding_year, has_payed, created_at, id, updated_at, name)
VALUES
    (7, 1950, true, CURRENT_TIMESTAMP, NEXTVAL('f1team_seq'), CURRENT_TIMESTAMP, 'Ferrari'),
    (8, 1966, true, CURRENT_TIMESTAMP, NEXTVAL('f1team_seq'), CURRENT_TIMESTAMP, 'McLaren'),
    (1, 2016, true, CURRENT_TIMESTAMP, NEXTVAL('f1team_seq'), CURRENT_TIMESTAMP, 'Red Bull Racing'),
    (6, 1963, true, CURRENT_TIMESTAMP, NEXTVAL('f1team_seq'), CURRENT_TIMESTAMP, 'Williams'),
    (5, 1960, false, CURRENT_TIMESTAMP, NEXTVAL('f1team_seq'), CURRENT_TIMESTAMP, 'Lotus'),
    (2, 1991, false, CURRENT_TIMESTAMP, NEXTVAL('f1team_seq'), CURRENT_TIMESTAMP, 'Benetton'),
    (1, 2010, true, CURRENT_TIMESTAMP, NEXTVAL('f1team_seq'), CURRENT_TIMESTAMP, 'Haas F1 Team'),
    (0, 2016, true, CURRENT_TIMESTAMP, NEXTVAL('f1team_seq'), CURRENT_TIMESTAMP, 'Racing Point'),
    (0, 2019, true, CURRENT_TIMESTAMP, NEXTVAL('f1team_seq'), CURRENT_TIMESTAMP, 'AlphaTauri'),
    (0, 2010, true, CURRENT_TIMESTAMP, NEXTVAL('f1team_seq'), CURRENT_TIMESTAMP, 'Virgin Racing');
