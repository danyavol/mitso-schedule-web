import { Injectable } from "@angular/core";
import { UserFromApi } from "@modules/msw-admin/interfaces/users.interface";

export interface MappedUser {
    username: string,
    name: string,
    group: string,
    createdAt: Date,
    lastUseAt: Date,
    source: UserFromApi
}

@Injectable()
export class UsersTableMapService {
    
    public getMappedData(users: UserFromApi[]): MappedUser[] {
        return users.map(u => ({
            username: u.username,
            name: `${u.firstName || ''} ${u.lastName || ''}`,
            group: u.myGroup?.group,
            createdAt: u.createdAt,
            lastUseAt: u.lastUseAt,
            source: u
        }));
    }
}