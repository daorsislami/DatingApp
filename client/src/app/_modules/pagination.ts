export interface Pagination{
    
    // the variables needs to match exactly the information that we saw inside the response Header
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

// we can also use Generics inside TypeScript
export class PaginatedResult<T> {
    result: T; // T is gonna represent an array of members -> Members[]
    pagination: Pagination;
}