module.exports = (app) => {
    const ocurrence = require('../controllers/occurrenceSensorController.js');
    const object = require('../controllers/objectSensorController.js');

    // Occurrence
    app.get('/api/ocurrences', ocurrence.findAll);
    app.get('/api//ocurrence/:ocurrenceId', ocurrence.findOne);
    app.get('/api/lastOcurrences', ocurrence.findLastOnes);
    app.post('/api/ocurrence', ocurrence.create);

    // Object
    app.get('/api/object', object.findAll);
    app.get('/api/object/:objectId', object.findOne);
    app.get('/api/lastObjects', object.findLastOnes);

}