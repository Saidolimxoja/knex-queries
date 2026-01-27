import { Controller, Get } from '@nestjs/common';
import { QueriesService } from './queries.service';

@Controller('/')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @Get('1')
  async get1() {
    return await this.queriesService.get1();
  }

  @Get('2')
  async getAllProductsInStock() {
    return await this.queriesService.get_all_products_in_stock();
  }

  @Get('3')
  async categoryNameWithMostProducts() {
    return await this.queriesService.category_name_with_most_products();
  }

  @Get('4')
  async averageCostsPerCategory() {
    return await this.queriesService.averageCostsPerCategory();
  }

  @Get('5')
  async get5() {
    return await this.queriesService.get5();
  }

  @Get('6')
  async top5Customers() {
    return await this.queriesService.top5_customers();
  }

  @Get('7')
  async totalRevenue() {
    return await this.queriesService.totalRevenue();
  }

  @Get('8')
  async ordersCountPerYear() {
    return await this.queriesService.ordersCountPerYear();
  }

  @Get('9')
  async get9() {
    return await this.queriesService.ordersCountPer_Month();
  }

  @Get('10')
  async revenuePerEmployee() {
    return await this.queriesService.RevenuePerEmployee();
  }

  @Get('11')
  async topCategoriesByRevenue() {
    return await this.queriesService.Top_Categories_By_Revenue();
  }

  @Get('12')
  async monthlyRevenueLastYear() {
    return await this.queriesService.the_most_expensive_product();
  }

  @Get('13')
  async averageUnitsInPrice() {
    return await this.queriesService.average_units_in_price();
  }

  @Get('14')
  async countSupplier() {
    return await this.queriesService.Count_Supllier();
  }

  @Get('15')
  async ordersWithDiscount() {
    return await this.queriesService.orders_with_discount();
  }

  @Get('16')
  async supplierCountries() {
    return await this.queriesService.Supplier_Countries();
  }

  @Get('17')
  async productsNameWithCategories() {
    return await this.queriesService.Products_name_with_categories();
  }

  @Get('18')
  async orderNumberCustomer() {
    return await this.queriesService.order_number_customer();
  }

  @Get('19')
  async customerIdWithNamesOfEmployees() {
    return await this.queriesService.Customer_id_with_NamesOfEmployees();
  }

  @Get('20')
  async ordersOfCategories() {
    return await this.queriesService.Orders_of_categories();
  }

  @Get('21')
  async suppliersAverageProductRevenue() {
    return await this.queriesService.Suppliers_Average_product_revenue();
  }

  @Get('22')
  async everyEmployeeToCustomers() {
    return await this.queriesService.Every_employee_to_customers();
  }

  @Get('23')
  async everyOrderRevenue() {
    return await this.queriesService.Every_order_Revenue();
  }

  @Get('24')
  async get24() {
    return await this.queriesService.Revenue_Per_customers();
  }

  @Get('25')
  async top5CustomersAlternative() {
    return await this.queriesService.Top5_Customers();
  }

  @Get('26')
  async sellingProductsByQuantity() {
    return await this.queriesService.Selling_Products_by_quantity();
  }

  @Get('27')
  async top5RevenueByProducts() {
    return await this.queriesService.Top5_revenue_by_products();
  }

  @Get('28')
  async revenueByCountry() {
    return await this.queriesService.Revenue_by_Country();
  }

  @Get('29')
  async ThebestRevenue() {
    return await this.queriesService.THE_BEST_order();
  }

  @Get('30')
  async MinOrderEmploye() {
    return await this.queriesService.Min_order_by_employee();
  }

  @Get('31')
  async TheMostSellingCategory() {
    return await this.queriesService.The_most_selling_category();
  }

  @Get('32')
  async To_every_employee_most_revenue() {
    return await this.queriesService.To_every_employee_most_revenue();
  }

  @Get('33')
  async products_than_average_price() {
    return await this.queriesService.products_than_average_price();
  }
  @Get('34')
  async To_max_price_of_Categories() {
    return await this.queriesService.To_max_price_of_Categories();
  }

  @Get('35')
  async Every_employye_revenue_by_customer() {
    return await this.queriesService.Every_employye_revenue_by_customer();
  }
  
  
  @Get('36')
  async customers_of_each_country() {
    return await this.queriesService.customers_of_each_country();
  }
  
  @Get('37')
  async The_best_employee() {
    return await this.queriesService.The_best_employee();
  }


}
