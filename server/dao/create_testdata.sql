insert into kategori (id, navn) VALUES (1, 'Star Wars');
insert into kategori (id, navn) values (2, 'Western');

insert into artikkel (tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt)
values ('Testartikkel', 'Dette er en viktig artikkel \n veldig!', 'https://media.comicbook.com/2018/10/red-dead-redemption-2-1141343.jpeg?auto=webp&width=696&height=390&crop=696:390,smart',
        'Arthur Morgan', 1, 2, 'A beautifull man');

insert into artikkel (tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt)
values ('Testartikkel', 'Dette er en viktig artikkel \n veldig!', 'https://media.comicbook.com/2018/10/red-dead-redemption-2-1141343.jpeg?auto=webp&width=696&height=390&crop=696:390,smart',
        'Arthur Morgan', 1, 1, 'A beautifull man');

insert into kommentar (nickname, tekst, artikkelid) VALUES ('Curious Betsy', 'Fin artikkel', 1);
insert into kommentar (nickname, tekst, artikkelid) VALUES ('Mag', 'dårlig artikkel', 2);
