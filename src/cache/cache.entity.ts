import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class CacheItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('json')
    dataJson: any;

    @Column()
    controllerName: string;

    @Column()
    actionName: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
