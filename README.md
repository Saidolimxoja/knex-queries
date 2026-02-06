🟢 1–BOSQICH: SELECT & AGGREGATE (1–10)

1. Customers jadvalida nechta mijoz bor?
2. Orders jadvalida nechta buyurtma mavjud?
3. Products jadvalida nechta mahsulot bor?
4. UnitsInStock bo‘yicha jami mahsulotlar soni qancha?
5. Eng qimmat mahsulot narxi nechaga teng?
6. Eng arzon mahsulot narxi nechaga teng?
7. Mahsulotlarning o‘rtacha narxini chiqaring
8. Nechta yetkazib beruvchi (Suppliers) mavjud?
9. Qaysi mamlakatdan nechta supplier bor?
10. Discontinued bo‘lgan mahsulotlar soni

🟡 2–BOSQICH: GROUP BY (11–20)

11. Har bir kategoriya bo‘yicha mahsulotlar soni
12. Har bir kategoriya bo‘yicha o‘rtacha narx
13. Har bir mamlakat bo‘yicha mijozlar soni
14. Har bir shahar bo‘yicha mijozlar soni
15. Har bir supplier nechta mahsulot yetkazgan
16. Har bir employee nechta buyurtma olgan
17. Har bir yil bo‘yicha buyurtmalar soni
18. Har bir oy bo‘yicha buyurtmalar soni
19. Har bir kategoriya bo‘yicha jami UnitsInStock
20. Har bir mamlakat bo‘yicha jami buyurtmalar

🟠 3–BOSQICH: JOIN (21–30)

21. Mahsulot nomi va uning kategoriyasi nomini chiqaring
22. Buyurtma raqami va mijoz nomini chiqaring
23. Buyurtma raqami va employee ism-familiyasi
24. Har bir buyurtmada nechta turdagi mahsulot bor
25. Har bir kategoriya bo‘yicha nechta buyurtma berilgan
26. Har bir supplier yetkazgan mahsulotlar narxining o‘rtachasi
27. Har bir employee qaysi mijozlarga xizmat qilgan
28. Buyurtma sanasi va shipper nomi
29. Har bir shipper nechta buyurtma yetkazgan
30. Buyurtma + mahsulot + kategoriya (3 ta jadval join)

🔵 4–BOSQICH: REVENUE & BUSINESS (31–40)

31. Jami tushumni hisoblang
    UnitPrice _ Quantity _ (1 - Discount)

32. Har bir buyurtma bo‘yicha tushum
33. Har bir mijoz bo‘yicha jami tushum
34. TOP-5 eng ko‘p tushum keltirgan mijoz
35. TOP-5 eng ko‘p sotilgan mahsulot (Quantity bo‘yicha)
36. TOP-5 eng ko‘p tushum keltirgan mahsulot
37. Har bir employee bo‘yicha jami tushum
38. Har bir kategoriya bo‘yicha jami tushum
39. Qaysi davlatdan ko‘proq tushum kelgan
40. Eng foydali 1 ta buyurtma

🔴 5–BOSQICH: SUBQUERY & ADVANCED (41–50)

41. O‘rtacha narxdan qimmat mahsulotlar +
42. Hech qachon buyurtma qilinmagan mahsulotlar +
43. Eng kam buyurtma olgan employee +
44. Eng ko‘p buyurtma bergan mijoz +
45. Oxirgi 1 yilda buyurtma bermagan mijozlar -
46. Eng ko‘p sotilgan kategoriya + 36 TASK
47. Har bir employee uchun eng katta buyurtma summasi + 37 TASK
48. Har bir mijozning birinchi buyurtma sanasi
49. Oxirgi 3 oyda sotilmagan mahsulotlar -
50. Har bir kategoriya bo‘yicha eng qimmat mahsulot + 39 task



---47---
Eng yaxshi sotuvchi xodim (employee) kim? Har bir xodimning:

    1.Necha buyurtma qabul qilgan

    2.Jami savdo summasi (quantity * price * (1-discount))

    3.Ortacha check summasi

-------------------------------46-------------------------------
Har bir mamlakatda nechta mijoz bor va ularning umumiy buyurtmalari soni qancha

-------------------------------45-------------------------------

agar mijoz buyurtma bermagan bolsa, uni ham korsatish

"agar buyurtma berganlarni chiqazsak 89 jami lekn bizning customers TABLE da 91 ta mijoz bor"

-------------------------------44-------------------------------
  Har bir mijoz boyicha ortacha buyurtma summasi
