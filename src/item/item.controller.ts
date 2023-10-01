import { Controller, Get } from "@nestjs/common";
import { ItemService } from "./item.service";
import { Item } from "./item.model";

@Controller('item')
export class ItemController {

  constructor(private itemService: ItemService) {}

  @Get()
  getAllItems(): Item[] {
      return this.itemService.getAllItems();
  }

  @Post("/add")
  addItem(@Body() itemData) {
      return this.itemService.addItem(itemData);
  }
}
