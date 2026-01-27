import { Inject, Injectable } from '@nestjs/common';
import e from 'express';
import { concat, groupBy } from 'rxjs';
import { KnexService } from 'src/database/knex.service';

@Injectable()
export class QueriesService {
  @Inject() knexService: KnexService;
  protected knex;
  onModuleInit() {
    this.knex = this.knexService.db;
  }
  //https://localhost:4200/1
  async get1() {
    const result: any[] = await this.knex
      .from('categories as c')
      .leftJoin('products as p', 'c.category_id', 'p.category_id')
      .select([
        'c.category_id as category_id',
        'c.category_name',
        this.knex.count('p.product_id').as('Product_count'),
      ])
      .groupBy('c.category_id')
      .orderBy('c.category_id', 'asc');

    console.log(result);
    return result;
  }

  // https://localhost:4200/2
  async get_all_products_in_stock() {
    const result: any[] = await this.knex('products')
      .where('units_in_stock', '>', 0)
      .select('product_id', 'product_name', 'units_in_stock');

    return result;
  }

  // https://localhost:4200/3
  async category_name_with_most_products() {
    const result: any[] = await this.knex
      .from('categories as c')
      .leftJoin('products as p', 'c.category_id', 'p.category_id')
      .select([
        'c.category_name',
        this.knex.sum('p.product_id').as('Product_count'),
      ])
      .groupBy('c.category_name');

    console.log(result);
    return result;
  }

  // https://localhost:4200/4
  async averageCostsPerCategory() {
    const result = await this.knex
      .from('categories as c')
      .leftJoin('products as p', 'c.category_id', 'p.category_id')
      .select([
        'c.category_name',
        this.knex.raw('ROUND(AVG(p.unit_price)) AS "Average_cost"'),
      ])
      .groupBy('c.category_name');

    console.log(result);
    return result;
  }
  // https://localhost:4200/5
  async get5() {
    const result = await this.knex('customers as c')
      .select([
        'c.country',
        this.knex.raw('COUNT(c.customer_id) AS "Customer_count"'),
      ])
      .groupBy('c.country')
      .orderBy('Customer_count', 'desc');

    console.log(result);
    return result;
  }

  async top5_customers() {
    const result = await this.knex('customers as c')
      .leftJoin('orders as o', 'c.customer_id', 'o.customer_id')
      .select([
        'c.customer_id',
        'c.company_name',
        this.knex.raw('COUNT(o.order_id) AS "Order_count"'),
      ])
      .groupBy('c.customer_id')
      .orderBy('Order_count', 'desc')
      .limit(5);

    console.log(result);
    return result;
  }

  async totalRevenue() {
    const result = await this.knex('order_details').select(
      this.knex.raw(
        'ROUND(SUM(unit_price * quantity * (1 - discount))) AS "Total_Revenue"',
      ),
    );

    console.log(result);
    return result;
  }

  async ordersCountPerYear() {
    const result = await this.knex('orders as o')
      .select(
        this.knex.raw('EXTRACT(YEAR FROM o.order_date) AS "Order_Year"'),
        this.knex.raw('SUM(o.order_id) AS "Orders_Count"'),
      )
      .leftJoin('order_details as od', 'o.order_id', 'od.order_id')
      .groupBy('Order_Year')
      .orderBy('Order_Year', 'DESC');

    console.log(result);
    return result;
  }

  async ordersCountPer_Month() {
    const result = await this.knex('orders as o')
      .select(
        this.knex.raw('EXTRACT(MONTH FROM o.order_date) AS "Order_Month"'),
        this.knex.raw('SUM(o.order_id) AS "Orders_Count"'),
      )
      .leftJoin('order_details as od', 'o.order_id', 'od.order_id')
      .groupBy('Order_Month')
      .orderBy('Order_Month', 'DESC');

    console.log(result);
    return result;
  }

