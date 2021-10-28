import path from "path";
import { Connection, createConnections, getConnection, getMongoRepository } from "typeorm";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";
import Group from "./entities/data_db/group.entity";
import User from "./entities/data_db/user.entity";
import WeekSchedule from "./entities/schedule_db/schedule.entity";

const connectionOptions: MongoConnectionOptions = {
    type: 'mongodb',
    url:process.env.DB_URL,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

export function connectDatabase(): Promise<Connection[]> {
    return createConnections([
        { 
            ...connectionOptions,
            name: 'data',
            database: 'data',
            entities: [path.join(__dirname, 'entities/data_db/*.ts')]
        },
        { 
            ...connectionOptions,
            name: 'schedule',
            database: 'schedule',
            entities: [path.join(__dirname, 'entities/schedule_db/*.ts')]
        }
    ]);
}

export const db = {
    UserRepository: () => getMongoRepository(User, 'data'),
    GroupRepository: () => getMongoRepository(Group, 'data'),
    ScheduleRepository: (collectionName: string) => {
        const rep = getMongoRepository(WeekSchedule, 'schedule');
        rep.metadata.tableName = collectionName;
        return rep;
    },
};


// If the Node process ends, close the database connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

function gracefulExit() {
    Promise.all([
        getConnection('data').close(),
        getConnection('schedule').close()
    ]).then(() => {
        console.log('Database connection was closed before app termination');
        process.exit(0);
    });
}