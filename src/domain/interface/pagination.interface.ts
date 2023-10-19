import { EntityTarget, Repository, SelectQueryBuilder } from 'typeorm';

export interface Pagination<T> {
  items: T[];
  totalItems: number;
  pageCount: number;
  itemsPerPage: number;
  currentPage : number
}

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number,
  itemsPerPage: number,
): Promise<Pagination<T>> {
  const totalItems = await queryBuilder.getCount();
  const items = await queryBuilder
    .skip((page - 1) * itemsPerPage)
    .take(itemsPerPage)
    .getMany();

  const pageCount = Math.ceil(totalItems / itemsPerPage);
  


  return {
    items,
    totalItems,
    pageCount,
    itemsPerPage,
    currentPage : page
  };
}