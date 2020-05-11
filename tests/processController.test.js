const processController = require('../controllers/process');
const MongoUtils = require('../utils/mongoUtils');

describe('Process Controller', () => {
    it('Create Process', async () => {
        let mongoUtils = MongoUtils();
        await mongoUtils.connect();
        let promise = () =>
            new Promise((resolve, reject) =>
                processController.createProcess(
                    'testsUser1',
                    'testController1',
                    1,
                    resolve,
                    reject,
                    mongoUtils
                )
            );
        let result = await promise();
        expect(result).toStrictEqual('El proceso se creo correctamente');
        mongoUtils.emptyCollection();
        console.log('result', result);
    });

    it('Get Active Process', async () => {
        let mongoUtils = MongoUtils();
        await mongoUtils.connect();
        let promise = () =>
            new Promise((resolve, reject) =>
                processController.createProcess(
                    'testsUser2',
                    'testController2',
                    1,
                    resolve,
                    reject,
                    mongoUtils
                )
            );
        await promise();
        let promise2 = () =>
            new Promise((resolve, reject) =>
                processController.getActiveProcesses(
                    'testsUser2',
                    resolve,
                    reject,
                    mongoUtils
                )
            );
        let result = await promise2();
        expect(result.length).toStrictEqual(1);
        mongoUtils.emptyCollection();
        console.log('result', result);
    });
});
