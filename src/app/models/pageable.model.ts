export interface PageableModel<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: unknown;
  size: number;
  sort: unknown;
  totalElements: number;
  totalPages: number;
}
