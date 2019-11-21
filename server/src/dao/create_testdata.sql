insert into kategori (id, navn) VALUES (1, 'Star Wars');
insert into kategori (id, navn) values (2, 'Western');

insert into artikkel (tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt)
values ('Testartikkel', 'Dette er en viktig artikkel \n veldig!', 'https://media.comicbook.com/2018/10/red-dead-redemption-2-1141343.jpeg?auto=webp&width=696&height=390&crop=696:390,smart',
        'Arthur Morgan', 1, 2, 'A beautifull man');

insert into artikkel (tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt)
values ('Testartikkel2', 'Dette er en annen artikkel', 'https://images.gog.com/af5b0d52bce816666d0d703372da8d1251b315748fed2f2113389991b1b56603_product_card_v2_mobile_slider_639.jpg',
        '501', 2, 1, 'Mundi');

insert into kommentar (nickname, tekst, artikkelid) VALUES ('Curious Betsy', 'Fin artikkel', 1);
insert into kommentar (nickname, tekst, artikkelid) VALUES ('Mag', 'dårlig artikkel', 2);
