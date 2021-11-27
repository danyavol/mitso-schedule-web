export type RegistrationChartData = [number, number][];

export interface CoursesChartData {
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    total: number
}

export interface FeaturesUsageData {
    withBalance: FeatureData,
    balanceChange: FeatureData,
    scheduleChange: FeatureData,
    sendDaySchedule: FeatureData,
}

export interface FeatureData {
    value: number,
    percentage: number
}

export interface NewUsersData {
    month: number,
    week: number,
    day: number
}