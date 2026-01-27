---1-----Category_id---Category_name---Product_count------
SELECT
  categories.category_id as "category_id",
  categories.category_name,
  count(products.product_id) as "Produc_count"
from
  categories
  left join products on categories.category_id = products.category_id
GROUP BY
  categories.category_id
  having count(products.product_id ) > 10


---2----Task 1.4-----

📌 Mahsulotlarning umumiy soni (UnitsInStock) qancha?

SELECT
  sum(products.units_in_stock) as Sum_of_units_in_stock
from
  products

---3-----Task 2.1

📌 Har bir kategoriya bo‘yicha mahsulotlar soni

Natija:       CategoryName | product_count

QUERY : 

SELECT
  c.category_name,
  sum(p.product_id) as product_count
from
  categories c
  join products p  on c.category_id=p.category_id
GROUP by c.category_name

---4----Task 2.2

📌 Har bir kategoriya bo‘yicha o‘rtacha narx (avg price)

QUERY :

SELECT
  c.category_name,
  AVG(p.unit_price) as AVG_PRICE
from
  categories c
  join products p  on c.category_id=p.category_id
GROUP by c.category_name


---5----Task 2.3

📌 Har bir davlat (Country) bo‘yicha mijozlar soni

QUERY :

SELECT
  c.country,
  count(c.customer_id)
FROM
  customers c
group by
  c.country 

---6---🟠 3-bosqich: Order + Revenue (real biznes statistika)
Task 3.1

📌 Eng ko‘p buyurtma bergan TOP-5 mijoz

QUERY : 

SELECT
  c.customer_id as CustomerID,
  count(o.order_id) as order_count 
from
  orders o
  join customers c on c.customer_id = o.customer_id
Group by
  c.customer_id 
Order by order_count DESC  
Limit 5 


---7---Task 3.3

📌 Jami tushum (Revenue)

Formula:   unit_price * quantity * (1 - discount)

select
  SUM(od.unit_price * od.quantity * (1 - od.discount)) AS total_sales
FROM
  order_details od


---8-----🔴 4-bosqich: Vaqt bo‘yicha statistika (DATE)
Task 4.1

📌 Yillar bo‘yicha buyurtmalar soni

Natija:    Year | order_count

QUERY : 

select
    EXTRACT(YEAR from o.order_date) as year,
    SUM(o.order_id) AS orders_count
from orders o
join  order_details od on o.order_id = od.order_id
group by year
ORDER BY orders_count DESC;



---9----Task 4.2

📌 Oylar bo‘yicha tushum (monthly revenue)


QUERY:
select
    EXTRACT(month from o.order_date) as month,
    SUM(od.unit_price * od.quantity * (1 - od.discount)) AS total_sales_per_month
from orders o
join  order_details od on o.order_id = od.order_id
group by month
ORDER BY month ASC;
ORDER BY total_sales_per_month DESC;

---10----Task 5.1 ⭐

📌 Har bir xodim (employee) qancha tushum qilgan

Q ;

select
  e.employee_id,
  e.first_name,
  e.last_name,
  sum(od.unit_price * od.quantity * (1 - od.discount)) AS total_revenue
from
  employees e
  join orders o on o.employee_id = e.employee_id
  join order_details od on od.order_id = o.order_id
group by
  e.employee_id,
  e.first_name,
  e.last_name
order by
  total_revenue DESC;

---11----Task 5.2 ⭐⭐

📌 Qaysi kategoriya eng ko‘p foyda keltirgan

Q :

select
  c.category_name,
  SUM(od.unit_price * od.quantity * (1 - od.discount)) AS TOTAL
from
  categories c
  join products p on p.category_id = c.category_id
  join order_details od on od.product_id = p.product_id
group by
c.category_name
order by
  TOTAL DESC
 
-----------------12------------------------
5. Eng qimmat mahsulot narxi nechaga teng?
6. Eng arzon mahsulot narxi nechaga teng?

select
   p.product_name,
  MAX(od.unit_price) as The_Most_Expensive
from
  order_details od
  join products p on p.product_id = od.product_id
group by
  p.product_name 
