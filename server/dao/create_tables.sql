CREATE table kategori(
                         id int(10) AUTO_INCREMENT PRIMARY KEY,
                         navn varchar(50)
);

create table artikkel
(
    id         int auto_increment
        primary key,
    tittel     varchar(256)                                  not null,
    tekst      longtext                                      null,
    tidspunkt  timestamp   default CURRENT_TIMESTAMP         not null on update CURRENT_TIMESTAMP,
    bilde      longtext                                      null,
    forfatter  varchar(256)                                  not null,
    viktighet  int(1)                                        not null,
    kategoriid int(10)     default 1                         null,
    alt        varchar(50) default 'Bilde ikke tilgjengelig' null,
    constraint fk_1
        foreign key (kategoriid) references kategori (id)
);


create table kommentar(
                          id int AUTO_INCREMENT PRIMARY KEY,
                          nickname varchar(30) DEFAULT 'Curious Betsy',
                          tekst varchar(500) DEFAULT 'Fin artikkel!',
                          artikkelid int(11),
                          CONSTRAINT fk_artikkel
                              FOREIGN KEY (artikkelid) REFERENCES artikkel(id)
)