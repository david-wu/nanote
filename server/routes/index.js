var express = require('express');
var router = express.Router();

router.delete('/address', [dummy]);
router.put('/address', [dummy]);
router.post('/address', [dummy]);


function dummy(req, res){
    setTimeout(function(){
        res.status(200).send({
            message: 'but why?'
        });
    }, 1000 + Math.round(Math.random()*500))
}

module.exports = router;