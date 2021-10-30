import { action } from '@storybook/addon-actions';
import { useLayoutEffect, useRef } from 'react';

import { APIClient } from '../../app/utils/client';
import { Serialized } from '../../definition/Serialized';
import { Params, PathFor, Return } from '../../definition/rest';

export const useRestApiGet = <P extends PathFor<'GET'>>(
	matchEndpoint: P,
	fn: (params: Serialized<Params<'GET', P>[0]>) => Promise<Serialized<Return<'GET', P>>>,
): void => {
	const fnRef = useRef(fn);
	fnRef.current = fn;

	useLayoutEffect(() => {
		const { get } = APIClient;

		APIClient.get = <P, R = any>(
			endpoint: string,
			params?: Serialized<P> | undefined,
		): Promise<Serialized<R>> => {
			if (endpoint === matchEndpoint) {
				const fn = fnRef.current;
				if (!params) {
					throw new Error(`"${endpoint}" called without parameters`);
				}
				action('get')(endpoint, params);
				return fn(params) as Promise<Serialized<R>>;
			}

			return get(endpoint, params);
		};

		return (): void => {
			APIClient.get = get;
		};
	}, [matchEndpoint]);
};
