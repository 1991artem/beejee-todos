export type GetAllQueryParams = {
  pagination?: {
    limit: number,
    offset: number,
  },
  sort?: {
    field: string;
  },
};
