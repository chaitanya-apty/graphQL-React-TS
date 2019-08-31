import { FastifyServer, IRouterOptions } from 'types/fastify';
import authHook from '../hooks/auth.hook';

module.exports = function Route(instance: FastifyServer, opts: IRouterOptions, done: (error?: Error) => void): void {
    const EmployeeModel = instance['mongo'].models.Employee;

    authHook(instance);
    instance.get('/', async (request, reply) => {
        const data = await EmployeeModel.find();
        const responseData = data.map((dat) => ({
            name: dat.name,
            age: dat.age
        }));
        reply.send(responseData);
    });
    done();
};
