$(function() {
  var submitButtonClickCheck = false; //검색란 입력 판단 변수
  var height = 160; //제품 이미지 높이 사이즈
  var i = 0; //반복문 사용 변수
  var j = 0; //반복문 사용 변수
  var r_count = 0; // 라쿠텐, 화면에 뿌려지는 아이템 카운트 변수
  var a_count = 0; // 아마존, 화면에 뿌려지는 아이템 카운트 변수
  var y_count = 0; // 야후, 화면에 뿌려지는 아이템 카운트 변수
  var temp_count = 0; // 임시 카운트 변수
  var r_sentence_checkInbigcate = false; // 라쿠텐 대카테고리만 선택시 '중카테고리를 선택하세요'라는 문장 화면 출력 체크 변수
  var r_ImageUrl = []; //라쿠텐, DB에서 imgrurl 가져와 저장하는 배열
  var r_name = []; //라쿠텐,name 저장 배열
  var r_price = []; //라쿠텐,price 저장 배열
  var r_ReviewAvgValue = []; //라쿠텐, 리뷰평균값 저장 배열
  var r_TotalReviewCount = []; //라쿠텐, 전체 리뷰 갯수 저장 배열
  var r_itemLinkUrl = []; //라쿠텐, 아이템 링크 url 배열
  var scroll_count = 1; //5개씩 뿌려줄 때, 현재 몇번이나 뿌려줬는지 체크하는 변수
  var r_TopSelectValue = 0; //라쿠텐, 첫번째 selectBox의 선택된 값
  var r_MidSelectValue = 0; //라쿠텐, 두번째 selectBox의 선택된 값
  var r_BtmSelectValue = 0; //라쿠텐, 세번째 selectBox의 선택된 값
  var y_ImageUrl = []; //야후
  var y_name = [];
  var y_price = [];
  var y_ReviewAvgValue = [];
  var y_TotalReviewCount = [];
  var y_itemLinkUrl = [];
  var y_TopSelectValue = 0;
  var y_MidSelectValue = 0;
  var a_ImageUrl = []; //아마존
  var a_name = [];
  var a_itemLinkUrl = [];
  var a_TopSelectValue = 0;
  var r_ChildrenGenreId = new Array();
  var y_ChildrenGenreId = new Array();
  var r_TopCategoryArray = new Array(); //라쿠텐, 대카테고리 저장 배열
  var r_TopCategoryObject = new Object(); //라쿠텐, 대카테고리 저장을 위한 오브젝트
  var r_MidCategoryArray = new Array(); //라쿠텐, 중카테고리 저장 배열
  var r_BtmCategoryArray = new Array(); //라쿠텐, 소 카테고리 저장 배열
  var y_TopCategoryArray = new Array();
  var y_MidCategoryArray = new Array();
  var a_TopCategoryArray = new Array();
  var r_TopSelector = $("span[name='r_TopSelector']"); // 라쿠텐, 대카테고리 클릭시 위에 뜨는 기록
  var r_MidSelector = $("span[name='r_MidSelector']"); // 라쿠텐, 중카테고리 클릭시 위에 뜨는 기록
  var r_BtmSelector = $("span[name='r_BtmSelector']"); // 라쿠텐, 소카테고리 클릭시 위에 뜨는 기록
  var y_TopSelector = $("span[name='y_TopSelector']");
  var y_MidSelector = $("span[name='y_MidSelector']");
  var a_TopSelector = $("span[name='a_TopSelector']");
  var r_TopCategorySelectBox = $("select[name='r_TopCategorySelectBox']"); //라쿠텐, 대 카테고리 selectbox
  var r_MidCategorySelectBox = $("select[name='r_MidCategorySelectBox']"); //라쿠텐, 중 카테고리 selectbox
  var r_BtmCategorySelectBox = $("select[name='r_BtmCategorySelectBox']"); //라쿠텐, 소 카테고리 selectbox
  var y_TopCategorySelectBox = $("select[name='y_TopCategorySelectBox']");
  var y_MidCategorySelectBox = $("select[name='y_MidCategorySelectBox']");
  var a_TopCategorySelectBox = $("select[name='a_TopCategorySelectBox']");

  r_TopCategorySelectBoxWrite(); //라쿠텐 대카테고리 하드코딩 값 입력
  //******************** 키워드 검색 및 카테고리 클릭 **************************
  $(document).ready(function() {
    $("#submit").click(function() { //검색란 제출 클릭
      submitButtonClickCheck = true; //submit 클릭 여부 저장
      ScreenInit('ary'); //기존 화면의 데이터 아마존,라쿠텐,야후 모두 초기
      scroll_count = 1; // 화면에 뿌리는 횟수 저장. 처음 1로 지정
      //************************** 카테고리 초기화  *************************
      //*********** rakuten ***********
      // //기록자 초기화
      // r_TopSelector.children().remove(); //라쿠텐, 상단 대카테고리  기록자 삭제
      // r_MidSelector.children().remove();
      // r_BtmSelector.children().remove();
      // //셀렉박스 초기화
      // r_TopCategorySelectBox.children().remove(); //대카테고리 셀렉트 박스를 초기화 시킨다.
      // r_MidCategorySelectBox.children().remove();
      // r_BtmCategorySelectBox.children().remove();
      // r_TopCategorySelectBox.append("<option value=''>大カテゴリ</option>"); //라쿠텐, 셀렉트 박스 표지 제작
      // r_MidCategorySelectBox.append("<option value=''>中大カテゴリ</option>");
      // r_BtmCategorySelectBox.append("<option value=''>ソカテゴリ</option>");

      //카테고리
      r_TopSelectorBoxInit(); //위에 주석처리 한 부분으로 이해 할 것, 위의 코드를 짜집기해서 간략화 시킴
      r_TopSelector.children().remove();
      r_TopCategorySelectBox.children().remove();
      r_TopCategorySelectBox.append("<option value=''>大カテゴリ</option>");

      var temp = ["0"]; //라쿠텐의 경우 , temp 가 0이면, DB전체에서 검색
      KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), temp, 1); //
      for (i = 0; i < r_TopCategoryArray.length; i++) { //라쿠텐, 초기 대카테고리 데이터 등록
        r_TopCategorySelectBox.append("<option value='" + r_TopCategoryArray[i].id + "'>" + r_TopCategoryArray[i].cateName + "</option>");
      }
      //*********** amazon ***********
      a_TopSelector.children().remove();
      a_TopCategorySelectBox.children().remove();
      a_TopCategorySelectBox.append("<option value=''>大カテゴリ</option>");
      temp = ["1"]; //아마존의 경우 , temp=1 일 때, DB전체에서 검색
      KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/amazon_searched', '?keyword=', $("#input").val(), temp, 2);
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/amazon_cate", '', '', 3); //아마존 초기 대카테고리 등록
      //*********** yahoo ***********
      //카테고리
      y_TopSelectorBoxInit();
      y_TopCategorySelectBox.children().remove();
      y_TopCategorySelectBox.append("<option value=''>大カテゴリ</option>");
      KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/yahoo_searched', '?keyword=', $("#input").val(), temp, 3); //야후도 똑같이 temp=1
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/yahoo_cate", '', '', 4); //야후 초기 대카테고리 등록
    });

    $("#r_TopSelector").click(function() { // 라쿠텐, 대카테고리 기록자 클릭
      //카테고리
      r_TopSelectorBoxInit(); //기록자,셀렉박스 초기화
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/rakuten_cate", '', '', 1); //두번째 카테고리 생성
      //스크린
      PrintChoiceRequest(); // 중카테고리 선택해달라는 문구 출력
    });

    $("#r_MidSelector").click(function() { // 라쿠텐,상단 중카테고리 기록자 클릭
      //카테고리
      r_MidSelectorBoxInit(); //기록자,셀렉박스 초기화
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/rakuten_cate", '', '', 2); //세번째 카테고리 생성
      //스크린
      ScreenInit('r'); //기존 자료 자료들 지우기
      if (submitButtonClickCheck) { //검색한 경우
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), r_ChildrenGenreId, 1);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", r_MidCategoryArray[r_MidSelectValue - 1].genreId, 1);
      }
    });

    $("#r_BtmSelector").click(function() { // 라쿠텐, 상단 소카테고리 기록자 클릭
      //카테고리
      r_BtmSelectorBoxInit(); //기록자 초기화
      //스크린
      ScreenInit('r');
      if (submitButtonClickCheck) {
        var temp = [String(r_BtmCategoryArray[r_BtmSelectValue - 1].genreId)];
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), temp, 1);
      } else {
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", r_BtmCategoryArray[r_BtmSelectValue - 1].genreId, 1);
      }
    });
    //야후
    $("#y_TopSelector").click(function() {
      //카테고리
      y_TopSelectorBoxInit(); //기록자 셀렉박스 초기화
      //스크린
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/yahoo_cate", '', '', 5); //두번째 카테고리 생성
      //y_makingSecondSelectBox();
      ScreenInit('y'); //기존 자료 자료들 지우기
      if (submitButtonClickCheck) { //검색한 경우
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/yahoo_searched', '?keyword=', $("#input").val(), y_ChildrenGenreId, 3);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', "?genreId=", y_TopCategoryArray[y_TopSelectValue - 1].genreId, 3);
      }
    });

    $("#y_MidSelector").click(function() {
      //카테고리
      y_Second_cate_click(); //기록자 초기화
      //스크린
      ScreenInit('y'); //기존 야후 자료 자료들 지우기
      if (submitButtonClickCheck) { //검색한 경우
        var temp = [String(y_MidCategoryArray[y_MidSelectValue - 1].genreId)];
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/yahoo_searched', '?keyword=', $("#input").val(), temp, 3);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', "?genreId=", y_MidCategoryArray[y_MidSelectValue - 1].genreId, 3);
      }
    });
    $("#a_MidSelector").click(function() {
      //카테고리
      a_TopSelector.children().remove();
      a_TopSelector.append("<a href='#'>" + a_TopCategoryArray[a_TopSelectValue - 1].cateName + "</a>"); //main 세부항목 만들기
      //스크린
      ScreenInit('a'); //기존 아마존 자료 자료들 지우기
      if (submitButtonClickCheck) { //검색한 경우
        temp = [String(a_TopCategoryArray[a_TopSelectValue - 1].id)];
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/amazon_searched', '?keyword=', $("#input").val(), temp, 2);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/amazon_selected_ranking', "?genreId=", a_TopCategoryArray[a_TopSelectValue - 1].id, 2);
      }
    });

    DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", 0, 1); //라쿠텐 초기 데이터 호출
    DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', "?genreId=", 1, 3); //야후 초기 데이터 호출
    CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/yahoo_cate", '', '', 4); //야후 초기 대카테고리 호출
    DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/amazon_selected_ranking', "?genreId=", 1, 2); //아마존 초기 데이터 호출
    CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/amazon_cate", '', '', 3); //아마존 초기 대카테고리 호출

  });

  //*************************** 카테고리 셀렉트박스로 접근하는 경우!!!!!!!!!!!!!!!!!!!!!!!!!!1
  for (i = 0; i < r_TopCategoryArray.length; i++) { //라쿠텐, 초기 대카테고리 데이터 등록
    r_TopCategorySelectBox.append("<option value='" + r_TopCategoryArray[i].id + "'>" + r_TopCategoryArray[i].cateName + "</option>");
  }
  //*********** 라쿠텐 1depth카테고리 선택 후 2depth 생성 START ***********
  $(document).on("change", "select[name='r_TopCategorySelectBox']", function() { //첫번째 카테고리 선택한 상황
    //***********선택한 첫번째 박스의 값을 가져와 일치하는 값을 두번째 셀렉트 박스에 넣는다.***********
    $("option:selected", this).each(function() {
      r_TopSelectValue = $(this).val(); //선택한 값
      //카테고리
      r_TopSelectorBoxInit(); //기록자,카테고리 초기화
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/rakuten_cate", '', '', 1); //두번째 카테고리 생성
      //스크린
      PrintChoiceRequest(); // 중카테고리 선택해달라는 문구 출력
    });
  });
  //*********** 라쿠텐 2depth카테고리 선택 후 3depth 생성 START ***********
  $(document).on("change", "select[name='r_MidCategorySelectBox']", function() { //두번째 셀렉트 박스 선택한 상황
    //****** 두,세번째 세부항목과 셀렉트박스 초기화 ***********
    $("option:selected", this).each(function() { //두번째 셀렉트 박스의 값을 고른 상황
      r_MidSelectValue = $(this).val(); //선택한 값
      //카테고리
      r_MidSelectorBoxInit(); //기록자,카테고리 초기화
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/rakuten_cate", '', '', 2); //세번째 카테고리 생성
      //스크린
      ScreenInit('r'); //기존 자료 자료들 지우기
      if (submitButtonClickCheck) { //검색한 경우
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), r_ChildrenGenreId, 1);
      } else { //검색 안한 경우
        temp = [String(r_MidCategoryArray[r_MidSelectValue - 1].genreId)];
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", temp, 1);
      }
    });
  });
  //*********** 라쿠텐  3depth 셀렉트 박스 선택
  $(document).on("change", "select[name='r_BtmCategorySelectBox']", function() {
    $("option:selected", this).each(function() {
      r_BtmSelectValue = $(this).val(); //선택한 값
      //카테고리
      r_BtmSelectorBoxInit(); //기록자 초기화
      //스크린
      ScreenInit('r');
      if (submitButtonClickCheck) {
        var temp = [String(r_BtmCategoryArray[r_BtmSelectValue - 1].genreId)];
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), temp, 1);
      } else {
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", r_BtmCategoryArray[r_BtmSelectValue - 1].genreId, 1);
      }
    });
  });
  //*********** yahoo 1depth카테고리 선택 후 2depth 생성 START ***********
  $(document).on("change", "select[name='y_TopCategorySelectBox']", function() { //첫번째 카테고리 선택한 상황
    //***********선택한 첫번째 박스의 값을 가져와 일치하는 값을 두번째 셀렉트 박스에 넣는다.***********
    $("option:selected", this).each(function() {
      y_TopSelectValue = $(this).val(); //main category 에서 선택한 값
      //카테고리
      y_TopSelectorBoxInit(); //기록자 셀렉박스 초기화
      //스크린
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/yahoo_cate", '', '', 5); //두번째 카테고리 생성
      //y_makingSecondSelectBox();
      ScreenInit('y');
      if (submitButtonClickCheck) { //검색한 경우
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/yahoo_searched', '?keyword=', $("#input").val(), y_ChildrenGenreId, 3);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', "?genreId=", y_TopCategoryArray[y_TopSelectValue - 1].genreId, 3);
      }
    });
  });
  //*********** yahoo 2depth카테고리 선택 후 3depth 생성 START ***********
  $(document).on("change", "select[name='y_MidCategorySelectBox']", function() { //두번째 셀렉트 박스 선택한 상황
    //****** 두,세번째 세부항목과 셀렉트박스 초기화 ***********
    $("option:selected", this).each(function() { //두번째 셀렉트 박스의 값을 고른 상황
      y_MidSelectValue = $(this).val(); //main category 에서 선택한 값
      //카테고리
      y_Second_cate_click(); //기록자 초기화
      //스크린
      ScreenInit('y'); //기존 자료 자료들 지우기
      if (submitButtonClickCheck) { //검색한 경우
        var temp = [String(y_MidCategoryArray[y_MidSelectValue - 1].genreId)];
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/yahoo_searched', '?keyword=', $("#input").val(), temp, 3);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', "?genreId=", y_MidCategoryArray[y_MidSelectValue - 1].genreId, 3);
      }
    });
  });
  //*********** amazon 1depth카테고리 선택 ***********
  $(document).on("change", "select[name='a_TopCategorySelectBox']", function() { //첫번째 카테고리 선택한 상황
    //***********선택한 첫번째 박스의 값을 가져와 일치하는 값을 두번째 셀렉트 박스에 넣는다.***********
    $("option:selected", this).each(function() {
      a_TopSelectValue = $(this).val(); //main category 에서 선택한 값
      //카테고리
      a_TopSelector.children().remove();
      a_TopSelector.append("<a href='#'>" + a_TopCategoryArray[a_TopSelectValue - 1].cateName + "</a>"); //main 세부항목 만들기
      //스크린
      ScreenInit('a'); //기존 아마존 자료 자료들 지우기
      if (submitButtonClickCheck) { //검색한 경우
        temp = [String(a_TopCategoryArray[a_TopSelectValue - 1].id)];
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/amazon_searched', '?keyword=', $("#input").val(), temp, 2);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/amazon_selected_ranking', "?genreId=", a_TopCategoryArray[a_TopSelectValue - 1].id, 2);
      }
    });
  });
  //*****************************************************8************************여기서 부터 함수단 ******************************8*********************************
  //초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화
  function ScreenInit(what) { //현재 화면 및 변수 초기화
    if (what.includes('r')) {
      $("#r_myList").empty();
      $("#r_top_fixedSize").empty();
      r_count = 0;
      r_sentence_checkInbigcate = false;
      r_ImageUrl = [];
      r_name = [];
      r_price = [];
      r_ReviewAvgValue = [];
      r_TotalReviewCount = [];
      r_itemLinkUrl = [];
    }
    if (what.includes('a')) {
      $("#a_myList").empty();
      a_count = 0;
      r_sentence_checkInbigcate = false;
      a_ImageUrl = [];
      a_name = [];
      a_itemLinkUrl = [];
    }
    if (what.includes('y')) {
      $("#y_myList").empty();
      y_count = 0;
      r_sentence_checkInbigcate = false;
      y_ImageUrl = [];
      y_name = [];
      y_price = [];
      y_ReviewAvgValue = [];
      y_TotalReviewCount = [];
      y_itemLinkUrl = [];
    }
  }

  function DatastoragePrintAjax(baseUrl, parameter, gId, number) { //flask와 연결함
    $.ajax({
      type: "GET",
      dataType: 'JSON',
      url: baseUrl + parameter + gId,
      async: false,
      success: function(result) {
        switch (number) {
          case 1:
            r_DataStore_printItem(result); //라쿠텐 정보 저장 및 출력
            break;
          case 2:
            a_DataStore_printItem(result); //아마존 정보 저장 및 출력
            break;
          case 3:
            y_DataStore_printItem(result); //야후 정보 저장 및 출력
            break;
        }
      },
      error: function(xtr, status, error) {
        alert(xtr + ":" + status + ":" + error);
      }
    });
  }

  function CategorystoragePrintAjax(baseUrl, parameter, gId, number) { //flask와 연결함
    $.ajax({
      type: "GET",
      dataType: 'JSON',
      url: baseUrl + parameter + gId,
      async: false,
      success: function(result) {
        switch (number) {
          case 1:
            r_MidCategoryStorage(result); //라쿠텐 중카테고리 저장
            break;
          case 2:
            r_BtmCategoryStorage(result); //라쿠텐 소카테고리 저장
            break;
          case 3:
            a_TopCategoryStorage(result); //아마존 대카테고리 저장
            break;
          case 4:
            y_TopCategoryStorage(result); //야후 대카테고리 저장
            break;
          case 5:
            y_MidCategoryStorage(result); //야후 중카테고리 저장
            break;
        }
      },
      error: function(xtr, status, error) {
        alert(xtr + ":" + status + ":" + error);
      }
    });
  }

  //출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출출력출력출력출력출력출력출력출력출력출
  function KeywordSendingAjax(baseUrl, parameter, gId, key, number) {
    if (key.length == 1) {
      key.push(key.toString());
    }
    var js_key = JSON.stringify(key);
    //  console.log(js_key);
    $.ajax({
      async: false,
      type: 'POST',
      url: baseUrl + parameter + gId,
      data: js_key,
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
        if (data.length != 0) {
          switch (number) {
            case 1:
              r_DataStore_printItem(data);
              break;
            case 2:
              a_DataStore_printItem(data);
              break;
            case 3:
              y_DataStore_printItem(data);
              break;
          }
        } else making_undefined(number);
      }
    });
  }

  function r_DataStore_printItem(result) { //라쿠텐, 디비에서 가져온 정보 저장
    for (i in result) {
      r_ImageUrl.push(result[i].mediumImageUrls);
      r_name.push(result[i].itemName);
      r_price.push("<p style=\"color:red;text-align:center;\">" + result[i].itemPrice + "円</p>");
      r_ReviewAvgValue.push(result[i].reviewAverage);
      r_TotalReviewCount.push(result[i].reviewCount);
      r_itemLinkUrl.push(result[i].itemUrl);
    }
    for (i = 0; i < 5 * scroll_count; i++) { //다섯개 먼저 출력
      if (i == r_name.length) break;
      r_print_item();
    }
    window.onscroll = function() { //스크롤 할 경우
      scroll_Throw(); //스크롤에 따라 5개씩 출력
    };
  }

  function r_print_item() { //라쿠텐, DB에서 가져온 정보로 아이템 1개의 정보를 DIV에 담아 출력
    //*****************상품 이미지 *****************
    var img = document.createElement("IMG");
    img.setAttribute("style", "margin-left: auto; margin-right: auto; display: block;");
    img.setAttribute("src", r_ImageUrl[r_count]);
    // img.setAttribute("width", width);
    img.setAttribute("height", height);

    //*****************상품 순위 *****************
    var num = document.createElement("P");
    num.setAttribute("style", "font-size:18px; color:red;");
    num.innerHTML = r_count + 1 + "위";

    //*****************상품 링크 *****************
    var item_link = document.createElement("a");
    item_link.setAttribute("style", "text-decoration: none; color:#0080FF");
    item_link.href = r_itemLinkUrl[r_count]; //링크 연결
    item_link.appendChild(img);

    var item_linkText = document.createTextNode(r_name[r_count]); //링크 이름
    item_link.appendChild(item_linkText);

    var div = document.createElement("DIV"); //아이템 정보를 담을 그릇
    div.setAttribute("style", " text-align:center; display:inline-block; border: 1px solid black; margin-top:3px; width:400px; height:350px;");

    div.appendChild(num); //순위 담기
    div.appendChild(item_link); // 아이템 링크
    div.innerHTML += r_price[r_count]; // 아이템 가격 담기

    var review_link = document.createElement("a"); //리뷰 링크 만들기
    review_link.setAttribute("style", "text-decoration: none; color:black");
    review_link.href = r_itemLinkUrl[r_count] + "#itemReview"; //#js-review-widget

    //*******************평균 리뷰 값으로 별 만들기**************************
    var yellow = Math.round(r_ReviewAvgValue[r_count] * 2) / 2;
    var white = 5 - yellow;
    for (; yellow >= 1; yellow--) {
      var star = document.createElement("i");
      star.setAttribute("style", "color:#D7DF01; ");
      star.className = "fa fa-star text-yellow";
      review_link.appendChild(star);
    }
    if (yellow == 0.5) {
      var star = document.createElement("i");
      star.setAttribute("style", "color:#D7DF01;");
      star.className = "fa fa-star-half-o text-yellow";
      review_link.appendChild(star);
    }
    for (; white >= 1; white--) {
      var star = document.createElement("i");
      star.className = "fa fa-star-o ";
      star.setAttribute("style", "color:#D7DF01;");
      review_link.appendChild(star);
    }

    var review_linkText = document.createTextNode("(" + r_TotalReviewCount[r_count] + ")건");
    review_link.appendChild(review_linkText);
    div.appendChild(review_link);
    document.getElementById("r_myList").appendChild(div); //라쿠텐에 아이템 뿌리기
    r_count++; // 개수 파악

  }
  //스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤스크롤
  function scroll_Throw() {
    var scrolltop = $(window).scrollTop();
    if (scrolltop == $(document).height() - $(window).height()) {
      scroll_count++;
      for (i = 0; i < 5; i++) {
        if (r_count != r_ImageUrl.length)
          r_print_item();
        if (y_count != y_ImageUrl.length)
          y_print_item();
        if (a_count != a_ImageUrl.length)
          a_print_item();
      }
    }
  }

  function a_DataStore_printItem(result) { //아마존, 디비에서 가져온 정보 저장
    for (i in result) {
      a_ImageUrl.push(result[i].mediumImageUrls);
      a_name.push(result[i].itemName);
      a_itemLinkUrl.push(result[i].itemUrl);
    }
    for (i = 0; i < 5 * scroll_count; i++) {
      if (i == a_name.length) break;
      a_print_item();
    }
  }

  function a_print_item() { //아마존
    var num = document.createElement("P");
    var a = document.createElement("a");
    var link = document.createElement("a");
    var img = document.createElement("IMG");
    img.setAttribute("src", a_ImageUrl[a_count]);
    img.setAttribute("style", "margin-left: auto; margin-right: auto; display: block;");
    img.setAttribute("height", height);
    var linkText = document.createTextNode(a_name[a_count]);
    var div = document.createElement("DIV");
    div.setAttribute("style", " text-align:center; display:inline-block; border: 1px solid black; margin-top:3px; width:400px; height:350px;");
    a.setAttribute("style", "text-decoration: none; color:#0080FF");
    num.setAttribute("style", "font-size:18px; color:red;");
    a.appendChild(img);
    a.href = a_itemLinkUrl[a_count];
    a.appendChild(linkText);
    num.innerHTML = a_count + 1 + "위";
    div.appendChild(num);
    div.appendChild(a);
    document.getElementById("a_myList").appendChild(div);
    a_count++;
  }

  function y_DataStore_printItem(result) { //야후 디비에서 가져온 데이터 저장
    for (i in result) {
      y_ImageUrl.push(result[i].mediumImageUrls);
      y_name.push(result[i].itemName);
      y_price.push("<p style=\"color:red;text-align:center;\">" + result[i].itemPrice + "円</p>");
      y_ReviewAvgValue.push(result[i].reviewAverage);
      y_TotalReviewCount.push(result[i].reviewCount);
      y_itemLinkUrl.push(result[i].itemUrl);
    }
    for (i = 0; i < 5 * scroll_count; i++) {
      if (i == y_name.length) break;
      y_print_item();
    }
  }

  function y_print_item() { //야후
    var img = document.createElement("IMG");
    img.setAttribute("style", "margin-left: auto; margin-right: auto; display: block;");
    img.setAttribute("src", y_ImageUrl[y_count]);
    img.setAttribute("height", height);
    var num = document.createElement("P");
    num.setAttribute("style", "font-size:18px; color:red;");
    num.innerHTML = y_count + 1 + "위";
    var item_link = document.createElement("a");
    item_link.setAttribute("style", "text-decoration: none; color:#0080FF");
    item_link.href = y_itemLinkUrl[y_count];
    item_link.appendChild(img);
    var item_linkText = document.createTextNode(y_name[y_count]);
    item_link.appendChild(item_linkText);
    var div = document.createElement("DIV");
    div.setAttribute("style", " text-align:center; display:inline-block; border: 1px solid black; margin-top:3px; width:400px; height:350px;");
    div.appendChild(num);
    div.appendChild(item_link);
    div.innerHTML += y_price[y_count];
    var review_link = document.createElement("a");
    review_link.setAttribute("style", "text-decoration: none; color:black;");
    review_link.href = y_itemLinkUrl[y_count] + "#itmrvwfl";

    var yellow = Math.round(y_ReviewAvgValue[y_count] * 2) / 2;
    var white = 5 - yellow;
    for (; yellow >= 1; yellow--) {
      var star = document.createElement("i");
      star.setAttribute("style", "color:#D7DF01; ");
      star.className = "fa fa-star text-yellow";
      review_link.appendChild(star);
    }
    if (yellow == 0.5) {
      var star = document.createElement("i");
      star.setAttribute("style", "color:#D7DF01;");
      star.className = "fa fa-star-half-o text-yellow";
      review_link.appendChild(star);
    }
    for (; white >= 1; white--) {
      var star = document.createElement("i");
      star.className = "fa fa-star-o ";
      star.setAttribute("style", "color:#D7DF01;");
      review_link.appendChild(star);
    }
    var review_linkText = document.createTextNode("(" + y_TotalReviewCount[y_count] + ")건");
    review_link.appendChild(review_linkText);
    div.appendChild(review_link);
    document.getElementById("y_myList").appendChild(div);
    y_count++;
  }

  //아무것도 없다 출력아무것도 없다 출력아무것도 없다 출력아무것도 없다 출력아무것도 없다 출력아무것도 없다 출력아무것도 없다 출력아무것도 없다 출력아무것도 없다 출력아무것도 없다 출력아무것도 없다 출력
  function making_undefined(number) { // 디비에 데이터가 없는 경우 출력
    var div = document.createElement("DIV");
    div.setAttribute("style", " text-align:center; display:inline-block; margin-top:3px; width:400px; height:350px;");
    div.innerHTML += "cannot found it";
    switch (number) {
      case 1:
        document.getElementById("r_myList").appendChild(div);
        break;
      case 2:
        document.getElementById("a_myList").appendChild(div);
        break;
      case 3:
        document.getElementById("y_myList").appendChild(div);
        break;
    }
  }
  //카테고리 선택 카테고리 선택 카테고리 선택 카테고리 선택 카테고리 선택 카테고리 선택 카테고리 선택 카테고리 선택 카테고리 선택 카테고리 선택 카테고리 선택 카테고리 선택 카테고리 선택
  function r_TopSelectorBoxInit() {
    //기록자 초기화
    r_TopSelector.children().remove();
    r_MidSelector.children().remove();
    r_BtmSelector.children().remove();
    r_TopSelector.append("<a href='#'>" + r_TopCategoryArray[r_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기

    //셀렉박스 초기화
    r_MidCategorySelectBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    r_BtmCategorySelectBox.children().remove(); //세번째 셀렉트 박스를 초기화 시킨다.
    r_MidCategorySelectBox.append("<option value=''>中カテゴリ</option>"); //두 세번째 베이스값 만들기
    r_BtmCategorySelectBox.append("<option value=''>ソカテゴリ</option>");


    //  f_init(); //전체 기록 카테고리 및 select box 초기화

    //****** 두번째 셀렉트 박스 내용 만들기 ***********
    // r_MidCategoryArray = new Array();
    // DatastoragePrintAjax("http://ubuntu@54.199.177.237:5000/rakuten_cate",'','',6);
    // PrintChoiceRequest();
    // if (submitButtonClickCheck) { //검색한 경우
    //   ScreenInit('r'); //라쿠텐 데이터 초기화
    //   PrintChoiceRequest(); // 라쿠텐에서 대카테고리만 선택할 경우 보여주는 문장 출력 함수
    // } else { //검색 안한 경우
    //   PrintChoiceRequest();
    // }
  }
  // 대카테고리 셀렉트 박스 제외하고 나머지 대,중,소 카테고리 기록 초기화
  // function f_init() {
  //   //전체 세부 카테고리 항목를 지운다
  //   r_TopSelector.children().remove();
  //   r_MidSelector.children().remove();
  //   r_BtmSelector.children().remove();
  //   r_TopSelector.append("<a href='#'>" + r_TopCategoryArray[r_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
  //   r_MidCategorySelectBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
  //   r_BtmCategorySelectBox.children().remove(); //세번째 셀렉트 박스를 초기화 시킨다.
  //   r_MidCategorySelectBox.append("<option value=''>전체</option>"); //두 세번째 베이스값 만들기
  //   r_BtmCategorySelectBox.append("<option value=''>전체</option>");
  // }


  function PrintChoiceRequest() { // 라쿠텐에서 대카테고리만 선택할 경우 보여주는 문장 출력 함수
    if (r_sentence_checkInbigcate == false) {
      ScreenInit('r');
      var div = document.createElement("DIV");
      div.setAttribute("style", " text-align:center; display:inline-block; border: 1px solid black; margin-top:3px");
      div.innerHTML = "중카테고리를 선택하세요";
      document.getElementById("r_myList").append(div); //
      r_sentence_checkInbigcate = true; //화면에 출력한 경우 다시 값을 변경해줌.
    }
  }

  function r_MidSelectorBoxInit() {
    //기록자 초기화
    r_MidSelector.children().remove();
    r_BtmSelector.children().remove();
    for (var i = 0; i < r_MidCategoryArray.length; i++) { //선택된 기록자 등록
      if (r_TopSelectValue == r_MidCategoryArray[i].main_category_id && r_MidSelectValue == r_MidCategoryArray[i].sub_category_id) {
        //main_category_id도 일치해야, 다른 카테고리와 섞이지 않는다.
        r_MidSelector.append("<a href='#'>" + r_MidCategoryArray[i].cateName + "</a>" + "<span> > </span>");
        break;
      }
    }

    //셀렉박스 초기화
    r_BtmCategorySelectBox.children().remove();
    r_BtmCategorySelectBox.append("<option value=''>ソカテゴリ</option>");

    //****** 세번째 셀렉트 박스 내용 만들기 ***********
    ScreenInit('r'); //기존 자료 자료들 지우기
    r_ChildrenGenreId = new Array();
    r_BtmCategoryArray = new Array();
    $.ajax({
      async: false,
      type: "GET",
      dataType: 'JSON',
      url: "http://ubuntu@54.199.177.237:5000/rakuten_cate",
      success: function(result) {
        result.filter(function(element) {
          for (var j = 0; j < r_MidCategoryArray[r_MidSelectValue - 1].children.length; j++) {
            if (element.id == r_MidCategoryArray[r_MidSelectValue - 1].children[j]) {
              r_ChildrenGenreId.push(String(element.genreId));
              element.main_category_id = String(r_TopSelectValue);
              element.sub_category_id = String(r_MidSelectValue);
              element.thr_category_id = String(j + 1);
              r_BtmCategoryArray.push(element);
              r_BtmCategorySelectBox.append("<option value='" + element.thr_category_id + "'>" + element.cateName + "</option>");
            }
          }
        });
        r_ChildrenGenreId.push(String(r_MidCategoryArray[r_MidSelectValue - 1].genreId));
      }
    });

    if (submitButtonClickCheck) { //검색한 경우
      KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), r_ChildrenGenreId, 1);
    } else { //검색 안한 경우
      DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", r_MidCategoryArray[r_MidSelectValue - 1].genreId, 1);
    }
  }

  function r_BtmSelectorBoxInit() {
    r_BtmSelector.children().remove();
    for (var i = 0; i < r_BtmCategoryArray.length; i++) {
      if (r_TopSelectValue == r_BtmCategoryArray[i].main_category_id && r_MidSelectValue == r_BtmCategoryArray[i].sub_category_id && r_BtmSelectValue == r_BtmCategoryArray[i].thr_category_id) {
        r_BtmSelector.append("<a href='#'>" + r_BtmCategoryArray[i].cateName + "</a>");
        break;
      }
    }
  }

  // function a_First_cate_click() {
  //   a_TopSelector.children().remove();
  //   a_TopSelector.append("<a href='#'>" + a_TopCategoryArray[a_TopSelectValue - 1].cateName + "</a>"); //main 세부항목 만들기
  //   //****** 두번째 셀렉트 박스 내용 만들기 ***********
  //   ScreenInit('a');
  //   if (submitButtonClickCheck) { //검색한 경우
  //     temp = [String(a_TopCategoryArray[a_TopSelectValue - 1].id)];
  //     KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/amazon_searched', '?keyword=', $("#input").val(), temp, 2);
  //   } else { //검색 안한 경우
  //     DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/amazon_selected_ranking', "?genreId=", a_TopCategoryArray[a_TopSelectValue - 1].id, 2);
  //   }
  // }

  function y_TopSelectorBoxInit() {
    //기록자 초기화
    y_TopSelector.children().remove();
    y_MidSelector.children().remove();
    y_TopSelector.append("<a href='#'>" + y_TopCategoryArray[y_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기

    //셀렉박스 초기화
    y_MidCategorySelectBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    y_MidCategorySelectBox.append("<option value=''>中カテゴリ</option>"); //두 세번째 베이스값 만들기

  }

  var g_json;

  function y_makingSecondSelectBox() {
    y_ChildrenGenreId = new Array();
    y_MidCategoryArray = new Array();
    $.ajax({
      async: false,
      type: "GET",
      dataType: 'JSON',
      url: "http://ubuntu@54.199.177.237:5000/yahoo_cate",
      success: function(result) {
        result.filter(function(element) {
          for (var j = 0; j < y_TopCategoryArray[y_TopSelectValue - 1].children.length; j++) {
            if (element.id == y_TopCategoryArray[y_TopSelectValue - 1].children[j]) {
              //선택된 아이템의 genreId와 children의 장르아이디 한꺼번에 담아서, 검색창에서 입력했을 때 넘겨줘야함.
              y_ChildrenGenreId.push(String(element.genreId));
              //야후, 두번째 카테고리 데이터 만들기
              element.main_category_id = String(y_TopSelectValue); // 야후 대카테고리 선택된 값이, 두번째 카테고리의 main id가 됨
              element.sub_category_id = String(j + 1);
              y_MidCategoryArray.push(element);
              y_MidCategorySelectBox.append("<option value='" + element.sub_category_id + "'>" + element.cateName + "</option>");
            }
          }
        });
        y_ChildrenGenreId.push(String(y_TopCategoryArray[y_TopSelectValue - 1].genreId));
      }
    });
  }

  function y_Second_cate_click() {
    y_MidSelector.children().remove();
    for (var i = 0; i < y_MidCategoryArray.length; i++) { //두번째 세부항목을 넣어보자.
      if (y_TopSelectValue == y_MidCategoryArray[i].main_category_id && y_MidSelectValue == y_MidCategoryArray[i].sub_category_id) {
        y_MidSelector.append("<a href='#'>" + y_MidCategoryArray[i].cateName + "</a>");
        break;
      }
    }
  }


  function r_TopCategorySelectBoxWrite() { //라쿠텐 대 카테고리 하드코딩
    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "1";
    r_TopCategoryObject.cateName = "スポーツ・ゴルフ";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["102"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "2";
    r_TopCategoryObject.cateName = "ファッション・インナー";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["1", "22", "37"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "3";
    r_TopCategoryObject.cateName = "ファッション小物";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["42", "62", "67", "77"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "4";
    r_TopCategoryObject.cateName = "キッズ・ベビー・玩具";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["88", "95"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "5";
    r_TopCategoryObject.cateName = "家電・TV・カメラ";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["136", "146"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "6";
    r_TopCategoryObject.cateName = "PC・スマホ・通信";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["161", "180", "193"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "7";
    r_TopCategoryObject.cateName = "食品・スイーツ";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["199", "218"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "8";
    r_TopCategoryObject.cateName = "ドリンク・お酒";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["235", "257", "274"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "9";
    r_TopCategoryObject.cateName = "本・電子書籍・音楽";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["338", "367"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "10";
    r_TopCategoryObject.cateName = "ゲーム・ホビー・楽器";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["376", "393"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "11";
    r_TopCategoryObject.cateName = "車・バイク";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["407", "412"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "12";
    r_TopCategoryObject.cateName = "インテリア・寝具";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["279"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "13";
    r_TopCategoryObject.cateName = "日用雑貨・キッチン用品";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["306", "323"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "14";
    r_TopCategoryObject.cateName = "ペット・花・DIY工具";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["454", "469"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "15";
    r_TopCategoryObject.cateName = "コスメ・健康・医薬品";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["416", "431", "440"];
    r_TopCategoryArray.push(r_TopCategoryObject);

    r_TopCategoryObject = new Object();
    r_TopCategoryObject.id = "16";
    r_TopCategoryObject.cateName = "サービス・リフォーム";
    r_TopCategoryObject.depth = "1";
    r_TopCategoryObject.children = ["478", "494"];
    r_TopCategoryArray.push(r_TopCategoryObject);
  }

  function y_MidCategoryStorage(result) {
    y_ChildrenGenreId = new Array();
    y_MidCategoryArray = new Array();
    result.filter(function(element) {
      for (var j = 0; j < y_TopCategoryArray[y_TopSelectValue - 1].children.length; j++) {
        if (element.id == y_TopCategoryArray[y_TopSelectValue - 1].children[j]) {
          //선택된 아이템의 genreId와 children의 장르아이디 한꺼번에 담아서, 검색창에서 입력했을 때 넘겨줘야함.
          y_ChildrenGenreId.push(String(element.genreId));
          //야후, 두번째 카테고리 데이터 만들기
          element.main_category_id = String(y_TopSelectValue); // 야후 대카테고리 선택된 값이, 두번째 카테고리의 main id가 됨
          element.sub_category_id = String(j + 1);
          y_MidCategoryArray.push(element);
          y_MidCategorySelectBox.append("<option value='" + element.sub_category_id + "'>" + element.cateName + "</option>");
        }
      }
    });
    y_ChildrenGenreId.push(String(y_TopCategoryArray[y_TopSelectValue - 1].genreId));
  }

  function r_MidCategoryStorage(result) {
    r_MidCategoryArray = new Array();
    result.filter(function(element) { // children안에 하위 카테고리 id가 들어가 있는데, 그 id의 genreid를 넘겨줘야, 하위카테고리 정보를 얻을 수 있다.
      for (j = 0; j < r_TopCategoryArray[r_TopSelectValue - 1].children.length; j++) {
        if (element.id == r_TopCategoryArray[r_TopSelectValue - 1].children[j]) {
          element.main_category_id = String(r_TopSelectValue);
          element.sub_category_id = String(j + 1);
          r_MidCategoryArray.push(element);
          r_MidCategorySelectBox.append("<option value='" + element.sub_category_id + "'>" + element.cateName + "</option>");
        }
      }
    });
  }

  function r_BtmCategoryStorage(result) {
    r_ChildrenGenreId = new Array();
    r_BtmCategoryArray = new Array();
    result.filter(function(element) {
      for (var j = 0; j < r_MidCategoryArray[r_MidSelectValue - 1].children.length; j++) {
        if (element.id == r_MidCategoryArray[r_MidSelectValue - 1].children[j]) {
          r_ChildrenGenreId.push(String(element.genreId));
          element.main_category_id = String(r_TopSelectValue);
          element.sub_category_id = String(r_MidSelectValue);
          element.thr_category_id = String(j + 1);
          r_BtmCategoryArray.push(element);
          r_BtmCategorySelectBox.append("<option value='" + element.thr_category_id + "'>" + element.cateName + "</option>");
        }
      }
    });
    r_ChildrenGenreId.push(String(r_MidCategoryArray[r_MidSelectValue - 1].genreId));
  }

  function a_TopCategoryStorage(result) { //아마존, 대카테고리 selectBox에 등록 함수
    temp_count = 0;
    result.filter(function(element) {
      if (element.depth == 1) {
        element.main_category_id = ++temp_count;
        a_TopCategoryArray.push(element);
        a_TopCategorySelectBox.append("<option value='" + temp_count + "'>" + element.cateName + "</option>");
      }
    });
  }

  function y_TopCategoryStorage(result) { //야후, 대카테고리 selectBox에 등록 함수
    temp_count = 0;
    result.filter(function(element) {
      if (element.depth == 1) {
        element.main_category_id = ++temp_count;
        y_TopCategoryArray.push(element);
        y_TopCategorySelectBox.append("<option value='" + temp_count + "'>" + element.cateName + "</option>");
      }
    });
  }
});
