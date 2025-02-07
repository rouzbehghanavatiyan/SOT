import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { ISettingInteractor } from '../../Core/Application/interfaces/ISettingInteractor';

export class SettingController {
    private interactore: ISettingInteractor;
    constructor(interactore: ISettingInteractor) {
        this.interactore = interactore
    }

    async createSettingController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body = req.body
            const data = this.interactore.createSetting(body)
            // const dbResult = await GetAllSettingQuery();
            // const groupMentions = await postGroupMentionsService({
            //     groupName,
            //     mentionMmr,
            //     userId,
            //     groupId: group.id,
            // });
            res.status(StatusCodes.CREATED).json({ data: data, code: 0 });
            // }
            //   );

        } catch (error) {

        }
    };

}