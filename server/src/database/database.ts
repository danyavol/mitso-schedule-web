import mongoose from 'mongoose';
import { User, userSchema } from './schemas/user.schema';
import { Group, groupSchema } from './schemas/group.schema';
import { Schedule, scheduleSchema } from './schemas/schedule.schema';


export const data_conn = mongoose.createConnection(process.env.DB_URL, { dbName: "data" });
export const lookup_conn = mongoose.createConnection(process.env.DB_URL, { dbName: "lookup" });
export const schedule_conn = mongoose.createConnection(process.env.DB_URL, { dbName: "schedule" });

export const db = {
    User: data_conn.model<User>('User', userSchema, 'users'),
    Group: lookup_conn.model<Group>('Group', groupSchema, 'groups'),
    Schedule: (collectionName: string) => schedule_conn.model<Schedule>('Schedule', scheduleSchema, collectionName)
};


const allConnections = [data_conn, lookup_conn, schedule_conn];

allConnections.forEach(connection => {
    const dbName = connection['$dbName'];
    connection
        .on('open', console.info.bind(console, `Database '${dbName}' connection: open`))
        .on('close', console.info.bind(console, `Database '${dbName}' connection: close`))
        .on('reconnected', console.info.bind(console, `Database '${dbName}' connection: reconnected`))
});


// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

function gracefulExit() {
    let closedConnections = 0;
    allConnections.forEach(connection => {
        connection.close(() => {
            if (++closedConnections >= allConnections.length) process.exit(0);
        });
    });
}