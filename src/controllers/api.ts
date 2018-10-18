import { Router, Request, Response } from 'express';

export default class Api {
	public body: {};
	public params: {};
	public query: string;

	public req: Request;
	public res: Response;

	public router: Router;


	public getRouterRunner(req: Request, res: Response) {
		this.body = req.body;
		this.params = req.params;
		this.query = req.query;

		this.req = req;
		this.res = res;

		return () => this.router(this.req, this.res);
	}
}
