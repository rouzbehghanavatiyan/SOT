import { ISettingRepository } from '../../../IRepositories/ISettingRepositories';
import { AllSettingType } from '../type/AllSettingType';

export class GetAllSettingQuery {
    constructor(private testRepository: ISettingRepository) { }
    async execute(id: string): Promise<AllSettingType | null> {
        const test = await this.testRepository.findById(id);
        if (!test) return null;
        return {
            id: test.id,
            profile: test.profile,
            private: test.private,
            comments: test.comments,
            learn: test.learn,
            help: test.help,
            support: test.support,
            logout: test.logout,
        };
    }
}
