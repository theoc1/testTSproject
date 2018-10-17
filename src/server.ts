import * as express from 'express';

export default class Server {
	public port: number;
	private ctrlPath: string;

	public app: express.Express;

	constructor(config: {
		port: number,
		ctrlPath: string,
	}) {
		this.port = config.port;
		this.ctrlPath = config.ctrlPath;

		this.app = express();
	};

	private config() {

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
