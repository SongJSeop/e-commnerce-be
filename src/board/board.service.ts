import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatus } from './board-status.enum';
import { BoardRepository } from './board.repository';
import { DeleteResult, SelectQueryBuilder } from 'typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: BoardRepository,
    ) {}

    async findAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async findBoardsByUser(user: User): Promise<Board[]> {
        const query: SelectQueryBuilder<Board> =
            this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });

        const boards = await query.getMany();
        return boards;
    }

    async findBoardById(id: number): Promise<Board> {
        const found: Board = await this.boardRepository.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`Can't Find Board With id ${id}`);
        }

        return found;
    }

    async createBoard(
        createBoardDto: CreateBoardDto,
        user: User,
    ): Promise<Board> {
        const { title, description }: CreateBoardDto = createBoardDto;
        const board: Board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user,
        });
        await this.boardRepository.save(board);
        return board;
    }

    async deleteBoardById(id: number, user: User): Promise<DeleteResult> {
        const result: DeleteResult = await this.boardRepository.delete({
            id,
            user: { id: user.id },
        });

        if (result.affected === 0) {
            throw new NotFoundException(`Can't Find Board With id ${id}`);
        }

        return result;
    }

    async updateBoardStatusById(
        id: number,
        status: BoardStatus,
    ): Promise<Board> {
        const foundBoard: Board = await this.findBoardById(id);
        foundBoard['status'] = status;
        return foundBoard;
    }
}
