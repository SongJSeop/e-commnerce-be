import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatusValidationPipe } from './pipes/boardStatusValidation.pipe';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    findBoardById(@Param('id') id: string): Board {
        return this.boardService.findBoardById(id);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id') id: string): void {
        this.boardService.deleteBoardById(id);
    }

    @Patch('/:id/status')
    updateBoardStatusById(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Board {
        return this.boardService.updateBoardStatusById(id, status);
    }
}
