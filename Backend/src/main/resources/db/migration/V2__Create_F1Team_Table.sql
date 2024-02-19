create sequence f1team_seq start with 1 increment by 50;

create table f1team
(
    championships_won integer      not null check (championships_won >= 0),
    created_at        timestamp(6) not null,
    first_entry_year  timestamp(6) not null,
    id                bigint       not null,
    updated_at        timestamp(6) not null,
    base              varchar(255) not null,
    chassis           varchar(255) not null,
    engine_supplier   varchar(255) not null,
    name              varchar(255) not null unique,
    owner             varchar(255) not null,
    primary key (id)
);

INSERT INTO f1team (championships_won, created_at, first_entry_year, id, updated_at, base, chassis, engine_supplier,
                    name, owner)
VALUES (7, '1995-01-01 00:00:00', '1995-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'United Kingdom',
        'F1-95', 'Mercedes', 'Mercedes-AMG Petronas Formula One Team', 'Daimler AG'),
       (5, '1996-01-01 00:00:00', '1996-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'Italy', 'SF70H',
        'Ferrari', 'Scuderia Ferrari', 'Fiat Chrysler Automobiles'),
       (4, '2000-01-01 00:00:00', '2000-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'United Kingdom',
        'RB16', 'Honda', 'Red Bull Racing', 'Red Bull GmbH'),
       (1, '2001-01-01 00:00:00', '2001-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'Germany',
        'FW24', 'BMW', 'Williams Racing', 'Dorilton Capital'),
       (3, '2002-01-01 00:00:00', '2002-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'Switzerland',
        'C35', 'Ferrari', 'Alfa Romeo Racing Orlen', 'Sauber Motorsport AG'),
       (6, '2005-01-01 00:00:00', '2005-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'United States',
        'W03', 'Mercedes', 'Haas F1 Team', 'Haas Automation'),
       (2, '2006-01-01 00:00:00', '2006-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'United Kingdom',
        'MP4-21', 'Mercedes', 'McLaren Racing', 'McLaren Group'),
       (4, CURRENT_TIMESTAMP, '1995-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'Base1', 'Chassis1',
        'EngineSupplier1', 'TeamName1', 'Owner1'),
       (7, CURRENT_TIMESTAMP, '2000-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'Base2', 'Chassis2',
        'EngineSupplier2', 'TeamName2', 'Owner2'),
       (2, CURRENT_TIMESTAMP, '2005-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'Base3', 'Chassis3',
        'EngineSupplier3', 'TeamName3', 'Owner3'),
       (3, CURRENT_TIMESTAMP, '2010-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'Base4', 'Chassis4',
        'EngineSupplier4', 'TeamName4', 'Owner4'),
       (5, CURRENT_TIMESTAMP, '2015-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'Base5', 'Chassis5',
        'EngineSupplier5', 'TeamName5', 'Owner5'),
       (6, CURRENT_TIMESTAMP, '2020-01-01 00:00:00', NEXT VALUE FOR f1team_seq, CURRENT_TIMESTAMP, 'Base6', 'Chassis6',
        'EngineSupplier6', 'TeamName6', 'Owner6');

