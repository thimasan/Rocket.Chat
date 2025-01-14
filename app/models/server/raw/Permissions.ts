import { BaseRaw } from './BaseRaw';
import { IPermission } from '../../../../definition/IPermission';

export class PermissionsRaw extends BaseRaw<IPermission> {
	async createOrUpdate(name: string, roles: string[]): Promise<IPermission['_id']> {
		const exists = await this.findOne<Pick<IPermission, '_id'>>({
			_id: name,
			roles,
		}, { fields: { _id: 1 } });

		if (exists) {
			return exists._id;
		}

		return this.update({ _id: name }, { $set: { roles } }, { upsert: true }).then((result) => result.result._id);
	}

	async create(id: string, roles: string[]): Promise<IPermission['_id']> {
		const exists = await this.findOneById<Pick<IPermission, '_id'>>(id, { fields: { _id: 1 } });

		if (exists) {
			return exists._id;
		}

		return this.update({ _id: id }, { $set: { roles } }, { upsert: true }).then((result) => result.result._id);
	}


	async addRole(permission: string, role: string): Promise<void> {
		await this.update({ _id: permission, roles: { $ne: role } }, { $addToSet: { roles: role } });
	}

	async removeRole(permission: string, role: string): Promise<void> {
		await this.update({ _id: permission, roles: role }, { $pull: { roles: role } });
	}
}