  async RevenuePerEmployee() {
    const result = await this.knex('employees as e')
      .leftJoin('orders as o', 'e.employee_id', 'o.employee_id')
      .leftJoin('order_details as od', 'o.order_id', 'od.order_id')
      .select(
        'e.employee_id',
        'e.first_name',
        'e.last_name',
        this.knex.raw(
          'ROUND(SUM(od.unit_price * od.quantity * (1 - od.discount))) AS "Total_Revenue"',
        ),
      )
      .groupBy('e.employee_id', 'e.first_name', 'e.last_name')
      .orderBy('Total_Revenue', 'DESC');

    console.log(result);
    return result;
  }

  async Top_Categories_By_Revenue() {
    const result = await this.knex('categories as c')
      .leftJoin('products as p', 'c.category_id', 'p.category_id')
      .leftJoin('order_details as od', 'p.product_id', 'od.product_id')
      .select(
        'c.category_id',
        'c.category_name',
        this.knex.raw(
          'ROUND(SUM(od.unit_price * od.quantity * (1 - od.discount))) AS "Total_Revenue"',
        ),
      )
      .groupBy('c.category_id', 'c.category_name')
      .orderBy('Total_Revenue', 'DESC');

    console.log(result);
    return result;
  }

  async the_most_expensive_product() {
    const result = await this.knex('products')
      .select('product_id', 'product_name', 'unit_price')
      .orderBy('unit_price', 'DESC')
      .limit(1);

    console.log(result);
    return result;
  }

  async average_units_in_price() {
    const result = await this.knex('products').select(
      this.knex.raw('ROUND(AVG(units_in_stock)) AS "Average_Units_In_Stock"'),
    );

    console.log(result);
    return result;
  }

  async Count_Supllier() {
    const result = await this.knex('suppliers').select(
      this.knex.raw('COUNT(supplier_id) AS "Supplier_Count"'),
    );

    console.log(result);
    return result;
  }

  async orders_with_discount() {
    const result = await this.knex('order_details')
      .where('discount', '>', 0)
      .select(this.knex.raw('COUNT(discount) AS "Discount_Count"'));

    console.log(result);
    return result;
  }

  async Supplier_Countries() {
    const result = await this.knex('suppliers')
      .select(
        'country',
        this.knex.raw('COUNT(supplier_id) AS "Supplier_Count"'),
      )
      .groupBy('country')
      .orderBy('Supplier_Count', 'DESC');

    console.log(result);
    return result;
  }

  async Products_name_with_categories() {
    const result = await this.knex('products as p')
      .leftJoin('categories as c', 'p.category_id', 'c.category_id')
      .select('c.category_name', 'p.product_name')
      .orderBy('c.category_name', 'ASC');

    console.log(result);
    return result;
  }

  async order_number_customer() {
    const result = await this.knex('orders as o')
      .leftJoin('customers as c', 'o.customer_id', 'c.customer_id')
      .select('o.order_id', 'c.company_name', 'c.customer_id')
      .groupBy('o.order_id', 'c.company_name', 'c.customer_id');

    console.log(result);
    return result;
  }

  async Customer_id_with_NamesOfEmployees() {
    const result = await this.knex('employees as e')
      .leftJoin('orders as o', 'e.employee_id', 'o.employee_id')
      .leftJoin('customers as c', 'o.customer_id', 'c.customer_id')
      .select('o.order_id', 'e.first_name', 'e.last_name')
      .groupBy('o.order_id', 'e.first_name', 'e.last_name');

    console.log(result);
    return result;
  }

  async Orders_of_categories() {
    const result = await this.knex('order_details as od')
      .leftJoin('products as p', 'od.product_id', 'p.product_id')
      .leftJoin('categories as c', 'p.category_id', 'c.category_id')
      .select(
        'c.category_name',
        this.knex.raw('COUNT(p.product_id) AS "Product_Count"'),
      )
      .groupBy('c.category_name')
      .orderBy('Product_Count', 'DESC');

    console.log(result);
    return result;
  }

  async Suppliers_Average_product_revenue() {
    const result = await this.knex('suppliers as s')
      .leftJoin('products as p', 's.supplier_id', 'p.supplier_id')
      .select(
        's.company_name',
        this.knex.raw('ROUND(AVG(p.unit_price)) AS "Average_Product_Price"'),
      )
      .groupBy('s.company_name')
      .orderBy('Average_Product_Price', 'DESC');

    console.log(result);
    return result;
  }

