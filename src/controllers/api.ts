import { Router, Request, Response } from 'express';

export default class Api {
	private request: Request;
	private response: Response;

	public body: {};
	public params: {};
	public query: string;

	constructor(req: Request, res: Response) {
		this.request = req;
		this.response = res;

		this.body = req.body;
		this.params = req.params;
		this.query = req.query;
	}
}
