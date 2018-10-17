import Api from './api';
import { Get } from '../lib/decorators';
import { Router, Request, Response } from 'express';

export default class UsersController extends Api {
	static path: string = '/users';

	constructor(req: Request, res: Response) {
		super(req, res);
	}


	@Get('/users/:id')
	private async getUserById(id: number) {
		return Promise.resolve({ id });
	}

	// @Post('/users')
	// async createUser(): Promise<any> {
	//
	// }
}