  async Every_employee_to_customers() {
    const result = await this.knex('employees as e')
      .leftJoin('orders as o', 'e.employee_id', 'o.employee_id')
      .leftJoin('customers as c', 'o.customer_id', 'c.customer_id')
      .select(
        this.knex.raw(`
          e.first_name || ' ' || e.last_name as "Employee_Name"`),
        'c.customer_id',
        'o.order_id',
      );

    console.log(result);
    return result;
  }

  async Every_order_Revenue() {
    const result = await this.knex('order_details as od')
      .leftJoin('products as p', 'od.product_id', 'p.product_id')
      .select(
        'p.product_name',
        this.knex.raw(
          'ROUND(SUM(od.unit_price * od.quantity * (1 - od.discount))) AS "TOTAL_Revenue"',
        ),
      )
      .groupBy('p.product_name')
      .orderBy('TOTAL_Revenue', 'DESC');

    console.log(result);
    return result;
  }

  async Revenue_Per_customers() {
    const result = await this.knex('customers as c')
      .leftJoin('orders as o', 'c.customer_id', 'o.customer_id')
      .leftJoin('order_details as od', 'o.order_id', 'od.order_id')
      .select(
        'c.customer_id',
        'c.company_name',
        this.knex.raw(
          'ROUND(SUM(od.unit_price * od.quantity * (1 - od.discount))) AS "Total_Revenue"',
        ),
      )
      .groupBy('c.customer_id', 'c.company_name')
      .orderBy('Total_Revenue', 'DESC');

    console.log(result);
    return result;
  }

  async Top5_Customers() {
    const result = await this.knex('customers as c')
      .leftJoin('orders as o', 'c.customer_id', 'o.customer_id')
      .leftJoin('order_details as od', 'o.order_id', 'od.order_id')
      .select([
        'c.customer_id',
        'c.company_name',
        this.knex.raw(
          'COALESCE(ROUND(SUM(od.unit_price * od.quantity * (1 - od.discount))), 0) AS "Total_Revenue"',
        ),
      ])
      .groupBy('c.customer_id', 'c.company_name')
      .orderBy('Total_Revenue', 'DESC')
      .limit(5);

    console.log(result);
    return result;
  }

  async Selling_Products_by_quantity() {
    const result = await this.knex('order_details as od')
      .leftJoin('products as p', 'od.product_id', 'p.product_id')
      .select(
        'p.product_name',
        this.knex.raw('SUM(od.quantity) AS "Total_Quantity"'),
      )
      .groupBy('p.product_name')
      .orderBy('Total_Quantity', 'DESC');

    console.log(result);
    return result;
  }

  async Top5_revenue_by_products() {
    const result = await this.knex('order_details as od')
      .leftJoin('products as p', 'od.product_id', 'p.product_id')
      .select(
        'p.product_name',
        this.knex.raw(
          'ROUND(SUM(od.unit_price * od.quantity * (1 - od.discount))) AS "Total_revenue_for_each_Product"',
        ),
      )
      .groupBy('p.product_name')
      .orderBy('Total_revenue_for_each_Product', 'DESC')
      .limit(5);

    console.log(result);
    return result;
  }

  async Revenue_by_Country() {
    const result = await this.knex('customers as c')
      .leftJoin('orders as o', 'c.customer_id', 'o.customer_id')
      .leftJoin('order_details as od', 'o.order_id', 'od.order_id')
      .select(
        'c.country',
        this.knex.raw(
          'ROUND(SUM(od.unit_price * od.quantity * (1 - od.discount))) AS "Total_Revenue"',
        ),
      )
      .groupBy('c.country')
      .orderBy('Total_Revenue', 'DESC');

    console.log(result);
    return result;
  }

  async THE_BEST_order() {
    const result = await this.knex('orders as o')
      .leftJoin('order_details as od', 'od.order_id', 'o.order_id')
      .select(
        'o.order_id',
        this.knex.raw(
          'ROUND(SUM(od.unit_price * od.quantity * (1-od.discount))) as "Total_revenue"',
        ),
      )
      .groupBy('o.order_id')
      .orderBy('Total_revenue', 'DESC')
      .limit(1);

    console.log(result);
    return result;
  }

