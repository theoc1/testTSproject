import express, { Express, Router } from 'express';

import Api from './controllers/api';

export default class Server {
	public port: number;
	private ctrlPath: string;

	public app: Express;

	constructor(config: {
		port: number,
		ctrlPath: string,
	}) {
		this.port = config.port;
		this.ctrlPath = config.ctrlPath;

		this.app = express();
	};

	private config() {
		const Controller = require(`./${this.ctrlPath}/users.controller`).default;

		this.app.use('/', (req, res) => {
			const ctrl = new Controller(req, res);
			ctrl.router(req, res);
		});
	}

	private run(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.app.listen(this.port, (error: Error) => {
				if (error) reject();
				resolve();
			})
		})
	}

	public async start(): Promise<void> {
		this.config();
		await this.run();
	}
}
