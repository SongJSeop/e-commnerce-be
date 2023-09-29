import { Controller, Get } from "@nestjs/common";
import { ItemService } from "./item.service";

@Controller('item')
export class ItemController {

  constructor(private itemService: ItemService) {}

  @Get()
  getAllItems() {
    return this.itemService.getAllItems();
  }
}
