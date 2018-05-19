/**
 * Created by nnnyy on 2016-05-11.
 */
var express = require('express');
var router = express.Router();
var dbpool = require('../dbpool');

/* GET users listing. */
router.get('/', function(req, res, next) {

    console.log(req.session.user_name);

    if( !req.session.user_name || req.session.user_name == '') {
        res.render('./admin/adminpage', { user_name: "" });
        console.log("Session Not!");
        return;
    }

    var today = new Date();
    var year = req.query['year'] || today.getFullYear();
    var mon =  Number(req.query['mon']) + 1 || today.getMonth() + 1; // ZeroBased;
    var cur_date = new Date( year + "-" + mon + "-01");
    var next_date = new Date(cur_date); next_date.setMonth(next_date.getMonth()+1);

    dbpool.query("select DATE_FORMAT(reserv_date, '%Y-%m-%dT%TZ') as reserv_date,room,name,sn,tel from tb_reserv where reserv_date >= '"+cur_date.yyyymmdd()+"' and reserv_date < '"+next_date.yyyymmdd()+"'", function(err, rows, fields) {
        if(err) throw err;
        var send_data = new Array();

        for(ix = 0 ; ix < rows.length ; ++ix) {
            var dat = new Date(rows[ix].reserv_date);

            if(send_data[dat.getDate()] == null ) { send_data[dat.getDate()] = {room: []} }
            send_data[dat.getDate()].room.push( { room_num: rows[ix].room, sn: rows[ix].sn, name: rows[ix].name, tel: rows[ix].tel } );
        }

        var reserv_data_for_argument = [];

        var j = 0;
        for(i = 0 ; i < send_data.length ; ++i) {
            if( send_data[i] != null ) {
                reserv_data_for_argument.push({
                    day: i,
                    reserv_room: send_data[i].room
                });
            }
        }

        console.log(reserv_data_for_argument);

        res.render('./admin/adminpage', { mon: mon, year: year, reserv_info: { "reserv_data" : reserv_data_for_argument }, user_name: req.session.user_name });
        //res.render('reserv', { mon: req.param('mon'), year: req.param('year'), reserv_info: { "reserv_data" : reserv_data_for_argument } });
    })
});

module.exports = router;