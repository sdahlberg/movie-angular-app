import {Order} from './order';

export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  orders: Order[];
}
