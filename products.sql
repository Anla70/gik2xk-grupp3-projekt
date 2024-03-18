use shop; 

insert into users(email, first_name, last_name,password, created_at, updated_at) values ("mie@du.se","Mikaela", "Hedberg", "Hejsan", '2022-11-17 22:42:14', '2022-11-17 00:00:00');
insert into users(email, first_name, last_name,password, created_at, updated_at) values ( "yoshi@du.se","Yoshi", "Akterkvist", "Lösenord", '2022-11-17 22:42:14', '2022-11-17 00:00:00');
insert into users(email, first_name, last_name,password, created_at, updated_at) values ("leia@du.se","Leia", "Skywalker", "Loka", '2022-11-17 22:42:14', '2022-11-17 00:00:00');


insert into products (title, body, image_url , price, created_at, updated_at) values ('T-shirt med tryck', 'En avslappnad t-shirt i trikå med tryckt motiv fram. T-shirten har nedhasad axel och ribbad mudd kring halsringningen.', 'http://dummyimage.com/800x800.png/dddddd/000000', 199.00, '2023-12-14 03:10:17', '2024-01-09 00:00:00');

insert into products (title, body, image_url ,price,created_at, updated_at) values ('Utsvängda leggings', 'Ett par leggings i trikå med utsvängda ben. De har hög midja med dold resår.', 'http://dummyimage.com/800x800.png/dddddd/000000', 179.00, '2023-12-1 08:04:52', '2024-03-08 00:00:00');

insert into products (title, body, image_url ,  price,created_at, updated_at) values ('V-ringad blus', 'En långärmad blus i vävd kvalitet med lyster. Blusen är V-ringad med krage och knäppning fram. Ärmslå och manschett med knapp vid ärmslut. Rundad nederkant.', 'http://dummyimage.com/800x800.png/ff4444/ffffff', 179.00, '2023-12-01 07:51:52', '2024-01-08 00:00:00');

insert into products (title, body, image_url ,  price,created_at, updated_at) values ('Ballerinaskor', 'Ett par klassiska ballerinaskor med dekorativ rosett fram. Satinfodrade.', 'http://dummyimage.com/800x800.png/5fa2dd/ffffff', 249.00, '2023-12-24 07:37:36', '2024-01-08 00:00:00');

insert into products (title, body, image_url , price, created_at, updated_at) values ('A-linjekjol', 'En vadlång, a-linjeskuren kjol i vävd kvalitet. Kjolen har hög midja med bred mudd och dold dragkedja och knapp i ena sidan. Ofodrad.', 'http://dummyimage.com/800x800.png/5fa2dd/ffffff', 599.00, '2023-12-09 19:05:23', '2024-01-08 00:00:00');

insert into products (title, body, image_url , price, created_at, updated_at) values ('Skjortklänning i viskos', 'En klänning i vävd viskos med krage och dolda knappar upptill. Klänningen har lång raglanärm med knäppning vid ärmslut och lätt utställd kjol med rynkade våder.', 'http://dummyimage.com/800x800.png/ff4444/ffffff', 299.00 , '2023-12-21 03:26:04', '2024-01-08 00:00:00');

insert into products (title, body, image_url , price, created_at, updated_at) values ('Pyjamas med linne och shorts', 'En pyjamas med ett linne och ett par shorts i ribbad trikå av bomullsblandning med overlockade kanter. Linnet har V-ringning och axelband med spetskant. Shortsen har klädd resår i midjan.', 'http://dummyimage.com/800x800.png/dddddd/000000', 199.00, '2024-01-02 12:38:58', '2024-01-08 00:00:00');

insert into products (title, body, image_url , price, created_at, updated_at) values ('Slim Straight High Jeans', 'Ett par 5-ficksjeans i bomullsdenim med lätt stretch för god bekvämlighet. Jeansen har smala ben med rak passform från midja till benslut. Hög midja samt gylf med dragkedja och knapp. Normallånga ben som slutar precis vid foten med få eller inga veck. En silhuett som aldrig blir omodern.', 'http://dummyimage.com/800x800.png/dddddd/000000', 349.00, '2024-01-05 22:42:34', '2024-01-08 00:00:00');

insert into products (title, body, image_url , price, created_at, updated_at) values ('Lång klänning med smala axelband', 'En lång, figurnära klänning i mjuk bomullstrikå med smala axelband.', 'http://dummyimage.com/800x800.png/ff4444/ffffff', 199.00, '2023-12-08 11:59:16', '2024-01-08 00:00:00');

insert into products (title, body, image_url ,  price,created_at, updated_at) values ('Jeansshorts med hög midja', 'Ett par 5-ficksshorts i stadig bomullsdenim. Shortsen har hög midja och gylf med dragkedja och knapp.', 'http://dummyimage.com/800x800.png/5fa2dd/ffffff', 249.00, '2023-12-09 09:24:19', '2024-01-08 00:00:00');




insert into reviews (review, title, body, product_id, created_at, updated_at) values ('2','Besviken', 'Liten i storleken, midjan är tight.', 5, '2021-04-05 22:04:29', '2022-02-09 00:00:00');

insert into reviews  (review, title, body, product_id, created_at, updated_at) values ('10','Så snygga.', 'Älskar dessa shorts så himla mycket! Har fler i olika färger. Skön hög midja och så snygga', 10, '2021-04-05 22:04:29', '2022-02-09 00:00:00');

insert into reviews  (review, title, body, product_id, created_at, updated_at) values ('6','Så snygg','Jättefin skinande blå färg. Skön tyg. Fin modell. Skulle däremot personligen föredra ärmarna utan knapp manschetter eller åtminstone mjukare manschetter. Tycker om ärmslutet lösare och inte så fast hållen. Men det är en mycket personlig önskan, det är helt normalt och fint med manschetter. Har den både i S och M.', 3, '2021-04-05 22:04:29', '2022-02-09 00:00:00');

