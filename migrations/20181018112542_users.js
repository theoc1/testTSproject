
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('users', (table) => {
  		table.increments('id').primary();
  		table.string('first_name').notNullable();
  		table.string('last_name').notNullable();
  		table.string('email').notNullable().unique();
  		// table.timestamps();
	  }),
  ]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('users'),
	]);
};
