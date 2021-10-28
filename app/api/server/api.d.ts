import { IUser } from '../../../definition/IUser';
import { MethodFor, Path, PathMatching, UrlParams } from '../../../definition/rest';

type Route<TBasePath extends string, P extends Path> =
	P extends `${ TBasePath }/${ infer U }`
		? U
		: never;

type Options = {
	authRequired?: boolean;
	permissionsRequired?: string[];
};

type ActionThis<P extends Path, TOptions> = {
	userId: TOptions extends { authRequired: true } ? string : undefined;
	user: TOptions extends { authRequired: true } ? IUser : undefined;
	urlParams: UrlParams<P>;
	queryParams: Record<string, string>;
	bodyParams: Record<string, unknown>;
	requestParams: () => Record<string, unknown>;
	getPaginationItems: () => { readonly offset: number; readonly count: number };
	parseJsonQuery: () => {
		sort: Record<string, unknown>;
		fields: Record<string, unknown>;
		query: Record<string, unknown>;
	};
};

type Action<P extends Path, TOptions> = (this: ActionThis<P, TOptions>) => unknown;

type Operation<P extends Path, TEndpointOptions> = Action<P, TEndpointOptions> | {
	action: Action<P, TEndpointOptions>;
};

type Operations<P extends Path, TOptions extends Options = {}> = {
	[M in MethodFor<P> as Lowercase<M>]: Operation<P, TOptions>;
};

type APIClass<TBasePath extends string = ''> = {
	addRoute<TPath extends string, P extends PathMatching<TBasePath, TPath>>(route: TPath, operations: Operations<P>): void;
	addRoute<TPath extends string, P extends PathMatching<TBasePath, TPath>>(routes: TPath[], operations: Operations<P>): void;
	addRoute<TPath extends string, P extends PathMatching<TBasePath, TPath>, TOptions extends Options>(route: TPath, options: TOptions, operations: Operations<P, TOptions>): void;
	addRoute<TPath extends string, P extends PathMatching<TBasePath, TPath>, TOptions extends Options>(routes: TPath[], options: TOptions, operations: Operations<P, TOptions>): void;
	success<T extends Record<string, unknown>>(result: T): { statusCode: 200; body: { success: true } & T };
	success<T>(result?: T): { statusCode: 200; body: T };
	failure<T extends Record<string, unknown>>(result: T): { statusCode: 400; body: { success: false } & T };
	failure<
		T,
		TErrorType extends string,
		TStack,
		TErrorDetails
	>(result?: T, errorType?: TErrorType, stack?: TStack, error?: { details: TErrorDetails }): {
		statusCode: 400;
		body: {
			success: false;
			error: T;
			stack: TStack;
			errorType?: TErrorType;
			details?: TErrorDetails;
		};
	};
	unauthorized<T>(msg?: T): {
		statusCode: 403;
		body: {
			success: false;
			error: T | 'unauthorized';
		};
	};
};

export declare const API: {
	v1: APIClass<'/v1'>;
	default: APIClass;
};

type APIRoute = {
	queryParams: Record<string, unknown>;
	bodyParams: Record<string, unknown>;
	requestParams(): Record<string, unknown>;
	getPaginationItems(): {
		offset: number;
		count: number;
	};
};
