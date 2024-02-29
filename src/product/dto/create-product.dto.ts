import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title = 'Mechelin Tire';

  @ApiProperty()
  @IsString()
  text = 'Engine Oil';
}