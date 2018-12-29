import {Sort} from './sort';

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
}
