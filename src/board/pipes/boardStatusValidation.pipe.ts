import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
    readonly statusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase();

        if (!this.isStatusValue(value)) {
            throw new BadRequestException(
                `${value} isn't in the status options.`,
            );
        }

        return value;
    }

    isStatusValue(value: any) {
        const index = this.statusOptions.indexOf(value);
        return index !== -1;
    }
}
