import prisma from "../../../Infrastructure/prismaClient";
import { ISettingInteractor } from "../interfaces/ISettingInteractor";

interface CreateUserInput {
  email: string;
  name?: string;
}

export class SettingInteractore implements ISettingInteractor {
  private repository: ISettingRepository;
  constructor(repository: ISettingRepository) {
    this.repository = repository
  }

  async createSetting(input: any) {
    return this.repository.create(input)
  }

  async updateSetting(id: string, data: string | number) {
    return this.repository.update(id, data)
  }

  async getSetting(limit: number, offset: number) {
    return this.repository.findById(limit, offset)
  }
};