export type GroupedGroupsFromApi = {
    label: string,
    items: GroupFromApi[]
}[];

export interface GroupFromApi {
    group: string,
    url: string
}