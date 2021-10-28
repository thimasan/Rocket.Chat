import type { IRoom } from '../../IRoom';
import type { IRecordsWithTotal, ITeam } from '../../ITeam';
import type { IUser } from '../../IUser';

export type TeamsEndpoints = {
	'teams.addRooms': {
		POST: (params: { rooms: IRoom['_id'][]; teamId: string }) => void;
	};
	'teams.info': {
		GET: (params: { teamId: IRoom['teamId'] }) => { teamInfo: ITeam };
	};
	'teams.list': {
		GET: (params: {
			offset: number;
			count: number;
			sort: Record<string, unknown>;
			query: Record<string, unknown>;
		}) => {
			teams: ITeam[];
			total: number;
			offset: number;
			count: number;
		};
	};
	'teams.listRooms': {
		GET: (params: {
			teamId: ITeam['_id'];
			offset?: number;
			count?: number;
			filter: string;
			type: string;
		}) => Omit<IRecordsWithTotal<IRoom>, 'records'> & {
			rooms: IRecordsWithTotal<IRoom>['records'];
			offset: number;
			count: number;
		};
	};
	'teams.listRoomsOfUser': {
		GET: (params: {
			teamId: ITeam['_id'];
			teamName?: string;
			userId?: string;
			canUserDelete?: boolean;
			offset?: number;
			count?: number;
		}) => Omit<IRecordsWithTotal<IRoom>, 'records'> & {
			count: number;
			offset: number;
			rooms: IRecordsWithTotal<IRoom>['records'];
		};
	};
	'teams.listAll': {
		GET: (params: { offset: number; count: number }) => {
			teams: ITeam[];
			total: number;
			offset: number;
			count: number;
		};
	};
	'teams.create': {
		POST: (params: {
			name: ITeam['name'];
			type?: ITeam['type'];
			members?: IUser['_id'][];
			room: {
				id?: string;
				name?: IRoom['name'];
				members?: IUser['_id'][];
				readOnly?: boolean;
				extraData?: {
					teamId?: string;
					teamMain?: boolean;
				} & { [key: string]: string | boolean };
				options?: {
					nameValidationRegex?: string;
					creator: string;
					subscriptionExtra?: {
						open: boolean;
						ls: Date;
						prid: IRoom['_id'];
					};
				} & {
					[key: string]:
						| string
						| {
								open: boolean;
								ls: Date;
								prid: IRoom['_id'];
						  };
				};
			};
			owner?: IUser['_id'];
		}) => {
			team: ITeam;
		};
	};
	'teams.convertToChannel': {
		POST: (params: unknown) => unknown;
	};
	'teams.removeRoom': {
		POST: (params: unknown) => unknown;
	};
	'teams.updateRoom': {
		POST: (params: unknown) => unknown;
	};
	'teams.members': {
		GET: (params: unknown) => unknown;
	};
	'teams.addMembers': {
		POST: (params: unknown) => void;
	};
	'teams.updateMember': {
		POST: (params: unknown) => void;
	};
	'teams.removeMember': {
		POST: (params: unknown) => void;
	};
	'teams.leave': {
		POST: (params: unknown) => void;
	};
	'teams.delete': {
		POST: (params: unknown) => void;
	};
	'teams.autocomplete': {
		GET: (params: { name: string }) => {
			teams: ITeam[];
		};
	};
	'teams.update': {
		POST: (params: unknown) => void;
	};
};
