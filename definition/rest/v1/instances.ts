import type { IInstanceStatus } from '../../IInstanceStatus';

export type InstancesEndpoints = {
	'/v1/instances.get': {
		GET: (params: {}) => {
			instances: (IInstanceStatus & {
				address?: any;
				currentStatus?: any;
				instanceRecord?: any;
				broadcastAuth?: any;
			})[];
		};
	};
};