  async Min_order_by_employee() {
    const result = await this.knex('orders as o')
      .leftJoin('employees as e', 'o.employee_id', 'e.employee_id')
      .select(
        'e.first_name',
        this.knex.raw('ROUND(SUM(o.order_id)) as "Min_order"'),
      )
      .groupBy('e.first_name')
      .orderBy('Min_order', 'ASC')
      .limit(1);

    console.log(result);
    return result;
  }

  async The_most_selling_category() {
    const result = await this.knex('order_details as od')
      .join('products as p', 'p.product_id', 'od.product_id')
      .join('categories as c', 'c.category_id', 'p.category_id')
      .select(
        'c.category_name',
        this.knex.raw('SUM(od.quantity) as total_sold_units'),
        this.knex.raw('COUNT(DISTINCT od.order_id) as total_orders'),
      )
      .groupBy('c.category_name')
      .orderBy('total_sold_units', 'desc');

    console.log(result);
    return result;
  }

  async To_every_employee_most_revenue() {
    const result = await this.knex('orders as o')
      .leftJoin('order_details as od', 'od.order_id', 'o.order_id')
      .leftJoin('employees as e', 'e.employee_id', 'o.employee_id')
      .select(
        'e.first_name',
        this.knex.raw(
          'ROUND(SUM(od.unit_price * od.quantity * (1 - od.discount))) as "REVENUE"',
        ),
      )
      .groupBy('e.first_name')
      .orderBy('REVENUE', 'desc');

    console.log(result);
    return result;
  }

  async products_than_average_price() {
    const result = await this.knex('products')
      .select('product_id', 'product_name', 'unit_price')
      .where('unit_price', '>', this.knex('products').avg('unit_price'))
      .orderBy('unit_price', 'desc');

    console.log(result);
    return result;
  }

  async To_max_price_of_Categories() {
    const result = await this.knex('products as p')
      .join('categories as c', 'c.category_id', ' p.category_id')
      .select(
        'c.category_name',
        this.knex.raw('MAX(p.unit_price) as "Max_price"'),
      )
      .groupBy('c.category_name');

    console.log(result);
    return result;
  }

  async Every_employye_revenue_by_customer() {
    const result = await this.knex('employees as e')
      .join('orders as o', 'o.employee_id', 'e.employee_id')
      .join('customers as c', 'c.customer_id', 'o.customer_id')
      .join('order_details as od', 'od.order_id', 'o.order_id')
      .select(
        this.knex.raw(`
        e.first_name || ' ' || e.last_name as "Employee_Name"`),
        'c.customer_id',
        this.knex.raw(
          'SUM(od.unit_price * od.quantity * (1 - od.discount)) as "TOTAL"',
        ),
      )
      .groupBy('Employee_Name', 'c.customer_id')
      .orderBy('TOTAL', 'ASC');

    console.log(result);
    return result;
  }

  async customers_of_each_country() {
    const { rows } = await this.knex.raw(`SELECT 
    c.country,
    COUNT(DISTINCT o.customer_id) as customer_count,
    COUNT(o.order_id) as total_orders
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    GROUP BY c.country
    ORDER BY customer_count DESC`);

    console.log(rows);
    return rows;
  }

  async The_best_employee() {
    const result = await this.knex('employees as e')
      .leftJoin('orders as o', 'o.employee_id', 'e.employee_id')
      .leftJoin('order_details as od', 'od.order_id', 'o.order_id')
      .select(
        this.knex.raw(`
        e.first_name || ' ' || e.last_name as "Employee_Name",
        COUNT(DISTINCT o.order_id) as "total_orders",
        Round(SUM(od.quantity * od.unit_price * (1 - od.discount))) as "total_sales",
        Round(AVG(od.quantity * od.unit_price * (1 - od.discount))) as "avg_order_value"`),
      )
      .groupBy('e.employee_id')
      .orderBy('total_sales', 'DESC');

    console.log(result);
    return result;
  }
}
