import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatus } from './board-status.enum';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: BoardRepository,
    ) {}

    async findAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;
        const board = this.boardRepository.create({ title, description });
        await this.boardRepository.save(board);
        return board;
    }

    async findBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({ where: { id } });

        if (!found) {
            throw new NotFoundException(`Can't Find Board With id ${id}`);
        }

        return found;
    }

    async deleteBoardById(id: number): Promise<void> {
        await this.boardRepository.delete(id);
    }

    async updateBoardStatusById(
        id: number,
        status: BoardStatus,
    ): Promise<Board> {
        const foundBoard = await this.findBoardById(id);
        foundBoard['status'] = status;
        return foundBoard;
    }
}
