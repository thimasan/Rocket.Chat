export class Deferred<T> implements PromiseLike<T> {
	private p: Promise<T>;

	resolve: (value: T) => void;

	reject: (reason?: any) => void;

	constructor() {
		this.p = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}

	then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2> {
		return this.p.then(onfulfilled, onrejected);
	}
}
