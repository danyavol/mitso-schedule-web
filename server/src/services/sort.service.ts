export enum SortDirection {
    Desc = 'desc',
    Asc = 'asc'
}

export function sortData<T>(data: T[], sortField: string, sortDirection: SortDirection = SortDirection.Asc ): void {
    // Invalid sort options
    if (typeof sortField !== 'string' || !Object.values(SortDirection).includes(sortDirection)) return;
    
    // Possibility to sort nested fields, e.g. "myGroup.group"
    const namesChain = sortField.split('.');

    data.sort((a, b) => {
        const fieldA = getField(a, namesChain);
        const fieldB = getField(b, namesChain);
        return sortFields(fieldA, fieldB, sortDirection);
    });
}

function getField<T>(data: T, namesChain: string[]): any {
    let field = data;
    for (let name of namesChain) {
        if (field[name] == null) return null;
        field = field[name];
    }
    return field;
}

function sortFields(fieldA: unknown, fieldB: unknown, direction: SortDirection): number {
    if (fieldA == null) return 1;
    if (fieldB == null) return -1;
    if (typeof fieldA !== typeof fieldB) return 0;

    if (direction === SortDirection.Asc) {

        if (typeof fieldA === 'number') {
            return (fieldA as number) - (fieldB as number);
        } 
        else if (typeof fieldA === 'string') {
            return (fieldA as string) > (fieldB as string) ? 1 : -1;
        } 
        else if (fieldA instanceof Date) {
            return (fieldA as Date).getTime() - (fieldB as Date).getTime();
        }
           
    } else if (direction === SortDirection.Desc) {

        if (typeof fieldA === 'number') {
            return (fieldB as number) - (fieldA as number);
        } 
        else if (typeof fieldA === 'string') {
            return (fieldB as string) > (fieldA as string) ? 1 : -1;
        } 
        else if (fieldA instanceof Date) {
            return (fieldB as Date).getTime() - (fieldA as Date).getTime();
        }

    }

    return 0;
}