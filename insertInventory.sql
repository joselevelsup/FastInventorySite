insert into inventory values ('2', 'Zero-Client', 'Windows7', null, (select RoomNumber from building where RoomCode = '2501'), '34', curdate());
insert into inventory values ('3', 'Desktop', 'Windows7', null, (select RoomNumber from building where RoomCode = '9842'), '35', curdate());
insert into inventory values ('4', 'Zero-Client', 'Windows7', null, (select RoomNumber from building where RoomCode = '6504'), '7', curdate());
insert into inventory values ('5', 'Desktop', 'Windows7', null, (select RoomNumber from building where RoomCode = '7738'), '21', curdate());
insert into inventory values ('6', 'Desktop', 'Windows7', null, (select RoomNumber from building where RoomCode = '7739'), '22', curdate()); 