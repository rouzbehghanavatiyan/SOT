export interface ISettingInteractor {
    createSetting(input: any);
    updateSetting(id: string, data: any);
    getSetting(limit:number , offset:number)
}