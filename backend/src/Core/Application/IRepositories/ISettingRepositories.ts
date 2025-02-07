import { Setting } from '@prisma/client';

export interface ISettingRepository {
    create(data: Omit<Setting, 'id'>): Promise<Setting>;
    findById(limit: number, offset: number): Promise<number | null>;
    findAll(): Promise<Setting[]>;
    update(id: string, data: Partial<Setting>): Promise<Setting>;
    delete(id: string): Promise<void>;
}