order by The_Most_Expensive DESC / ASC 


Côte de Blaye 263.5 The most expensive product
Geitost 2.5 the cheepest product 


--------------------------13 ---------------------

7. O‘rtacha product narxi qancha?

select
   AVG(od.unit_price) as Average_prdouct_cost
from
  order_details od

-------------------------14------------------

8. Nechta supplier bor?

select
  count(supplier_id) as Suppliers_costs
from
  suppliers

---------------------------15------------

10. Discount berilgan order detail lar soni nechta?

select
  count(discount) as SUm_discounts
from
  order_details
where
  discount > 0

----------------------------16-------------------
Qaysi mamlakatdan nechta supplier bor?

QUERY:

select
 country,
 count(supplier_id) as Count_of_Supliers
FROM suppliers
group by country 

------------------------------17------------------

Discontinued bo‘lgan mahsulotlar soni

SELECT
  p.product_name, p.discontinued
FROM
  products as p



-----------------------------18------------------- 🟠 3–BOSQICH: JOIN (21–30)
 Mahsulot nomi va uning kategoriyasi nomini chiqaring

SELECT
  c.category_id,
  p.product_name,
  c.category_name
FROM
  products p
  join categories as c on p.category_id = c.category_id
group by
  c.category_name,
  p.product_name,
  c.category_id

-------------------------------19-------------------

Buyurtma raqami va mijoz nomini chiqaring

SELECT
  o.order_id,
  c.customer_id
FROM
  orders as o
  join customers as c on c.customer_id = o.customer_id
group by c.customer_id ,   o.order_id

-------------------------------20----------------------
Buyurtma raqami va employee ism-familiyasi

SELECT
  e.first_name,
  e.last_name,
  o.order_id
FROM
  employees as e
  join orders as o on e.employee_id = o.employee_id
group by
  e.first_name,
  e.last_name,
  o.order_id

----------------------------------21---------------------

25. Har bir kategoriya bo‘yicha nechta buyurtma berilgan

SELECT
    c.category_name,
    count(od.order_id) as Count_of_Orders
FROM
  order_details as od
  join products as p on od.product_id= p.product_id
  join categories as c on c.category_id = p.category_id
group by
    c.category_name

-----------------------------------22-------------------------

Har bir supplier yetkazgan mahsulotlar narxining o‘rtachasi

SELECT
    s.company_name,
    AVG(p.unit_price) as AVG_OF_Proices 
FROM
  suppliers as s 
  join products as p on p.supplier_id = s.supplier_id
group by
    s.company_name

--------------------------------------23-------------------------

Har bir employee qaysi mijozlarga xizmat qilgan

SELECT
    o.order_id,
    e.first_name,
    e.last_name,
    c.customer_id
FROM
    employees as e
    join orders o on o.employee_id = e.employee_id
    join customers c on o.customer_id = c.customer_id
group by
     o.order_id,
    c.customer_id,
    e.first_name,
    e.last_name

----------------------------------------24-------------------------
Buyurtma sanasi va shipper nomi

select o.order_id,
o.ship_name,
sh.company_name,
o.order_date
from orders as o
join shippers sh on sh.shipper_id = o.ship_via
group by 
o.order_id,
o.ship_name,
sh.company_name,
o.order_date

----------------------------------------25----------------------------

 Har bir shipper nechta buyurtma yetkazgan

select
  o.ship_name,
  sh.company_name,
  count(order_id) as Count_of_orders
from
  orders as o
  join shippers sh on sh.shipper_id = o.ship_via
group by
  sh.company_name,
  o.ship_name

----------------------------------------26----------------------------

 Buyurtma + mahsulot + kategoriya (3 ta jadval join)

SELECT
  od.order_id,
  p.product_name,
  c.category_name
FROM
  categories as c
  JOIN products as p on p.category_id = c.category_id
  JOIN order_details as od on od.product_id = p.product_id
GROUP by
  od.order_id,
  p.product_name,
  c.category_name


------------------------------------------27-----------------------------
🔵 4–BOSQICH: REVENUE & BUSINESS (31–40)    
31 = 7 


 Har bir buyurtma bo‘yicha tushum

