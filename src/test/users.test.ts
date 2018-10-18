import request from 'supertest';

import Server from '../server';
import knex from '../lib/db';

const server = new Server({
	port: 3000,
	ctrlPath: 'controllers',
});
server.config();
const app = server.app;

let id = 1;

const user = {
	email: 'test@email.com',
	first_name: 'Jane',
	last_name: 'Air',
};

describe('/users endpoints tests', async () => {
	test('POST /users', async () => {
		const result = await request(app)
			.post('/users')
			.send(user);

		expect(result.statusCode).toBe(200);
		expect(result.body).toHaveProperty('id');
		id = result.body.id;
	});

	test('GET /users/:id', async () => {
		const result = await request(app)
			.get(`/users/${id}`);

		expect(result.statusCode).toBe(200);
		expect(result.body.email).toBe(user.email);
	});

	afterAll(async () => {
		await knex.delete().from('users').where(user);
		knex.destroy();
	});
});
