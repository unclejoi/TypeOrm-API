import {Entity,PrimaryGeneratedColumn, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
