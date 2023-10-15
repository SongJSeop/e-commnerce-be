import { Repository } from 'typeorm';
import { Board } from './board.model';

@Injectable()
export class BoardRepository extends Repository<Board> {}
