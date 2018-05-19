/**
 * Created by nnnyy on 2016-05-11.
 */
var express = require('express');
var router = express.Router();
var dbpool = require('../dbpool');

/* GET users listing. */
router.post('/', function(req, res, next) {

    if(req.body.action == "cancel"){

        if(!req.session.user_name){
            res.send({result:false});
            return;
        }

        if(req.body.sn == 'undefined') {
            res.send({result:true});
            return;
        }

        dbpool.query("delete from tb_reserv where sn=" + req.body.sn, function(err, rows, fields) {

            console.log(err);
            if(err) throw err;

            console.log(rows);
            res.send({result:true});
        })
    }
    else if( req.body.action == "reserv") {
        if(!req.session.user_name){
            res.send({result:false});
            return;
        }
        var data = JSON.parse(req.body.data);
        console.log(data);

        var query = "insert into tb_reserv (reserv_date,room,name,tel) values ( '"+ data.reserv_date +"' ,"+ data.room_num +" , '"+ data.name +"' , '"+data.tel+"')";
        console.log(query);

        dbpool.query( query , function(err, rows, fields) {

            console.log(err);
            if(err) throw err;
            res.send({result:true});
        })
    }
    else if( req.body.action == 'login') {

        console.log("login password : " + req.body.pw);

        if(req.body.pw == '000217'){
            req.session.user_name = 'admin';
            res.send({result:true});
        }
        else{
            res.send({result:false});
        }
    }
});

module.exports = router;