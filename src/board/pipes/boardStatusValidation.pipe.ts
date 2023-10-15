import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
    readonly statusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

    transform(value: any): any {
        value = value.toUpperCase();

        if (!this.isStatusValue(value)) {
            throw new BadRequestException(
                `${value} isn't in the status options.`,
            );
        }

        return value;
    }

    isStatusValue(status: any) {
        const index = this.statusOptions.indexOf(status);
        return index !== -1;
    }
}
