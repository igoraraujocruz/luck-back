//AutenticacaoQUALQUERCOISAService.ts

import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { User } from '../infra/Entity';
import { sign } from 'jsonwebtoken'
import authConfig from '../../../config/auth';


interface RequestDTO {
	username: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

export class Auth {
	public async execute({ username, password }: RequestDTO): Promise<Response> {
		const usersRepository = getRepository(User);
		
		const user = await usersRepository.findOne({
			where: { username }
		});

		if (!user) {
			throw new Error('O username/ou senha estão incorretos.');
		};

		const passwordMatched = await compare(password, user.password);
		
		if (!passwordMatched) {
			throw new Error('O username/ou senha estão incorretos.');
		};

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn: expiresIn,
		})

		return {
			user,
			token,
		};
	}
}