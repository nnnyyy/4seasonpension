var express = require('express');
var router = express.Router();
var dbpool = require('../dbpool');

Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/traffic', function(req, res, next) {
  res.render('traffic', { title: 'Express' });
});

router.get('/tour', function(req, res, next) {
  res.render('tour', { info_num: 1 });
});

router.get('/tour/:num', function(req, res, next) {

  console.log("room number : " + req.params.num);

  res.render('tour', { info_num: req.params.num });
});

router.get('/rooms/:num', function(req, res, next) {

  console.log("room number : " + req.params.num);

  res.render('rooms', { room_num: req.params.num });
});

router.get('/reserv', function(req, res, next) {

  var today = new Date();
  var year = req.query['year'] || today.getFullYear();
  var mon =  Number(req.query['mon']) + 1 || today.getMonth() + 1; // ZeroBased;
  console.log(mon);

  var cur_date = new Date( year + "-" + mon + "-01");
  var next_date = new Date(cur_date); next_date.setMonth(next_date.getMonth()+1);
  console.log(cur_date.yyyymmdd());
  console.log(next_date.yyyymmdd());
  dbpool.query("select DATE_FORMAT(reserv_date, '%Y-%m-%dT%TZ') as reserv_date,room,name from tb_reserv where reserv_date >= '"+cur_date.yyyymmdd()+"' and reserv_date < '"+next_date.yyyymmdd()+"'", function(err, rows, fields) {
    if(err) throw err;

    var send_data = new Array();

    for(ix = 0 ; ix < rows.length ; ++ix) {
      var dat = new Date(rows[ix].reserv_date);

      if(send_data[dat.getDate()] == null ) { send_data[dat.getDate()] = {room: []} }
      send_data[dat.getDate()].room.push( rows[ix].room );
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

    res.render('reserv', { mon: mon, year: year, reserv_info: { "reserv_data" : reserv_data_for_argument } });
  })
});

module.exports = router;
