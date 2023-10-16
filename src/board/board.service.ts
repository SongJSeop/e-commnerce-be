import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    async insertBoard(title: string, description: string): Promise<Board> {
        const board = this.boardRepository.create({ title, description });
        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({ where: { id } });

        if (!found) {
            throw new NotFoundException(`Can't Find Board With id ${id}`);
        }

        return found;
    }

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }
    //
    // createBoard(createBoardDto: CreateBoardDto): Board {
    //     const { title, description } = createBoardDto;
    //     const newBoard: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     };
    //
    //     this.boards.push(newBoard);
    //     return newBoard;
    // }
    //
    // findBoardById(id: string): Board {
    //     const foundBoard = this.boards.find((board) => board.id === id);
    //
    //     if (!foundBoard) {
    //         throw new NotFoundException(`Can't Find Board With id ${id}`);
    //     }
    //
    //     return foundBoard;
    // }
    //
    // deleteBoardById(id: string): void {
    //     const foundBoard = this.findBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
    // }
    //
    // updateBoardStatusById(id: string, status: BoardStatus): Board {
    //     const foundBoard = this.findBoardById(id);
    //     foundBoard.status = status;
    //     return foundBoard;
    // }
}
