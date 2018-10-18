import { Router, Request, Response } from 'express';

import Api from './api';
import { Get, Post } from '../lib/decorators';
import knex from '../lib/db';

export default class UsersController extends Api {
	// FIXME: we can use controller file name in server.ts
	static path: string = '/users';

	@Get('/:id')
	private async getUserById(id: number): Promise<object> {
		const user = await knex
			.select('*')
			.from('users')
			.where({ id });

		if (user.length === 0) return Promise.reject({ status: 404, message: 'User not found.' });

		return Promise.resolve(user[0]);
	}

	@Post('/')
	private async createUser(data: object): Promise<object> {
		let user;
		try {
			user = await knex
				.insert(data)
				.into('users')
				.returning('*');
		} catch(error) {
			return Promise.reject({ status: 500, message: error.message });
		}

		return Promise.resolve(user[0]);
	}
}
