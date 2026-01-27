import { Inject, Injectable } from '@nestjs/common';
import { concat } from 'rxjs';
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
}
