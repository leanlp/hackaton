import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException, HttpStatus,
} from "@nestjs/common";
require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(process.env.APIkeypinata, process.env.APISecret);
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { Product } from "./product.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import path from "path";





@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file, @Body() createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productsService.createProduct(createProductDto, file);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'There was a problem with product creation, maybe the data sent is not as expected.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
