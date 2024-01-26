CREATE TABLE SELLER(
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(64)
);

CREATE TABLE MANUFACTURER(
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(64)
);

CREATE TABLE CAR_MODEL(
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(64),
	id_manufacturer INT,
	FOREIGN KEY(id_manufacturer)
		REFERENCES MANUFACTURER(id)

);

CREATE TABLE CAR_REQUEST(
	id INT PRIMARY KEY IDENTITY,
	date DATE,
	price INT,
	id_car_model INT,
	id_seller INT,
	FOREIGN KEY(id_car_model)
		REFERENCES CAR_MODEL(id),
	FOREIGN KEY(id_seller)
		REFERENCES SELLER(id)

);

INSERT INTO SELLER(name) VALUES ('Vendedor1'), ('Vendedor2'), ('Vendedor3');

INSERT INTO MANUFACTURER(name) VALUES ('Suzuki'), ('Kia'), ('Chevrolet');

INSERT INTO CAR_MODEL(name,id_manufacturer) values ('CELERIO', 1), ('BALENO',1), ('PICANTO',2), ('EV6',2), ('SPIN',3), ('ONIX',3);

INSERT INTO CAR_REQUEST(date, price, id_car_model, id_seller) VALUES
(CAST('2023-11-29' as date), 9500000, 2, 2),
(CAST('2023-12-12' as date), 3000000, 4, 1),
(CAST('2023-12-13' as date), 4500000, 6, 2),
(CAST('2023-12-14' as date), 12000000, 2, 3),
(CAST('2023-12-22' as date), 2000000, 5, 3),
(CAST('2023-12-23' as date), 1200000, 1, 1),
(CAST('2023-12-24' as date), 8000000, 2, 2),
(CAST('2023-12-30' as date), 7000000, 4, 2),
(CAST('2024-01-03' as date), 9000000, 6, 3),
(CAST('2024-01-05' as date), 1250000, 2, 1),
(CAST('2024-01-17' as date), 9500000, 2, 2);

select TOP 3 manufacturer.name, COUNT(CASE WHEN manufacturer.id=car_model.id_manufacturer and car_model.id=car_request.id_car_model THEN 1 ELSE NULL END) as total_sells from manufacturer, car_model, car_request group by manufacturer.name order by total_sells desc;

SELECT * FROM CAR_REQUEST WHERE MONTH(DATE) =MONTH(GETDATE());

select top 1 SELLER.NAME, COUNT(CASE WHEN car_request.id_seller=seller.id  and DATEDIFF(MONTH, car_request.date,GETDATE())<=1THEN 1 ELSE NULL END) as total_sells from SELLER, CAR_REQUEST group by SELLER.name order by total_sells asc;

SELECT car_model.name from car_model left outer join car_request on car_model.id=car_request.id_car_model where car_request.id_car_model IS NULL;

select top 3 Month(car_request.date), Year(car_request.date) , SUM(car_request.price) as sum_prices from car_request group by Month(car_request.date), Year(car_request.date) order by sum_prices desc; 

