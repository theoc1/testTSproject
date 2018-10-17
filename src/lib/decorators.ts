import {Router} from "express";


export const Get = (path: string) => {
	return (target, key, descriptor) => {
		if (!target.router) target.router = Router();

		target.router.get(path, async(req, res) => {
			try {
				console.log(req.params);
				const result = await descriptor.value(req.params.id);
				res.send(result);
			} catch(error) {
				res.send(error);
			}
		})
	}
}
