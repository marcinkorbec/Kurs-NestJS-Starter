import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CacheEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    key: string;

    @Column('json')
    value: any;

    @Column()
    controllerName: string;

    @Column()
    actionName: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
