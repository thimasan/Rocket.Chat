import type { ILivechatBusinessHour } from '../../ILivechatBusinessHour';
import type { ILivechatDepartment } from '../../ILivechatDepartment';
import type { ILivechatMonitor } from '../../ILivechatMonitor';
import type { ILivechatTag } from '../../ILivechatTag';
import type { IOmnichannelCannedResponse } from '../../IOmnichannelCannedResponse';
import type { IOmnichannelRoom, IRoom } from '../../IRoom';
import type { ISetting } from '../../ISetting';
import type { IUser } from '../../IUser';

export type OmnichannelEndpoints = {
	'livechat/appearance': {
		GET: () => {
			appearance: ISetting[];
		};
	};
	'livechat/visitors.info': {
		GET: (params: { visitorId: string }) => {
			visitor: {
				visitorEmails: Array<{
					address: string;
				}>;
			};
		};
	};
	'livechat/room.onHold': {
		POST: (params: { roomId: IRoom['_id'] }) => void;
	};
	'livechat/monitors.list': {
		GET: (params: { text: string; offset: number; count: number }) => {
			monitors: ILivechatMonitor[];
			total: number;
		};
	};
	'livechat/tags.list': {
		GET: (params: { text: string; offset: number; count: number }) => {
			tags: ILivechatTag[];
			total: number;
		};
	};
	'livechat/department': {
		GET: (params: {
			text: string;
			offset?: number;
			count?: number;
			sort?: string;
			onlyMyDepartments?: boolean;
		}) => {
			departments: ILivechatDepartment[];
			total: number;
		};
	};
	'livechat/department/:_id': {
		GET: () => {
			department: ILivechatDepartment;
		};
	};
	'livechat/departments.by-unit/': {
		GET: (params: { text: string; offset: number; count: number }) => {
			departments: ILivechatDepartment[];
			total: number;
		};
	};
	'livechat/custom-fields': {
		GET: () => {
			customFields: [
				{
					_id: string;
					label: string;
				},
			];
		};
	};
	'livechat/rooms': {
		GET: (params: {
			guest: string;
			fname: string;
			servedBy: string[];
			status: string;
			department: string;
			from: string;
			to: string;
			customFields: any;
			current: number;
			itemsPerPage: number;
			tags: string[];
		}) => {
			rooms: IOmnichannelRoom[];
			count: number;
			offset: number;
			total: number;
		};
	};
	'livechat/users/agent': {
		GET: (params: { text?: string; offset?: number; count?: number; sort?: string }) => {
			users: {
				_id: string;
				emails: {
					address: string;
					verified: boolean;
				}[];
				status: string;
				name: string;
				username: string;
				statusLivechat: string;
				livechat: {
					maxNumberSimultaneousChat: number;
				};
			}[];
			count: number;
			offset: number;
			total: number;
		};
	};
	'/v1/livechat/business-hours.list': {
		GET: (params: {
			name?: string;
			offset: number;
			count: number;
			sort: Record<string, unknown>;
		}) => {
			businessHours: ILivechatBusinessHour[];
			count: number;
			offset: number;
			total: number;
		};
	};
	'canned-responses': {
		GET: (params: {
			shortcut?: string;
			text?: string;
			scope?: string;
			createdBy?: IUser['username'];
			tags?: any;
			departmentId?: ILivechatDepartment['_id'];
			offset?: number;
			count?: number;
		}) => {
			cannedResponses: IOmnichannelCannedResponse[];
			count?: number;
			offset?: number;
			total: number;
		};
		POST: (params: {
			_id?: IOmnichannelCannedResponse['_id'];
			shortcut: string;
			text: string;
			scope: string;
			tags?: any;
			departmentId?: ILivechatDepartment['_id'];
		}) => void;
		DELETE: (params: { _id: IOmnichannelCannedResponse['_id'] }) => void;
	};
	'canned-responses/:_id': {
		GET: () => {
			cannedResponse: IOmnichannelCannedResponse;
		};
	};
};