SELECT
  p.product_name,
  od.order_id,
  sum(od.unit_price * od.quantity * (1 - od.discount)) as TOTAL_REVENUE
from
  order_details od
  join products p on p.product_id = od.product_id
group by
  p.product_name,
  od.order_id

-------------------------------------------28--------------------------------

Har bir mijoz bo‘yicha jami tushum

select
  c.customer_id,
  sum(od.unit_price * od.quantity * (1 - od.discount)) as TOTAL
from
  orders o
  join order_details od on od.order_id = o.order_id
  join customers c on c.customer_id = o.customer_id
GROUP by
  c.customer_id

-------------------------------------------29--------------------------------

 TOP-5 eng ko‘p tushum keltirgan mijoz

 select
  c.customer_id,
  sum(od.unit_price * od.quantity * (1 - od.discount)) as TOTAL
from
  orders o
  join order_details od on od.order_id = o.order_id
  join customers c on c.customer_id = o.customer_id
GROUP by
  c.customer_id
order by TOTAL desc
limit 5 

-------------------------------------------30--------------------------------
 TOP-5 eng ko‘p sotilgan mahsulot (Quantity bo‘yicha)

select
  p.product_name,
  sum(od.quantity) as Sell_quantity
from
  order_details od
  join products p on p.product_id = od.product_id
group by
  p.product_name
  order by Sell_quantity desc  
limit 5


----------------------------------------------31------------------------------------

 TOP-5 eng ko‘p tushum keltirgan mahsulot

select
  p.product_name,
  sum(od.unit_price *od.quantity* (1-od.discount)) as Total_revenue_for_each_Product 
from
  orders o
  join order_details od on od.order_id = o.order_id
  join products p on p.product_id = od.product_id
group by
  p.product_name
  order by Total_revenue_for_each_Product desc  
limit 5 

----------------------------------------------32-------------------------------------------

 10 = 37 
 11 = 38

 Qaysi davlatdan ko‘proq tushum kelgan

 select
  c.country,
  sum(od.unit_price * od.quantity * (1 - od.discount)) as Total_revenue_for_each_Country
from
  orders o
  join order_details od on od.order_id = o.order_id
  join customers c on c.customer_id = o.customer_id
group by
  c.country
order by
  Total_revenue_for_each_Country desc
  limit 5




-----------------------------------------------33----------------------------------------------

 Eng foydali 1 ta buyurtma

 select
  o.order_id,
  sum(od.unit_price * od.quantity * (1 - od.discount)) as Total_revenue
from
  orders o
  join order_details od on od.order_id = o.order_id
group by
  o.order_id
order by
  Total_revenue desc

limit
  1
-------------------------------------------------34-----------------------------------------------

 Eng kam buyurtma olgan employee

select
  e.first_name,
  count(o.order_id) as MIN_order
from
  orders o
  join employees e on o.employee_id = e.employee_id
group by
  e.first_name
order by
  MIN_order ASC

-------------------------------------------------35-----------------------------------------------

 Eng ko‘p buyurtma bergan mijoz
 select 
    c.customer_id,
    count (o.order_id) as MAX_order
from orders o 
join customers c on o.customer_id = c.customer_id 
group by c.customer_id
order by MAX_order asc 
limit 1 

-----------------------------------------------------36--------------------------------------------

 Eng ko‘p sotilgan kategoriya


SELECT 
    c.category_name,
    SUM(od.quantity) as total_sold_units,
    COUNT(DISTINCT od.order_id) as total_orders
FROM order_details od
JOIN products p ON p.product_id = od.product_id
JOIN categories c ON c.category_id = p.category_id
GROUP BY c.category_name
ORDER BY total_sold_units DESC;

fixed it was wrong ; 


----------------------------------------------------37--------------------------------------------
47. Har bir employee uchun eng katta buyurtma summasi

select
  e.first_name,
  sum(od.unit_price * od.quantity * (1 - od.discount)) as REVENUE
from
  orders o
  join employees e on e.employee_id = o.employee_id
  join order_details od on od.order_id = o.order_id
