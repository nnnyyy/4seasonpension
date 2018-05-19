function setStyle(id,style,value)
{
    id.style[style] = value;
}

function opacity(el,opacity)
{
    setStyle(el,"filter:","alpha(opacity="+opacity+")");
    setStyle(el,"-moz-opacity",opacity/100);
    setStyle(el,"-khtml-opacity",opacity/100);
    setStyle(el,"opacity",opacity/100);
}
function calendar(mon,year,_reserv_)
{
    var date = new Date(year,mon-1,1,0,0,0,0);
    var next_date = new Date(date);
    next_date.setMonth(next_date.getMonth()+1);
    var next_date_query = "/reserv?mon=" + next_date.getMonth() + "&year=" + (next_date.getYear()+1900);
    var prev_date = new Date(date);
    prev_date.setMonth(prev_date.getMonth()-1);
    var prev_date_query = "/reserv?mon=" + prev_date.getMonth() + "&year=" + (prev_date.getYear()+1900);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getYear();
    if(year<=200)
    {
        year += 1900;
    }
    months = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
    days_in_month = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    if(year%4 == 0 && year!=1900)
    {
        days_in_month[1]=29;
    }
    total = days_in_month[month];

    var reserv_data = new Array(total);
    for(i = 0 ; i < total ; ++i){
        reserv_data[i] = null;
    }

    for(i = 0 ; i < _reserv_.reserv_data.length ; ++i) {
        reserv_data[_reserv_.reserv_data[i].day] = _reserv_.reserv_data[i];
    }

    var room_name = new Array("행복","기쁨","환희");

    var date_today = year+'년'+months[month]+'월 ';
    beg_j = date;
    beg_j.setDate(1);
    if(beg_j.getDate()==2)
    {
        beg_j=setDate(0);
    }
    beg_j = beg_j.getDay();
    document.write('<table class="cal_calendar" onload="opacity(document.getElementById(\'cal_body\'),20);"><tbody id="cal_body"><tr height="60px"><th><a href="'+prev_date_query+'"><img src="/images/btn_move_left.png"/> </a></th><th colspan="5">'+date_today+'</th><th><a href="'+next_date_query+'"><img src="/images/btn_move_right.png"/></a></th></tr>');
    document.write('<tr class="cal_d_weeks"><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr>');
    week = 0;
    if(beg_j > 0){
        document.write('<tr class="cal_d_row">');
    }
    for(i=1;i<=beg_j;i++)
    {
        document.write('<td class="cal_days_bef_aft">'+(days_in_month[month-1]-beg_j+i)+'</td>');
        week++;
    }
    var reserv_check = new Array(3);
    for(i=1;i<=total;i++)
    {
        if(week==0)
        {
            document.write('<tr class="cal_d_row">');
        }

        var addStr = "<br/>";
        if(reserv_data[i] != null){
            for( ri = 0 ; ri < reserv_check.length ; ++ri){ reserv_check[ri] = 0; }
            for( rj = 0 ; rj < reserv_data[i].reserv_room.length ; ++rj){
                reserv_check[ reserv_data[i].reserv_room[rj] -1 ] = 1;
            }

            for(j = 0 ; j < room_name.length ; ++j) {
                if(reserv_check[j] == 1){
                    addStr += (room_name[j] + '<strong style="color:red;"> 예약완료</strong><br/>');
                }
                else{
                    addStr += (room_name[j] + '<strong> 예약가능</strong><br/>');
                }
            }
        }
        else {
            for(j = 0 ; j < room_name.length ; ++j) {
                addStr += (room_name[j] + '<strong> 예약가능</strong><br/>');
            }
        }

        if(day==i)
        {
            document.write('<td>'+i+addStr+'</td>');
        }
        else
        {
            document.write('<td>'+i+addStr+'</td>');
        }
        week++;
        if(week==7)
        {
            document.write('</tr>');
            week=0;
        }
    }
    for(i=1;week!=0;i++)
    {
        document.write('<td class="cal_days_bef_aft">'+i+'</td>');
        week++;
        if(week==7)
        {
            document.write('</tr>');
            week=0;
        }
    }
    document.write('</tbody></table>');
    opacity(document.getElementById('cal_body'),70);
    return true;
}