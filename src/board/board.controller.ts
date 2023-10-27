import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
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
    logger = new Logger('Board');
    constructor(private boardService: BoardService) {}

    @Get()
    findAllBoards(): Promise<Board[]> {
        return this.boardService.findAllBoards();
    }

    @Get('/byuser')
    findBoardsByUser(@GetUser() user: User): Promise<Board[]> {
        this.logger.verbose(
            `유저 "${user.username}"가 본인의 모든 게시물을 조회합니다.`,
        );
        return this.boardService.findBoardsByUser(user);
    }

    @Get('/:id')
    findBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardService.findBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User,
    ): Promise<Board> {
        return this.boardService.createBoard(createBoardDto, user);
    }

    @Delete('/:id')
    deleteBoardById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<DeleteResult> {
        return this.boardService.deleteBoardById(id, user);
    }

    @Patch('/:id/status')
    updateBoardStatusById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardService.updateBoardStatusById(id, status);
    }
}