group by  e.first_name
order by REVENUE DESC 

---------------------------------------------------38---------------------------------------------

 Ortacha narxdan qimmat mahsulotlar

SELECT
    product_id,
    product_name,
    unit_price
FROM products
WHERE unit_price > (
    SELECT AVG(unit_price)
    FROM products
)
ORDER BY unit_price asc;


----------------------------39------------------------------

Har bir kategoriya boyicha eng qimmat mahsulot

select
  c.category_name , 
  MAX(p.unit_price) as MAx_price 
from
  products p
  join categories c on c.category_id = p.category_id
  group by c.category_name

----------------------------40-----------------------------

 Har bir supplier boyicha eng arzon mahsulot 
select
  s.company_name,
  MIN(p.unit_price) as MIN_price
from
  suppliers s
  join products p on p.supplier_id = s.supplier_id
group by
  s.company_name  

-------------------------------41-------------------------------
  Har bir mijoz boyicha eng songgi buyurtma sanasi
select
  c.customer_id,
  MAX(o.order_date) as Last_order_date
from
  customers c
  join orders o on o.customer_id = c.customer_id
group by
  c.customer_id
-------------------------------42-------------------------------
  Har bir xodim boyicha eng kam tushum keltirgan mijoz

select  
  e.first_name,
  c.customer_id,
  SUM(od.unit_price * od.quantity * (1 - od.discount)) as TOTAL
from
  employees e
  join orders o on o.employee_id = e.employee_id
  join customers c on c.customer_id = o.customer_id
  join order_details od on od.order_id = o.order_id
group by
  e.first_name,
  c.customer_id
order by
  TOTAL asc

limit 1 

-------------------------------43-------------------------------

Har bir shipper (tashuvchi) nechta buyurtma yetkazgan?

select
    s.company_name,
    count(o.order_id) as total_orders
from shippers s
join orders o on s.shipper_id = o.ship_via
group by  s.company_name
order by total_orders desc;

-------------------------------44-------------------------------
  Har bir mijoz boyicha ortacha buyurtma summasi

select
  c.customer_id,
  AVG(od.unit_price * od.quantity * (1 - od.discount)) as AVERAGE_ORDER_AMOUNT
from
  customers c
  join orders o on o.customer_id = c.customer_id
  join order_details od on od.order_id = o.order_id
group by
  c.customer_id 

-------------------------------45-------------------------------

agar mijoz buyurtma bermagan bolsa, uni ham korsatish

"agar buyurtma berganlarni chiqazsak 89 jami lekn bizning customers TABLE da 91 ta mijoz bor"

SELECT
  c.customer_id,
  MAX(o.order_date) as Last_order_date,
  COUNT(o.order_id) as order_count
FROM
  customers c
  LEFT JOIN orders o ON c.customer_id = o.customer_id 
GROUP BY
  c.customer_id
ORDER BY 
  Last_order_date asc nulls first ,
  c.customer_id
limit 2


-------------------------------46-------------------------------
Har bir mamlakatda nechta mijoz bor va ularning umumiy buyurtmalari soni qancha

SELECT 
    c.country,
    COUNT(DISTINCT o.customer_id) as customer_count,
    COUNT(o.order_id) as total_orders
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.country
ORDER BY customer_count DESC;

-------------------------------47-------------------------------
Eng yaxshi sotuvchi xodim (employee) kim? Har bir xodimning:

    1.Necha buyurtma qabul qilgan

    2.Jami savdo summasi (quantity * price * (1-discount))

    3.Ortacha check summasi

   SELECT 
    e.first_name || ' ' || e.last_name as employee_name,
    COUNT(DISTINCT o.order_id) as total_orders,
    Round(SUM(od.quantity * od.unit_price * (1 - od.discount))) as total_sales,
    Round(AVG(od.quantity * od.unit_price * (1 - od.discount))) as avg_order_value
FROM employees e
JOIN orders o ON e.employee_id = o.employee_id
JOIN order_details od ON o.order_id = od.order_id
GROUP BY e.employee_id
ORDER BY total_sales DESC;


-------------------------------48-------------------------------