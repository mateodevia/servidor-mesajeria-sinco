const MongoUtils = require('../utils/mongoUtils');

describe('Mongo', () => {
    it('Create Process', async () => {
        let mongoUtils = MongoUtils();
        await mongoUtils.connect();
        let result = await mongoUtils.createProcess('testsUser', 'test', 1);
        let update = { ...result };
        update.exitosos = 1;
        update.activo = false;
        mongoUtils.updateProcess(update);
        delete result._id;
        mongoUtils.closeConection();
        expect(result).toStrictEqual({
            cliente: 'testsUser',
            activo: true,
            tipo: 'test',
            cantidad: 1,
            exitosos: 0,
            fallidos: 0,
        });
        return '';
    });
    it('Update Process', async () => {
        let mongoUtils = MongoUtils();
        await mongoUtils.connect();
        let result = await mongoUtils.createProcess('testsUser', 'test', 1);
        let update = { ...result };
        update.exitosos = 1;
        update.activo = false;
        let response = await mongoUtils.updateProcess(update);
        mongoUtils.closeConection();
        expect(response).toStrictEqual('OK');
        return '';
    });
    it('Get Active Processes By Type', async () => {
        let mongoUtils = MongoUtils();
        await mongoUtils.connect();
        let result = await mongoUtils.createProcess('testsUser', 'test', 1);
        let activeProcesses = await mongoUtils.getActiveProcessesByType('test');
        let update = { ...result };
        update.exitosos = 1;
        update.activo = false;
        mongoUtils.updateProcess(update);
        mongoUtils.closeConection();
        expect(activeProcesses.length).toStrictEqual(1);
        return '';
    });
    it('Get Active Processes By Client', async () => {
        let mongoUtils = MongoUtils();
        await mongoUtils.connect();
        let result = await mongoUtils.createProcess('testsUser', 'test', 1);
        let activeProcesses = await mongoUtils.getActiveProcessesByClient(
            'testsUser'
        );
        let update = { ...result };
        update.exitosos = 1;
        update.activo = false;
        mongoUtils.updateProcess(update);
        mongoUtils.closeConection();
        expect(activeProcesses.length).toStrictEqual(1);
        return '';
    });
});
