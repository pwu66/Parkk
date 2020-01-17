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
  var totalKwordSearchPara = ["0"]; //라쿠텐의 경우 , temp 가 0이면, DB전체에서 검색하도록 설정
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
  var r_ChildrenId = new Array();
  var y_ChildrenId = new Array();
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
  //getIP();
  $(document).ready(function() {
    //******************** 키워드 검색 및 카테고리 클릭 **************************
    // 기존의 데이터와 카테고리는 초기화시키고, 키워드를 넘겨 새로운 데이터를 가져온다.
//console.log($("#main").val());
    $("#submit").click(function() { //검색란 제출 클릭
      ScreenInit('ary'); //기존 상품단 화면의 데이터 아마존,라쿠텐,야후 모두 초기
      //검색어를 입력하지 않은 경우
      if($("#input").val()==0){
      //   var r_div = document.createElement("DIV");
      //   r_div.setAttribute("style", " text-align:center; display:inline-block; margin-top:2%");
      //   r_div.innerHTML = "검색어를 입력하세요";
      //   var y_div = document.createElement("DIV");
      //   y_div.setAttribute("style", " text-align:center; display:inline-block; margin-top:2%");
      //   y_div.innerHTML = "검색어를 입력하세요";
        // var a_div = document.createElement("DIV");
        // a_div.setAttribute("style", " text-align:center; display:inline-block; margin-top:2%");
        // a_div.innerHTML = "검색어를 입력하세요";
      // //  document.getElementById("r_ItemScreen").append(r_div); //
      // //  document.getElementById("y_ItemScreen").append(y_div); //
        //document.getElementById("a_ItemScreen").append(a_div); //
      alert("検索キーワードが空欄です。キーワードを入力して検索してください。");
      }
      //검색어를 입력한 경우
      else{
      submitButtonClickCheck = true; //submit 클릭 여부 저장
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

      //*********** rakuten ***********
      //카테고리단
      r_TopSelectorClickInit(); //위에 주석처리 한 부분간략화 하기 위해 해당 코드로 바꿈 //라쿠텐, 중,소 기록자 셀렉박스 초기화
      r_TopSelector.children().remove(); //대 기록자 초기화
      r_TopCategorySelectBox.children().remove(); //대 셀렉박스 초기화
      r_TopCategorySelectBox.append("<option value=''>大カテゴリ</option>");
      for (i = 0; i < r_TopCategoryArray.length; i++) { //라쿠텐,  대 셀렉박스 데이터 출력
        r_TopCategorySelectBox.append("<option value='" + r_TopCategoryArray[i].id + "'>" + r_TopCategoryArray[i].cateName + "</option>");
      }
      //상품단
      KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), ["0"], 1); //키워드로 데이터 요청

      //*********** amazon ***********
      //카테고리단
      a_TopSelector.children().remove(); //대 기록자 초기화
      a_TopCategorySelectBox.children().remove(); //대 셀렉박스 초기화
      a_TopCategorySelectBox.append("<option value=''>大カテゴリ</option>");
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/amazon_cate", '', '', 3); //아마존 대 셀렉박스 데이터 저장 및 출력
      //상품단
      KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/amazon_searched', '?keyword=', $("#input").val(), ["0"], 2); //키워드로 데이터 요청

      //*********** yahoo ***********
      //카테고리단
      y_TopSelectorBoxInit(); //야후, 중 기록자 셀렉박스 초기화
      y_TopCategorySelectBox.children().remove(); // 야후, 대 셀렉박스 초기화
      y_TopCategorySelectBox.append("<option value=''>大カテゴリ</option>");
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/yahoo_cate", '', '', 4); //야후 대 셀렉박스 데이터 저장 및 출력
      //상품단
      KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/yahoo_searched', '?keyword=', $("#input").val(),["0"], 3);
      }
    });
    //************************************ 라쿠텐, 대카테고리 기록자 클릭 *********************************
    $("#r_TopSelector").click(function() {
      //카테고리단
      r_TopSelectorClickInit(); //라쿠텐, 중,소 기록자 셀렉박스 초기화
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/rakuten_cate", '', '', 1); //라쿠텐 중 셀렉박스 데이터 저장 및 출력
      //상품단
      PrintChoiceRequest(); // 중카테고리 선택해달라는 문구 출력(라쿠텐의 경우 중카테고리 까지 클릭해야 상품 나옴)
    });
    //************************************ 라쿠텐, 중카테고리 기록자 클릭 *********************************
    $("#r_MidSelector").click(function() {
      //카테고리단
      r_MidSelectorClickInit(); //라쿠텐, 소 기록자 셀렉박스 초기화
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/rakuten_cate", '', '', 2); //라쿠텐 소 셀렉박스 데이터 저장 및 출력
      //상품단
      ScreenInit('r'); //라쿠텐 기존 상품단 자료 초기화
      if (submitButtonClickCheck) { //중카테고리로 검색할 경우,키워드와 r_ChildrenId(하위카테고리 장르아이디+본인 장르아이디)를 넘겨줘야함
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), r_ChildrenId, 1);
      } else { //검색 안한 경우, 장르 아이디만 넘겨주면
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", r_MidCategoryArray[r_MidSelectValue - 1].id, 1);
      }
    });
    //************************************ 라쿠텐, 소카테고리 기록자 클릭 *********************************
    $("#r_BtmSelector").click(function() { // 라쿠텐, 상단 소카테고리 기록자 클릭
      //카테고리단
      r_BtmSelectorClickInit(); //라쿠텐, 소 기록자 초기화
      //상품단
      ScreenInit('r'); //라쿠텐 기존 상품단 자료 초기화
      if (submitButtonClickCheck) { //소카테고리로 검색한 경우, 해당 장르아이디만 넘겨주면 (밑에 하위카테고리가 있는 경우를 제외하고는 해당 장르아이디만 넘겨주면 됌)
        var temp = [String(r_BtmCategoryArray[r_BtmSelectValue - 1].id)]; //flask에 장르아이디 배열로 보내줘야 함
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), temp, 1);
      } else {
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", r_BtmCategoryArray[r_BtmSelectValue - 1].id, 1);
      }
    });
    //************************************ 야후, 대카테고리 기록자 클릭 *********************************
    $("#y_TopSelector").click(function() {
      //카테고리단
      y_TopSelectorBoxInit(); //야후 중 기록자 셀렉박스 초기화
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/yahoo_cate", '', '', 5); //야후 중 셀렉박스 데이터 저장 및 출력

      //상품단
      ScreenInit('y'); //야후 기존 상품단 기존 자료 초기화
      if (submitButtonClickCheck) { //아직 선택하지 않은 하위카테고리 존재할 경우,키워드와 ChildrenId(하위카테고리 장르아이디+본인 장르아이디)를 넘겨줘야함
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/yahoo_searched', '?keyword=', $("#input").val(), y_ChildrenId, 3);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', "?genreId=", y_TopCategoryArray[y_TopSelectValue - 1].id, 3);
      }
    });
    //************************************ 야후, 중카테고리 기록자 클릭 *********************************
    $("#y_MidSelector").click(function() {
      //카테고리단
      y_Second_cate_click(); //기록자 초기화
      //상품단
      ScreenInit('y'); //야후 기존 상품단 기존 자료 초기화
      if (submitButtonClickCheck) { //검색한 경우
        var temp = [String(y_MidCategoryArray[y_MidSelectValue - 1].id)];
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/yahoo_searched', '?keyword=', $("#input").val(), temp, 3);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', "?genreId=", y_MidCategoryArray[y_MidSelectValue - 1].id, 3);
      }
    });
    //************************************ 아마존, 대카테고리 기록자 클릭 *********************************
    $("#a_MidSelector").click(function() {
      //카테고리단
      a_TopSelector.children().remove();
      a_TopSelector.append("<a href='#'>" + a_TopCategoryArray[a_TopSelectValue - 1].cateName + "</a>"); //main 세부항목 만들기
      //상품단
      ScreenInit('a'); //아마존 기존 자료 초기화
      if (submitButtonClickCheck) { //검색한 경우
        var temp = [String(a_TopCategoryArray[a_TopSelectValue - 1].id)];
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/amazon_searched', '?keyword=', $("#input").val(), temp, 2);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/amazon_selected_ranking', "?genreId=", a_TopCategoryArray[a_TopSelectValue - 1].id, 2);
      }
    });
    DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", 0, 1); //라쿠텐 초기 데이터 호출
    DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/amazon_selected_ranking', "?genreId=", 0, 2); //아마존 초기 데이터 호출
    DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', "?genreId=", 0, 3); //야후 초기 데이터 호출
    CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/amazon_cate", '', '', 3); //아마존 초기 대카테고리 호출
    CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/yahoo_cate", '', '', 4); //야후 초기 대카테고리 호출

  });

  for (i = 0; i < r_TopCategoryArray.length; i++) { //라쿠텐, 초기 대카테고리 데이터 등록
    r_TopCategorySelectBox.append("<option value='" + r_TopCategoryArray[i].id + "'>" + r_TopCategoryArray[i].cateName + "</option>");
  }

  //*************************** 카테고리 선택하는 경우 ***************************************
  //*********** 라쿠텐 대 셀렉박스 선택 후 중 셀렉박스 생성  ******************************
  $(document).on("change", "select[name='r_TopCategorySelectBox']", function() { //대 셀렉박스 클릭
    $("option:selected", this).each(function() { // 대 셀렉박스의 값을 고른 상황
      r_TopSelectValue = $(this).val(); //대 셀렉박스 선택한 값
      //카테고리단
      r_TopSelectorClickInit(); //라쿠텐, 중,소 기록자 셀렉박스 초기화
      if(r_TopSelectValue!=0){
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/rakuten_cate", '', '', 1); //라쿠텐 중 셀렉박스 저장 및 출력
      //상품단
      PrintChoiceRequest(); // 중카테고리 선택해달라는 문구 출력(라쿠텐의 경우 중카테고리 까지 클릭해야 상품 나옴)
      }
    });
  });
  //*********** 라쿠텐 중 셀렉박스 선택 후 소 셀렉박스 생성  ******************************
  $(document).on("change", "select[name='r_MidCategorySelectBox']", function() { //중 셀렉박스 클릭
    $("option:selected", this).each(function() { //중 셀렉박스의 값을 고른 상황
      r_MidSelectValue = $(this).val(); //중 셀렉박스 선택한 값
      //카테고리단
      r_MidSelectorClickInit(); //라쿠텐, 소 기록자 셀렉박스 초기화
      if(r_MidSelectValue!=0){
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/rakuten_cate", '', '', 2); //라쿠텐 소 셀렉박스 저장 및 출력
      //상품단
      ScreenInit('r'); //기존 자료 자료들 지우기
      if (submitButtonClickCheck) { //중카테고리로 검색할 경우,키워드와 r_ChildrenId(하위카테고리 장르아이디+본인 장르아이디)를 넘겨줘야함
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), r_ChildrenId, 1);
      } else { //검색 안한 경우, 장르 아이디만 넘겨주면
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", r_MidCategoryArray[r_MidSelectValue - 1].id, 1);
      }
    }
    });
  });
  //*********** 라쿠텐 소 셀렉박스 선택 ******************************
  $(document).on("change", "select[name='r_BtmCategorySelectBox']", function() { //소 셀렉박스 클릭
    $("option:selected", this).each(function() { //소 셀렉박스의 값을 고른 상황
      r_BtmSelectValue = $(this).val(); // 소 셀렉박스 선택한 값
      //카테고리단
      r_BtmSelectorClickInit(); //라쿠텐, 소 기록자 초기화
      if(r_BtmSelectValue!=0){
      //상품단
      ScreenInit('r'); //기존 자료 지우기
      if (submitButtonClickCheck) { //소카테고리로 검색한 경우, 해당 장르아이디만 넘겨주면 (밑에 하위카테고리가 있는 경우를 제외하고는 해당 장르아이디만 넘겨주면 됌)
        var temp = [String(r_BtmCategoryArray[r_BtmSelectValue - 1].id)]; //검색으로 ajax하는 경우 배열로 보내줘야 함
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/rakuten_searched', '?keyword=', $("#input").val(), temp, 1);
      } else {
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', "?genreId=", r_BtmCategoryArray[r_BtmSelectValue - 1].id, 1);
      }
    }
    });
  });
  //*********** 아마존 대 셀렉박스 선택  ******************************
  $(document).on("change", "select[name='a_TopCategorySelectBox']", function() { //대 셀렉박스 클릭
    $("option:selected", this).each(function() { //대 셀렉박스의 값을 고른 상황
      a_TopSelectValue = $(this).val(); // 대 셀렉박스 선택한 값
      //카테고리단
      a_TopSelector.children().remove(); //아마존, 대 기록자 초기화
      if(a_TopSelectValue!=0){
      a_TopSelector.append("<a href='#'>" + a_TopCategoryArray[a_TopSelectValue - 1].cateName + "</a>");
      //상품단
      ScreenInit('a'); //아마존 기존 자료 지우기
      if (submitButtonClickCheck) { //검색한 경우
        temp = [String(a_TopCategoryArray[a_TopSelectValue - 1].id)];
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/amazon_searched', '?keyword=', $("#input").val(), temp, 2);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/amazon_selected_ranking', "?genreId=", a_TopCategoryArray[a_TopSelectValue - 1].id, 2);
      }
    }
    });
  });

  //*********** 야후 대 셀렉박스 선택 후 중 셀렉박스 생성  ******************************
  $(document).on("change", "select[name='y_TopCategorySelectBox']", function() { //대 셀렉박스 클릭
    $("option:selected", this).each(function() { //대 셀렉박스의 값을 고른 상황
      y_TopSelectValue = $(this).val(); // 대 셀렉박스 선택한 값
      //카테고리단
      y_TopSelectorBoxInit(); //야후, 중 기록자 셀렉박스 초기화
      if(y_TopSelectValue!=0){
      CategorystoragePrintAjax("http://ubuntu@54.199.177.237:5000/yahoo_cate", '', '', 5); //두번째 카테고리 생성
      //상품단
      ScreenInit('y'); //야후 기존 상품단 기존 자료 초기화
      if (submitButtonClickCheck) { //검색한 경우
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/yahoo_searched', '?keyword=', $("#input").val(), y_ChildrenId, 3);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', "?genreId=", y_TopCategoryArray[y_TopSelectValue - 1].id, 3);
      }
    }
    });
  });
  //*********** 야후 중 셀렉박스 선택 후 소 셀렉박스 생성  ******************************
  $(document).on("change", "select[name='y_MidCategorySelectBox']", function() { //중 셀렉박스 클릭
    $("option:selected", this).each(function() { //중 셀렉박스의 값을 고른 상황
      y_MidSelectValue = $(this).val(); // 중 셀렉박스 선택한 값
      //카테고리단
      y_Second_cate_click(); //야후, 소 기록자 셀렉박스 초기화
      //상품단
      if(y_MidSelectValue!=0){
      ScreenInit('y'); //야후 기존 상품단 기존 자료 초기화
      if (submitButtonClickCheck) { //검색한 경우
        var temp = [String(y_MidCategoryArray[y_MidSelectValue - 1].id)];
        KeywordSendingAjax('http://ubuntu@54.199.177.237:5000/yahoo_searched', '?keyword=', $("#input").val(), temp, 3);
      } else { //검색 안한 경우
        DatastoragePrintAjax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', "?genreId=", y_MidCategoryArray[y_MidSelectValue - 1].id, 3);
      }
    }
    });
  });
  //*****************************************************************************여기서 부터 함수단 ***************************************************************
  //현재 화면 및 변수 초기화
  function ScreenInit(what) {
    if (what.includes('r')) {
      $("#r_ItemScreen").empty(); //화면에 있는 상품 초기화
      $("#r_PrintChoiceRequest").empty(); //'중카테고리 선택해주세요' 초기화
      r_count = 0; //데이터 카운트 변수
      r_sentence_checkInbigcate = false;
      r_ImageUrl = [];
      r_name = [];
      r_price = [];
      r_ReviewAvgValue = [];
      r_TotalReviewCount = [];
      r_itemLinkUrl = [];
    }
    if (what.includes('a')) {
      $("#a_ItemScreen").empty();
      a_count = 0;
      r_sentence_checkInbigcate = false;
      a_ImageUrl = [];
      a_name = [];
      a_itemLinkUrl = [];
    }
    if (what.includes('y')) {
      $("#y_ItemScreen").empty();
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
  //flask와 연결후 상품 출력 해주는 함수
  function DatastoragePrintAjax(baseUrl, parameter, id, number) { //flask와 연결함
    $.ajax({
      type: "GET",
      dataType: 'JSON',
      url: baseUrl + parameter + id,
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
  //flask와 연결후 카테고리 출력 해주는 함수
  function CategorystoragePrintAjax(baseUrl, parameter, id, number) {
    $.ajax({
      type: "GET",
      dataType: 'JSON',
      url: baseUrl + parameter + id,
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
  //넘겨준 키워드로 상품 출력 해주는 함수 only 검색
  function KeywordSendingAjax(baseUrl, parameter, id, key, number) {
    if (key.length == 1) {
      key.push(key.toString()); //데이터가 1개로 갈 경우 오류가 나고 중복은 상관 없음
    }
    var js_key = JSON.stringify(key); //이렇게 해서 data에 넣어줘야 flask가 읽음
    $.ajax({
      async: false,
      type: 'POST',
      url: baseUrl + parameter + id,
      data: js_key,
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
        if (data.length != 0) {
          switch (number) {
            case 1:
              r_DataStore_printItem(data); //라쿠텐 정보 저장 및 출력
              break;
            case 2:
              a_DataStore_printItem(data);
              break;
            case 3:
              y_DataStore_printItem(data);
              break;
          }
        } else making_undefined(number); //찾지 못했다고 출력해줌
      }
    });
  }
  //라쿠텐, 디비에서 가져온 정보 저장 및 출력 및 스크롤 기능
  function r_DataStore_printItem(result) {
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
      r_MakingiteminfoPrint(); //상품 정보 1개 만든 후 출력
    }
    window.onscroll = function() { //스크롤 할 경우
      scroll_Throw(); //스크롤에 따라 5개씩 출력
    };
  }
  //라쿠텐, DB에서 가져온 정보로 아이템 1개의 정보를 DIV에 담아 출력
  function r_MakingiteminfoPrint() {
    //*****************상품 이미지 *****************
    var img = document.createElement("IMG");
    img.setAttribute("style", "margin-left: auto; margin-right: auto; display: block;");
    img.setAttribute("src", r_ImageUrl[r_count]);
    // img.setAttribute("width", width);
    img.setAttribute("height", height);
    //*****************상품 순위 *****************
    var num = document.createElement("P");
    num.setAttribute("style", "font-size:18px; color:red;");
    num.innerHTML = r_count + 1 + "位";
    //*****************상품 링크 *****************
    var item_link = document.createElement("a");
    item_link.setAttribute("style", "text-decoration: none; color:#0080FF");
    item_link.href = r_itemLinkUrl[r_count]; //링크 연결
    item_link.appendChild(img);
    var item_linkText = document.createTextNode(r_name[r_count]); //링크 이름
    item_link.appendChild(item_linkText);
    //*****************리뷰 링크 *****************
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
    //*****************상품 담기 *****************
    var div = document.createElement("DIV"); //아이템 정보를 담을 그릇
    div.setAttribute("style", " text-align:center; display:inline-block; width:100%; height:30%;");
    div.appendChild(num); //순위 담기
    div.appendChild(item_link); // 아이템 링크 담기
    div.innerHTML += r_price[r_count]; // 아이템 가격 담기
    div.appendChild(review_link); //리뷰 링크 담기
    //****************화면에 뿌리기 *****************
    document.getElementById("r_ItemScreen").appendChild(div); //라쿠텐에 아이템 뿌리기
    r_count++; // 개수 파악
  }
  //5개씩 뿌려주는 기능 구현
  function scroll_Throw() {
    var scrolltop = $(window).scrollTop();
    if (scrolltop == $(document).height() - $(window).height()) {
      scroll_count++;
      for (i = 0; i < 5; i++) {
        if (r_count != r_ImageUrl.length)
          r_MakingiteminfoPrint();
        if (y_count != y_ImageUrl.length)
          y_MakingiteminfoPrint();
        if (a_count != a_ImageUrl.length)
          a_MakingiteminfoPrint();
      }
    }
  }
  //아마존, 디비에서 가져온 정보 저장 및 일부 출력
  function a_DataStore_printItem(result) {
    for (i in result) {
      a_ImageUrl.push(result[i].mediumImageUrls);
      a_name.push(result[i].itemName);
      a_itemLinkUrl.push(result[i].itemUrl);
    }
    for (i = 0; i < 5 * scroll_count; i++) {
      if (i == a_name.length) break;
      a_MakingiteminfoPrint();
    }
  }
  //아마존, DB에서 가져온 정보로 아이템 1개의 정보를 DIV에 담아 출력
  function a_MakingiteminfoPrint() {
    //*****************상품 이미지 *****************
    var img = document.createElement("IMG");
    img.setAttribute("style", "margin-left: auto; margin-right: auto; display: block;");
    img.setAttribute("src", a_ImageUrl[a_count]);
    img.setAttribute("height", height);
    //*****************상품 순위 *****************
    var num = document.createElement("P");
    num.setAttribute("style", "font-size:18px; color:red;");
    num.innerHTML = a_count + 1 + "位";
    //*****************상품 링크 *****************
    var link = document.createElement("a");
    var linkText = document.createTextNode(a_name[a_count]);
    link.setAttribute("style", "text-decoration: none; color:#0080FF");
    link.appendChild(img);
    link.href = a_itemLinkUrl[a_count];
    link.appendChild(linkText);
    //*****************상품 담기 *****************
    var div = document.createElement("DIV");
    div.setAttribute("style", " text-align:center; display:inline-block; width:100%; height:30%;");
    div.appendChild(num);
    div.appendChild(link);
    //****************화면에 뿌리기 *****************
    document.getElementById("a_ItemScreen").appendChild(div);
    a_count++;
  }
  //야후 디비에서 가져온 데이터 저장 및 일부 출력
  function y_DataStore_printItem(result) {
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
      y_MakingiteminfoPrint();
    }
  }
  //*****************야후************
  function y_MakingiteminfoPrint() {
    //*****************상품 이미지 *****************
    var img = document.createElement("IMG");
    img.setAttribute("style", "margin-left: auto; margin-right: auto; display: block;");
    img.setAttribute("src", y_ImageUrl[y_count]);
    img.setAttribute("height", height);
    //*****************상품 순위 *****************
    var num = document.createElement("P");
    num.setAttribute("style", "font-size:18px; color:red;");
    num.innerHTML = y_count + 1 + "位";
    //*****************상품 링크 *****************
    var item_link = document.createElement("a");
    item_link.setAttribute("style", "text-decoration: none; color:#0080FF");
    item_link.href = y_itemLinkUrl[y_count];
    item_link.appendChild(img);
    var item_linkText = document.createTextNode(y_name[y_count]);
    item_link.appendChild(item_linkText);
    //*****************리뷰 링크 *****************
    var review_link = document.createElement("a");
    review_link.setAttribute("style", "text-decoration: none; color:black;");
    review_link.href = y_itemLinkUrl[y_count] + "#itmrvwfl";
    //*******************평균 리뷰 값으로 별 만들기**************************
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
    //*****************상품 담기 *****************
    var div = document.createElement("DIV");
    div.setAttribute("style", " text-align:center; display:inline-block; width:100%; height:30%;");
    div.appendChild(num);
    div.appendChild(item_link);
    div.innerHTML += y_price[y_count];
    div.appendChild(review_link);
    //****************화면에 뿌리기 *****************
    document.getElementById("y_ItemScreen").appendChild(div);
    y_count++;
  }
  // 디비에 데이터가 없는 경우 출력
  function making_undefined(number) {
    var div = document.createElement("DIV");
    div.setAttribute("style", " text-align:center; display:inline-block; margin-top:2%;");
    div.innerHTML += "cannot found it";
    switch (number) {
      case 1:
        document.getElementById("r_ItemScreen").appendChild(div);
        break;
      case 2:
        document.getElementById("a_ItemScreen").appendChild(div);
        break;
      case 3:
        document.getElementById("y_ItemScreen").appendChild(div);
        break;
    }
  }
  //라쿠텐, 대 선택자 클릭시 초기화 시킬 정보 담은 함수
  function r_TopSelectorClickInit() {
    //기록자 초기화
    r_TopSelector.children().remove();
    r_MidSelector.children().remove();
    r_BtmSelector.children().remove();
    if(r_TopSelectValue!=0)
    r_TopSelector.append("<a href='#'>" + r_TopCategoryArray[r_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    //셀렉박스 초기화
    r_MidCategorySelectBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    r_BtmCategorySelectBox.children().remove(); //세번째 셀렉트 박스를 초기화 시킨다.
    r_MidCategorySelectBox.append("<option value=''>中カテゴリ</option>"); //두 세번째 베이스값 만들기
    r_BtmCategorySelectBox.append("<option value=''>ソカテゴリ</option>");
  }
  // 라쿠텐에서 대 셀렉박스 선택할 경우 보여주는 문장 출력 함수
  function PrintChoiceRequest() {
    if (r_sentence_checkInbigcate == false) { //대 카테고리를 계속 바꿀 경우엔 출력하면 안됌
      ScreenInit('r');
      var div = document.createElement("DIV");
      div.setAttribute("style", " text-align:center; display:inline-block; width:100%; height:30%;");
      div.innerHTML = "中カテゴリを選択してください。";
      document.getElementById("r_ItemScreen").append(div); //
      r_sentence_checkInbigcate = true; //화면에 출력한 경우 다시 값을 변경해줌.
    }
  }
  //라쿠텐, 중 선택자 클릭시 초기화 시킬 정보 담은 함수
  function r_MidSelectorClickInit() {
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
  }
  //라쿠텐, 소 선택자 클릭시 초기화 시킬 정보 담은 함수
  function r_BtmSelectorClickInit() {
    //기록자 초기화
    r_BtmSelector.children().remove();
    for (var i = 0; i < r_BtmCategoryArray.length; i++) {
      if (r_TopSelectValue == r_BtmCategoryArray[i].main_category_id && r_MidSelectValue == r_BtmCategoryArray[i].sub_category_id && r_BtmSelectValue == r_BtmCategoryArray[i].thr_category_id) {
        r_BtmSelector.append("<a href='#'>" + r_BtmCategoryArray[i].cateName + "</a>");
        break;
      }
    }
  }

  //야후, 대 선택자 클릭시 초기화 시킬 정보 담은 함수
  function y_TopSelectorBoxInit() {
    //기록자 초기화
    y_TopSelector.children().remove();
    y_MidSelector.children().remove();
    if(y_TopSelectValue!=0)
    y_TopSelector.append("<a href='#'>" + y_TopCategoryArray[y_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    //셀렉박스 초기화
    y_MidCategorySelectBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    y_MidCategorySelectBox.append("<option value=''>中カテゴリ</option>"); //두 세번째 베이스값 만들기

  }
  //야후, 중 선택자 클릭시 초기화 시킬 정보 담은 함수
  function y_Second_cate_click() {
    y_MidSelector.children().remove();
    for (var i = 0; i < y_MidCategoryArray.length; i++) { //두번째 세부항목을 넣어보자.
      if (y_TopSelectValue == y_MidCategoryArray[i].main_category_id && y_MidSelectValue == y_MidCategoryArray[i].sub_category_id) {
        y_MidSelector.append("<a href='#'>" + y_MidCategoryArray[i].cateName + "</a>");
        break;
      }
    }
  }
  //라쿠텐 대 카테고리 하드코딩
  function r_TopCategorySelectBoxWrite() {
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
  //라쿠텐, 중 셀렉박스 데이터저장 함수
  function r_MidCategoryStorage(result) {
    r_MidCategoryArray = new Array(); // 기존의 데이터 날려야 함.
    result.filter(function(element) { // children안에 하위 카테고리 id가 들어가 있어서, 각 id와 일치하는 정보를 뽑아내야 한다.
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
  //라쿠텐, 소 셀렉박스 데이터저장 함수
  function r_BtmCategoryStorage(result) {
    r_ChildrenId = new Array();
    r_BtmCategoryArray = new Array();
    result.filter(function(element) { //childrend의 장르아이디와 본인의 장르 아이디는 키워드 검색시, 하위 정보까지 알아야 하는 경우 사용한다. ex)라쿠텐 중카테고리에서 검색할 경우, 소카테고리의 데이터도 보여줘야함
      for (var j = 0; j < r_MidCategoryArray[r_MidSelectValue - 1].children.length; j++) {
        if (element.id == r_MidCategoryArray[r_MidSelectValue - 1].children[j]) {
          r_ChildrenId.push(String(element.id)); // children의 장르아이디만 따로 뽑는다.
          element.main_category_id = String(r_TopSelectValue);
          element.sub_category_id = String(r_MidSelectValue);
          element.thr_category_id = String(j + 1);
          r_BtmCategoryArray.push(element);
          r_BtmCategorySelectBox.append("<option value='" + element.thr_category_id + "'>" + element.cateName + "</option>");
        }
      }
    });
    r_ChildrenId.push(String(r_MidCategoryArray[r_MidSelectValue - 1].id)); // 본인 장르아이디까지 저장.
  }
  //아마존, 대 셀렉박스 데이터저장 함수
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
  //야후, 대 셀렉박스 데이터저장 함수
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
  //야후, 중 셀렉박스 데이터저장 함수
  function y_MidCategoryStorage(result) {
    y_ChildrenId = new Array();
    y_MidCategoryArray = new Array();
    result.filter(function(element) {
      for (var j = 0; j < y_TopCategoryArray[y_TopSelectValue - 1].children.length; j++) {
        if (element.id == y_TopCategoryArray[y_TopSelectValue - 1].children[j]) {
          //선택된 아이템의 genreId와 children의 장르아이디 한꺼번에 담아서, 검색창에서 입력했을 때 넘겨줘야함.
          y_ChildrenId.push(String(element.id));
          //야후, 두번째 카테고리 데이터 만들기
          element.main_category_id = String(y_TopSelectValue); // 야후 대카테고리 선택된 값이, 두번째 카테고리의 main id가 됨
          element.sub_category_id = String(j + 1);
          y_MidCategoryArray.push(element);
          y_MidCategorySelectBox.append("<option value='" + element.sub_category_id + "'>" + element.cateName + "</option>");
        }
      }
    });
    y_ChildrenId.push(String(y_TopCategoryArray[y_TopSelectValue - 1].id));
  }
});
