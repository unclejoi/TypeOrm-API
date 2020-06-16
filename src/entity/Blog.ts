import { Entity,PrimaryGeneratedColumn, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { MaxLength } from "class-validator";

@Entity()
export class Blog {
    @ObjectIdColumn()
    id: ObjectID

    @MaxLength(10)
    @Column()
    title: string;

    @MaxLength(20)
    @Column()
    description: string;

    @Column()
    datePosted: Date;

}