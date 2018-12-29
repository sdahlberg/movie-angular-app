import {Pageable} from './pageable';
import {Sort} from './sort';

export interface Page<T> {
  content: T[];
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
}
