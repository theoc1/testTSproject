import Server from './server';

const server = new Server({
	port: 3000,
	ctrlPath: 'controllers',
});

server.start()
	.then(() => console.log(`Server started at port ${server.port}.`))
	.catch((error: Error) => console.warn(error));
