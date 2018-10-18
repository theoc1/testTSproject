import client from 'knex';

const knex = client({
	client: 'postgresql',
	connection: {
		database: 'ts_test',
		user:     'postgres',
		password: '',
		host: 'localhost',
	},
	pool: {
		min: 2,
		max: 10
	},
});

export default knex;
