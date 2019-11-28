const DB = require('../utility/db');
var db = new DB();

test('mysql select prepare', () => {
    expect(DB.prepare()).toBe('SELECT `*` FROM `users`');
<<<<<<< HEAD
    expect(DB.prepare(['id', 'name'], 'level', '`id` = 100')).toBe('SELECT `id`, `name` FROM `level` WHERE `id` = 100');
=======
    expect(DB.prepare(['id', 'name'], 'level', 100)).toBe('SELECT `id`, `name` FROM `level` WHERE `id` = 100');
>>>>>>> 993c0eaa04d4dcfe220a077da3d720296e7b3d98
});

test('mysql select test', (done) => {
    expect.assertions(1);
    return db.query('select 1+1').then(function(result) {
        expect(result[0]['1+1'] == 2).toEqual(true);
        done();
    }).catch((err) => setImmediate(() => { throw err }));
});

test('mysql admission level select test', () => {
    expect.assertions(1);
    var admission_levelid = {};
    var db = new DB();
    return db.getPromiseOfAdmissionLevel().then(function(data){
        for(var i = 0; i < data.length; i++){
            var name = data[i]['name'];
            var id = data[i]['id'];
            admission_levelid[name] = id;
        }
        console.log(33, admission_levelid);
        expect(admission_levelid['汉语本科一批']).toEqual(114);
    });
});

test('mysql provinces select test', () => {
    expect.assertions(1);
    var provinces = {};
    var db = new DB();
    return db.getPromiseOfProvinces().then(function(data){
        for(var i = 0; i < data.length; i++){
            var name = data[i]['chinese_name'];
            var id = data[i]['id'];
            provinces[name] = id;
        }
        console.log(44, provinces);
        expect(provinces['北京']).toEqual(3);
    });
test('should throw an error if result is not 2 [ASYNC/AWAIT]', async (done) => {
    try {
        var test = await db.asyncQuery('select 1+1');
        expect(typeof test).toBe('object');
        expect(test[0]['1+1']).toBe(2);
        done();
    } catch (error) {
        expect(error.message).toBe('User with id: 11 was not found.');
    }
});

// a demo for Lauren
test('should get the admission level map', async (done) => {
    try {
        var admissionLevelPromise = db.getPromiseOfAdmissionLevel();
        await db.handleGetPromiseOfAdmissionLevel(admissionLevelPromise);
        console.log(db.admissionLevelMap);
        expect(db.admissionLevelMap['自主招生线']).toBe(2);
        expect(db.admissionLevelMap['三批']).toBe(11);
        expect(db.admissionLevelMap['第三批']).toBe(60);
        expect(db.admissionLevelMap['二批B']).toBe(89);
        expect(db.admissionLevelMap['牛奶']).toBe(undefined);
        done();
    } catch (error) {
        console.error(error.message);
    }
});


afterAll(() => {
    db.dbClose();
});