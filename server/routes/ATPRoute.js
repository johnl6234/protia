var express = require('express');
var router = express.Router();

// TSS = Training Stress Score
// Fitness (CTL) is a rolling 42 day average of your daily TSS.
// Fatigue (ATL) is a 7 day average of your TSS that accounts for the workouts you have done recently.
// Form (TSB) is the balance of TSS equal to yesterday's fitness minus yesterday's fatigue.

router.get('/', (req, res, next) => {
	// TODO
	console.log('REQ Body', req.body.id);
});

module.exports = router;
