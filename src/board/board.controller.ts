import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatusValidationPipe } from './pipes/boardStatusValidation.pipe';
import { DeleteResult } from 'typeorm';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    findAllBoards(): Promise<Board[]> {
        return this.boardService.findAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    findBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardService.findBoardById(id);
    }

    @Delete('/:id')
    deleteBoardById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<DeleteResult> {
        return this.boardService.deleteBoardById(id);
    }

    @Patch('/:id/status')
    updateBoardStatusById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardService.updateBoardStatusById(id, status);
    }
}
