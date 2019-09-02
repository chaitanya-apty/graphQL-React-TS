import { IRouterOptions } from 'types/fastify';
import { hashSync, compare } from 'bcryptjs';
import { } from 'fastify-jwt'
import User from '../../backend/models/Users';

const signupValidate = {
    schema: {
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: { type: 'string' },
                password: { type: 'string' }
            }
        }
    }
};

module.exports = function Route(instance, opts: IRouterOptions, done: (error?: Error) => void): void {
    instance.get('/ping', async (request, reply) => {
        reply.send('Hello Ping Works');
    });

    instance.post('/signup', signupValidate, async (request, reply) => {
        try {
            const existingUser = await User.findOne({ username: request.body.username });
            if (existingUser) { return reply.status(409).send({ message: 'Username Already Registered' }); }

            const pwd = await hashSync(request.body.password, 12);
            const userDetails = {
                username: request.body.username,
                password: pwd
            };
            const user = new User(userDetails as any);
            await user.save();

            reply.status(200).send('User Added Successfully!');
        } catch (e) {
            done(e);
        }
    });

    instance.post('/login', signupValidate, async (request, reply) => {
        try {
            const user = await User.findOne({ username: request.body.username });
            if (!user) { return reply.status(401).send({ message: 'User Not Found' }); }
            const validPassword = await compare(request.body.password, (user as any).password);

            if (!validPassword) { return reply.status(500).send({ message: 'Invalid Password' }); }
            const token = instance.jwt.sign({user}, { expiresIn: '1h' });

            reply.status(200).send({ message: 'Authenticated Successfully', token });
        } catch (err) {
            reply.status(401).send(err);
        }
    });

    done();
};
