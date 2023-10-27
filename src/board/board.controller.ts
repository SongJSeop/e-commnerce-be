import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatusValidationPipe } from './pipes/boardStatusValidation.pipe';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    findAllBoards(): Promise<Board[]> {
        return this.boardService.findAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User,
    ): Promise<Board> {
        return this.boardService.createBoard(createBoardDto, user);
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
