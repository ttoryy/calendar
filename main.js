
// 윤년 
function leapYear(year) {
  if (year % 400 == 0) {
    return true;
  } else if (year % 100 == 0) {
    return false;
  } else if (year % 4 == 0) {
    return true;
  } else {
    return false;
  }
}
// 주의 첫 날 표시
function getFirstDayOfWeek(year, month) {
  if (month < 10) month = "0" + month;

  return (new Date(year + "-" + month + "-01")).getDay();
}

// 캘린더 바디
function changeYearMonth(year, month) {
  let monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // 2월 윤년 반영
  if (month == 2) {
    if (leapYear(year)) monthDay[1] = 29;
  }

  // 남은 일 칸 비우기
  let First_Day_Of_Week = getFirstDayOfWeek(year, month);
  let arr_caleandar = [];
  for (let i = 0; i < First_Day_Of_Week; i++) {
    arr_caleandar.push("");
  }

  for (let i = 1; i <= monthDay[month - 1]; i++) {
    arr_caleandar.push(String(i));
  }

  let remainDay = 7 - (arr_caleandar.length % 7);
  if (remainDay < 7) {
    for (let i = 0; i < remainDay; i++) {
      arr_caleandar.push("");
    }
  }
  renderCaleandar(arr_caleandar);
}

//캘린더 띄우기
function renderCaleandar(data) {
  let h = [];
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      h.push('<tr>');
    } else if (i % 7 == 0) {
      h.push('</tr>');
      h.push('<tr>');
    }
    h.push('<td>' + data[i] + '</td>');
  }
  h.push('</tr>');

  $("#tb_body").html(h.join(""));

}

//달력 날짜 클릭시 todo-date에 출력, 이전 클릭 숫자 삭제 > 생성
$('#tb_body').on('click', 'td', function () {
  $("#todo-date").empty($(this).text()).append($(this).text());
});

// 월 바꾸기
function changeMonth(diff) {
  if (diff == undefined) { // select box에서 선택했을때
    current_month = parseInt($(month).val());
  } else { // 버튼 눌렀을때
    current_month = current_month + diff;

    if (current_month == 0) { // 해가 바뀔때
      current_year = current_year - 1;
      current_month = 12;
    } else if (current_month == 13) {
      current_year = current_year + 1;
      current_month = 1;
    }
  }
  loadCalendar();
}

function loadCalendar() {
  $("#year").val(current_year);
  $("#month").val(current_month);
  changeYearMonth(current_year, current_month);
}

// 캘린더 인풋과 일치하게 만들기
let current_year = (new Date()).getFullYear();
let current_month = (new Date()).getMonth() + 1;

$("#year").val(current_year);
$("#month").val(current_month);

changeYearMonth(current_year, current_month);

// enter쳐서 todo-list에 task 추가, + del 버튼, 체크버튼 만들기
$(".input-box").on("keyup",function(e){
  if(e.keyCode == 13 && $(".input-box").val() != ""){
    var task = $('<div class="task"></div>').text($(".input-box").val());
    $(".notdone").append(task);
    var finish = $("<button>✔️</button>");
    $(task).append(finish);
    var del = $("<button>🗑</button>");
    $(task).append(del);
    $(".input-box").val("");
  };
});

// 체크 버튼 클릭 시 줄 긋기
