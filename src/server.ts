import express, { Express, Router } from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

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

	public config() {
		this.app.use(bodyParser.json());
		// not perfect, i know. use 'path' package
		fs.readdirSync(`${__dirname}/${this.ctrlPath}`)
			// change to _.endsWith()
			.filter((file) => file.includes('.controller.js'))
			.forEach((file) => {
				const Controller = require(`./${this.ctrlPath}/${file}`).default;
				const ctrl = new Controller();
				this.app.use(Controller.path, (req, res) => {
					const routerRunner = ctrl.getRouterRunner(req, res);
					routerRunner();
				});
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

	public async start(): Promise<Express> {
		this.config();
		await this.run();

		return this.app;
	}
}
