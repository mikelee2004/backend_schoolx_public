import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async create(
    dto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<ProductEntity> {
    return this.repository.save({
      image: image.filename,
      title: dto.title,
      text: dto.text,
    });
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateProductDto, image: Express.Multer.File) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.text) {
      toUpdate.text = dto.text;
    }
    if (dto.title) {
      toUpdate.title = dto.title;
    }
    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/promo/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.image = image.filename;
    }
    return this.repository.save(toUpdate);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}