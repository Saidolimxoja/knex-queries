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
}
