DROP TABLE IF EXISTS `useraccount`;
DROP TABLE IF EXISTS `employee`;
DROP TABLE IF EXISTS `inventory`;
DROP TABLE IF EXISTS `building`;

CREATE TABLE employee(
empID int(7) not null auto_increment,
fname varchar(15),
lname varchar(15),
primary key(empID)
);

CREATE TABLE useraccount(
username varchar(30),
passwd varchar(30),
empID int(7) not null,
primary key(username),
FOREIGN KEY (empID) REFERENCES employee(empID) on delete cascade
);

CREATE TABLE building(
BuildingCode varchar(7),
RoomNumber varchar(7),
BuildingName varchar(15),
primary key(RoomNumber)
);


CREATE TABLE inventory(
itemID int(7),
ItemType varchar(15),
OSVersion varchar(15),
QRCode varchar(90),
RoomNumber varchar(7),
Quantity int(7),
StockDate date,
primary key(itemID),
FOREIGN KEY (RoomNumber) REFERENCES building(RoomNumber) on delete cascade
);
