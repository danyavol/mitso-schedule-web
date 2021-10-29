export interface PaginatedData<T> {
    items: T[],
    total: number
}

export function paginateData<T>(data: T[], _page: any, _itemsPerPage: any): PaginatedData<T> {
    const page = Number(_page);
    const itemsPerPage = Number(_itemsPerPage);

    if (isNaN(page) || isNaN(itemsPerPage)) return { items: data, total: data.length };

    const lastPage = Math.ceil(data.length / itemsPerPage) - 1;
    const offset = page * itemsPerPage;

    if (offset >= data.length) {
        // Invalid page, return last page data
        const startIndex = lastPage * itemsPerPage;
        return { items: data.slice(startIndex, startIndex + itemsPerPage), total: data.length };
    } else if (offset < 0) {
        // Invalid page, return first page data
        return { items: data.slice(0, itemsPerPage), total: data.length };
    }

    // Valid page
    return { items: data.slice(offset, offset + itemsPerPage), total: data.length };
}