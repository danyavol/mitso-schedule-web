export interface UserFromApi {
    id: number,
    createdAt: Date,
    lastUseAt: Date,
    username: string,
    firstName: string,
    lastName: string,
    isBot: boolean,
    language: string,
    dayScheduleTime: DatScheduleNotice[],
    myGroup?: {
        group: string, 
        url: string,
    },
    balance?: {
        number: number, 
        balance?: number, 
        dolg?: number, 
        penia?: number
    },
    notifications?: {
        scheduleChange?: boolean, 
        daySchedule?: boolean, 
        balanceChange?: boolean
    }
}

export interface DatScheduleNotice {
    time: TimeTypes,
    hours: number,
    minutes: number,
}

export enum TimeTypes {
    Relative = 'relative',
    Exactly = 'exactly'
}

export type GroupedGroupsFromApi = {
    label: string,
    items: GroupFromApi[]
}[];

export interface GroupFromApi {
    group: string,
    url: string
}