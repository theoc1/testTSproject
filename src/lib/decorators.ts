import { Router } from 'express';


export const Get = (path: string) => {
	return (target, key, descriptor) => {
		if (!target.router) target.router = Router();

		target.router.get(path, async(req, res) => {
			try {
				const result = await descriptor.value(req.params.id || null);
				res.send(result);
			} catch(error) {
				res.send(error);
			}
		})
	}
};

export const Post = (path: string) => {
	return (target, key, descriptor) => {
		if (!target.router) target.router = Router();

		target.router.post(path, async (req, res) => {
			try {
				const result = await descriptor.value(req.body);
				return res.send(result);
			} catch(error) {
				res.status(error.status);
				return res.send(error.message);
			}
		});
	}
};
