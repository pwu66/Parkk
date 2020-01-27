  var searchButtonClickCheck = false; //검색란 입력 판단 변수
  var priceButtonClickCheck = false; //검색란 입력 판단 변수
  var height = 160; //제품 이미지 높이 사이즈
  var i = 0; //반복문 사용 변수
  var j = 0; //반복문 사용 변수
  var min = 0;
  var max = 999999999;
  var r_count = 0; // 라쿠텐, 화면에 뿌려지는 아이템 카운트 변수
  var a_count = 0; // 아마존, 화면에 뿌려지는 아이템 카운트 변수
  var y_count = 0; // 야후, 화면에 뿌려지는 아이템 카운트 변수
  var temp_count = 0; // 임시 카운트 변수
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
  var sortSelectValue = 0;
  var a_ImageUrl = []; //아마존
  var a_name = [];
  var a_itemLinkUrl = [];
  var a_price = [];
  var a_ReviewAvgValue = [];
  var a_TotalReviewCount = [];
  var a_TopSelectValue = 1;
  var a_MidSelectValue = 0;
  var r_ChildrenId = new Array();
  var a_ChildrenId = new Array();
  var y_ChildrenId = new Array();
  var r_TopCategoryArray = new Array(); //라쿠텐, 대카테고리 저장 배열
  var r_TopCategoryObject = new Object(); //라쿠텐, 대카테고리 저장을 위한 오브젝트
  var r_MidCategoryArray = new Array(); //라쿠텐, 중카테고리 저장 배열
  var r_BtmCategoryArray = new Array(); //라쿠텐, 소 카테고리 저장 배열
  var y_TopCategoryArray = new Array();
  var y_MidCategoryArray = new Array();
  var a_TopCategoryArray = new Array();
  var a_MidCategoryArray = new Array();
  var sortCategoryArray = new Array();
  var sortCategoryObject = new Object();
  var r_TopSelector = $("span[name='r_TopSelector']"); // 라쿠텐, 대카테고리 클릭시 위에 뜨는 기록
  var r_MidSelector = $("span[name='r_MidSelector']"); // 라쿠텐, 중카테고리 클릭시 위에 뜨는 기록
  var r_BtmSelector = $("span[name='r_BtmSelector']"); // 라쿠텐, 소카테고리 클릭시 위에 뜨는 기록
  var y_TopSelector = $("span[name='y_TopSelector']");
  var y_MidSelector = $("span[name='y_MidSelector']");
  var a_TopSelector = $("span[name='a_TopSelector']");
  var a_MidSelector = $("span[name='a_MidSelector']");
  var r_TopCategoryBox = $("select[name='r_TopCategoryBox']"); //라쿠텐, 대 카테고리 selectbox
  var r_MidCategoryBox = $("select[name='r_MidCategoryBox']"); //라쿠텐, 중 카테고리 selectbox
  var r_BtmCategoryBox = $("select[name='r_BtmCategoryBox']"); //라쿠텐, 소 카테고리 selectbox
  var y_TopCategoryBox = $("select[name='y_TopCategoryBox']");
  var y_MidCategoryBox = $("select[name='y_MidCategoryBox']");
  var a_TopCategoryBox = $("select[name='a_TopCategoryBox']");
  var a_MidCategoryBox = $("select[name='a_MidCategoryBox']");
  var sortCategoryBox = $("select[name='sortCategoryBox']");
  var totalObject = new Object();

  //****************************초기 화면 데이터 *******************************
  //카테고리단 등록
  r_TopCategoryBoxEnroll(); //라쿠텐 대카테고리 하드코딩 값 입력
  for (i = 0; i < r_TopCategoryArray.length; i++) { //라쿠텐, 초기 대카테고리 데이터 등록
    r_TopCategoryBox.append("<option value='" + r_TopCategoryArray[i].id + "'>" + r_TopCategoryArray[i].cateName + "</option>");
  }
  //CategoryPrintAjax(sequence,number) -> sequence:라쿠텐 =1, 아마존=2,야후=3 ,number: 1:라쿠텐 중 2:라쿠텐 소 3:아마존 대 4:아마존 중 5:야후 대 6:야후 중
  CategoryPrintAjax(2, 3); //아마존 초기 대카테고리 호출
  CategoryPrintAjax(3, 5); //야후 초기 대카테고리 호출
  //분류단(sort) 등록
  SortingCatergoryEnroll(); //정렬 값 하드코딩
  for (i = 0; i < sortCategoryArray.length; i++) { // sort category 등록
    sortCategoryBox.append("<option value='" + sortCategoryArray[i].id + "'>" + sortCategoryArray[i].cateName + "</option>");
  }
  //상품단 등록
  //ProductPrintAjax(sequence,gId) -> sequence:라쿠텐 =1, 아마존=2,야후=3 ,gId: genreId
  ProductPrintAjax(1); //라쿠텐 초기 데이터 호출 , 전체 ranking은 genreId =0 임
  ProductPrintAjax(2); //아마존 초기 데이터 호출, 아마존 같은 경우 전체 ranking이 없어서, 첫번째 상품 데이터 호출
  ProductPrintAjax(3); //야후 초기 데이터 호출
  //최근 본 상품 데이터 출력
  printAllRecentItem();

  /*
  목차
  0.초기 화면 데이터
   -카테고리
   -sort
   -상품
   -최근 본 상품
  1. 검색 제출 클릭한 경우
  2.카테고리 박스 선택
    1-1 라쿠텐 (대,중,소)
    1-2 아마존 (중,소)
    1-3 야후  (중,소)
  3.기록자 선택
    2-1 라쿠텐 (대,중,소)
    2-2 아마존 (중,소)
    2-3 야후  (중,소)
  4.sort 선택
  5.함수 모음
  */

  //가격 입력
  $("#price_input").click(function() {
    ScreenInit('ray'); //기존 화면의 데이터 아마존,라쿠텐,야후 모두 초기화
    priceButtonClickCheck = true;
    if (searchButtonClickCheck) {
      KeywordSendingAjax(1);
      KeywordSendingAjax(2);
      KeywordSendingAjax(3);
    } else { //검색 안한 경우, 장르 아이디만 넘겨주면
      ProductPrintAjax(1);
      ProductPrintAjax(2);
      ProductPrintAjax(3);
    }
  });
  //****************************검색창 제출란 클릭*******************************
  $("#searchSubmit").click(function() {
    //모든 데이터 초기화
    ScreenInit('ary'); //기존 화면의 데이터 아마존,라쿠텐,야후 모두 초기화
    if ($("#searchBox").val() == 0) { //내용 공란
      alert("検索キーワードが空欄です。キーワードを入力して検索してください。");
    } else { //내용 존재
      searchButtonClickCheck = true; //submit 클릭 여부 저장
      scroll_count = 1; // 화면에 뿌리는 횟수 저장. 처음 1로 지정

      //*********** rakuten ***********
      //카테고리단
      r_TopSelectorClickInit(); //라쿠텐, 중,소 기록자 셀렉박스 초기화 (비슷한 역할의 함수가 있어서 썼음)
      r_TopSelector.children().remove(); //대 기록자 초기화
      r_TopCategoryBox.children().remove(); //대 셀렉박스 초기화
      r_TopCategoryBox.append("<option value=''>大カテゴリ</option>");
      for (i = 0; i < r_TopCategoryArray.length; i++) { //라쿠텐,  대 셀렉박스 데이터 출력
        r_TopCategoryBox.append("<option value='" + r_TopCategoryArray[i].id + "'>" + r_TopCategoryArray[i].cateName + "</option>");
      }
      //상품단
      //KeywordSendingAjax(sequence) -> sequence:라쿠텐 =1, 아마존=2,야후=3
      KeywordSendingAjax(1); //라쿠텐, 전체 검색
      //*********** amazon ***********
      //카테고리단
      a_TopSelectorClickInit(); //아마존, 중,소 기록자 셀렉박스 초기화
      a_TopSelector.children().remove(); //대 기록자 초기화
      a_TopCategoryBox.children().remove(); // 아마존, 대 셀렉박스 초기화
      a_TopSelectValue = 0; //초기값을 1로 해뒀기에, submit하면 0으로 바꿔줘야 키워드 검색 후 sort 한 후에 문제 안생김.
      a_TopCategoryBox.append("<option value=''>大カテゴリ</option>");
      CategoryPrintAjax(2, 3); //아마존 대 셀렉박스 데이터 저장 및 출력
      //상품단
      KeywordSendingAjax(2); //아마존
      //*********** yahoo ***********
      //카테고리단
      y_TopSelectorClickInit(); //야후, 중 기록자 셀렉박스 초기화
      y_TopSelector.children().remove(); //대 기록자 초기화
      y_TopCategoryBox.children().remove(); // 야후, 대 셀렉박스 초기화
      y_TopCategoryBox.append("<option value=''>大カテゴリ</option>");
      CategoryPrintAjax(3, 5); //야후 대 셀렉박스 데이터 저장 및 출력
      //상품단
      KeywordSendingAjax(3); //야후
    }
  });
  //*************************** 라쿠텐 ***************************************
  //************************** 라쿠텐, 대카테고리 기록자**************************
  $("#r_TopSelector").click(function() {
    //카테고리단
    r_TopSelectorClickInit(); //라쿠텐, 중,소 기록자 셀렉박스 초기화
    ScreenInit('r'); //기존 자료 자료들 지우기
    if (r_TopSelectValue != 0) {
      CategoryPrintAjax(1, 1); //라쿠텐 중 셀렉박스 저장 및 출력
      //상품단
      if (searchButtonClickCheck) { //검색어 제출한 경우
        KeywordSendingAjax(1);
      } else { //검색 안한 경우
        ProductPrintAjax(1);
      }
    }
  });
  //*********** 라쿠텐 대 셀렉박스 선택 후 중 셀렉박스 생성  ******************************
  $(document).on("change", "select[name='r_TopCategoryBox']", function() { //대 셀렉박스 클릭
    $("option:selected", this).each(function() { // 대 셀렉박스의 값을 고른 상황
      r_TopSelectValue = $(this).val(); //대 셀렉박스 선택한 값
      //카테고리단
      r_TopSelectorClickInit(); //라쿠텐, 중,소 기록자 셀렉박스 초기화
      ScreenInit('r');
      if (r_TopSelectValue != 0) {
        CategoryPrintAjax(1, 1); //라쿠텐 중 셀렉박스 저장 및 출력
        //상품단
        if (searchButtonClickCheck) {
          KeywordSendingAjax(1);
        } else {
          ProductPrintAjax(1);
        }
      }
    });
  });
  //************************************ 라쿠텐, 중카테고리 기록자 클릭 *********************************
  $("#r_MidSelector").click(function() {
    //카테고리단
    r_MidSelectorClickInit(); //라쿠텐, 소 기록자 셀렉박스 초기화
    if (r_MidSelectValue != 0) {
      CategoryPrintAjax(1, 2); //라쿠텐 소 셀렉박스 저장 및 출력
      //상품단
      ScreenInit('r');
      if (searchButtonClickCheck) {
        KeywordSendingAjax(1);
      } else {
        ProductPrintAjax(1);
      }
    }
  });

  //*********** 라쿠텐 중 셀렉박스 선택 후 소 셀렉박스 생성  ******************************
  $(document).on("change", "select[name='r_MidCategoryBox']", function() { //중 셀렉박스 클릭
    $("option:selected", this).each(function() { //중 셀렉박스의 값을 고른 상황
      r_MidSelectValue = $(this).val(); //중 셀렉박스 선택한 값
      //카테고리단
      r_MidSelectorClickInit(); //라쿠텐, 소 기록자 셀렉박스 초기화
      if (r_MidSelectValue != 0) {
        CategoryPrintAjax(1, 2); //라쿠텐 소 셀렉박스 저장 및 출력
        //상품단
        ScreenInit('r');
        if (searchButtonClickCheck) {
          KeywordSendingAjax(1);
        } else {
          ProductPrintAjax(1);
        }
      }
    });
  });

  //************************************ 라쿠텐, 소카테고리 기록자 클릭 *********************************
  $("#r_BtmSelector").click(function() { // 라쿠텐, 상단 소카테고리 기록자 클릭
    //카테고리단
    r_BtmSelectorClickInit(); //라쿠텐, 소 기록자 초기화
    if (r_BtmSelectValue != 0) {
      //상품단
      ScreenInit('r');
      if (searchButtonClickCheck) {
        KeywordSendingAjax(1);
      } else {
        ProductPrintAjax(1);
      }
    }
  });
  //*********** 라쿠텐 소 셀렉박스 선택 ******************************
  $(document).on("change", "select[name='r_BtmCategoryBox']", function() { //소 셀렉박스 클릭
    $("option:selected", this).each(function() { //소 셀렉박스의 값을 고른 상황
      r_BtmSelectValue = $(this).val(); // 소 셀렉박스 선택한 값
      //카테고리단
      r_BtmSelectorClickInit(); //라쿠텐, 소 기록자 초기화
      if (r_BtmSelectValue != 0) {
        //상품단
        ScreenInit('r');
        if (searchButtonClickCheck) {
          KeywordSendingAjax(1);
        } else {
          ProductPrintAjax(1);
        }
      }
    });
  });
  //************************************ 아마존, 대카테고리 기록자 클릭 *********************************
  $("#a_TopSelector").click(function() {
    //카테고리단
    a_TopSelectorClickInit(); //아마존, 대 기록자 초기화
    if (a_TopSelectValue != 0) {
      CategoryPrintAjax(2, 4); //아마존 중 셀렉박스 저장 및 출력
      //상품단
      ScreenInit('a');
      if (searchButtonClickCheck) { //검색한 경우
          KeywordSendingAjax(2);
      } else { //검색 안한 경우
          ProductPrintAjax(2);
      }
    }
  });

  //*********** 아마존 대 셀렉박스 선택  ******************************
  $(document).on("change", "select[name='a_TopCategoryBox']", function() { //대 셀렉박스 클릭
    $("option:selected", this).each(function() { //대 셀렉박스의 값을 고른 상황
      a_TopSelectValue = $(this).val(); // 대 셀렉박스 선택한 값
      //카테고리단
      a_TopSelectorClickInit(); //아마존, 대 기록자 초기화
      if (a_TopSelectValue != 0) {
        CategoryPrintAjax(2, 4); //아마존 중 셀렉박스 저장 및 출력
        //상품단
        ScreenInit('a');
        if (searchButtonClickCheck) { //검색한 경우
            KeywordSendingAjax(2);
        } else { //검색 안한 경우
            ProductPrintAjax(2);
        }
      }
    });
  });
  //************************************ 아마존, 중카테고리 기록자 클릭 *********************************
  $("#a_MidSelector").click(function() {
    //카테고리단
    a_MidSelectorBoxClickInit(); //아마존, 중 기록자 & 셀렉박스 초기화
    //상품단
    if (a_MidSelectValue != 0) {
      ScreenInit('a');
      if (searchButtonClickCheck) { //검색한 경우
          KeywordSendingAjax(2);
      } else { //검색 안한 경우
          ProductPrintAjax(2);
      }
    }
  });
  //*********** 아마존 중 셀렉박스 선택  ******************************
  $(document).on("change", "select[name='a_MidCategoryBox']", function() { //중 셀렉박스 클릭
    $("option:selected", this).each(function() { //중 셀렉박스의 값을 고른 상황
      a_MidSelectValue = $(this).val(); // 중 셀렉박스 선택한 값
      //카테고리단
      a_MidSelectorBoxClickInit(); //아마존, 중 기록자 &셀렉박스 초기화
      //상품단
      if (a_MidSelectValue != 0) {
        ScreenInit('a');
        if (searchButtonClickCheck) { //검색한 경우
            KeywordSendingAjax(2);
        } else { //검색 안한 경우
            ProductPrintAjax(2);
        }
      }
    });
  });
  //************************************ 야후, 대카테고리 기록자 클릭 *********************************
  $("#y_TopSelector").click(function() {
    //카테고리단
    y_TopSelectorClickInit(); //야후, 중 기록자 셀렉박스 초기화
    if (y_TopSelectValue != 0) {
      CategoryPrintAjax(3, 6); //야후 중 셀렉박스 저장 및 출력
      //상품단
      ScreenInit('y'); //야후 기존 상품단 기존 자료 초기화
      if (searchButtonClickCheck) { //검색한 경우
          KeywordSendingAjax(3);
      } else { //검색 안한 경우
          ProductPrintAjax(3);
      }
    }
  });

  //*********** 야후 대 셀렉박스 선택 후 중 셀렉박스 생성  ******************************
  $(document).on("change", "select[name='y_TopCategoryBox']", function() { //대 셀렉박스 클릭
    $("option:selected", this).each(function() { //대 셀렉박스의 값을 고른 상황
      y_TopSelectValue = $(this).val(); // 대 셀렉박스 선택한 값
      //카테고리단
      y_TopSelectorClickInit(); //야후, 중 기록자 셀렉박스 초기화
      if (y_TopSelectValue != 0) {
        CategoryPrintAjax(3, 6); //야후 중 셀렉박스 저장 및 출력
        //상품단
        ScreenInit('y'); //야후 기존 상품단 기존 자료 초기화
        if (searchButtonClickCheck) { //검색한 경우
            KeywordSendingAjax(3);
        } else { //검색 안한 경우
            ProductPrintAjax(3);
        }
      }
    });
  });
  // //************************************ 야후, 중카테고리 기록자 클릭 *********************************
  $("#y_MidSelector").click(function() {
    //카테고리단
    y_MidSelectorBoxClickInit(); //야후, 소 기록자 셀렉박스 초기화
    //상품단
    if (y_MidSelectValue != 0) {
      ScreenInit('y'); //야후 기존 상품단 기존 자료 초기화
      if (searchButtonClickCheck) { //검색한 경우
          KeywordSendingAjax(3);
      } else { //검색 안한 경우
          ProductPrintAjax(3);
      }
    }
  });
  //*********** 야후 중 셀렉박스 선택   ******************************
  $(document).on("change", "select[name='y_MidCategoryBox']", function() { //중 셀렉박스 클릭
    $("option:selected", this).each(function() { //중 셀렉박스의 값을 고른 상황
      y_MidSelectValue = $(this).val(); // 중 셀렉박스 선택한 값
      //카테고리단
      y_MidSelectorBoxClickInit(); //야후, 소 기록자 셀렉박스 초기화
      //상품단
      if (y_MidSelectValue != 0) {
        ScreenInit('y'); //야후 기존 상품단 기존 자료 초기화
        if (searchButtonClickCheck) { //검색한 경우
            KeywordSendingAjax(3);
        } else { //검색 안한 경우
            ProductPrintAjax(3);
        }
      }
    });
  });
  //***********  sorting 셀렉박스 선택 ******************************
  $(document).on("change", "select[name='sortCategoryBox']", function() { //분류 셀렉박스 클릭
    $("option:selected", this).each(function() { //분류 셀렉박스의 값을 고른 상황
      sortSelectValue = $(this).val(); // 분류 셀렉박스 선택한 값

      ScreenInit('ray'); //기존 자료 지우기
      //********검색어 입력 한 경우**********
      if (searchButtonClickCheck) {
        //************라쿠텐************
        KeywordSendingAjax(1);
        //************아마존************
        KeywordSendingAjax(2);
        //************야후************
        KeywordSendingAjax(3);
      }
      //********검색어 입력하지 않은 경우 **********
      else {
        //***************라쿠텐***************
        ProductPrintAjax(1);
        //***************아마존***************
        ProductPrintAjax(2);
        //***************야후***************
        ProductPrintAjax(3);
      }
    });
  });

  //*****************************************************************************여기서 부터 함수단 ***************************************************************
  //현재 화면 및 변수 초기화
  function ScreenInit(what) {
    if (what.includes('r')) {
      $("#r_ItemScreen").empty(); //화면에 있는 상품 초기화
      r_count = 0; //상품 출력 횟수 카운트 변수
      r_ImageUrl = []; //이미지 링크
      r_name = []; // 상품 이름
      r_price = []; // 가격
      r_ReviewAvgValue = []; // 리뷰 평균 값
      r_TotalReviewCount = []; //리뷰건수 변수
      r_itemLinkUrl = []; //아이템 링크
    }
    if (what.includes('a')) {
      $("#a_ItemScreen").empty();
      a_count = 0;
      a_ImageUrl = [];
      a_name = [];
      a_price = [];
      a_ReviewAvgValue = [];
      a_TotalReviewCount = [];
      a_itemLinkUrl = [];
    }
    if (what.includes('y')) {
      $("#y_ItemScreen").empty();
      y_count = 0;
      y_ImageUrl = [];
      y_name = [];
      y_price = [];
      y_ReviewAvgValue = [];
      y_TotalReviewCount = [];
      y_itemLinkUrl = [];
    }
  }

  // DB에서 데이터 받아서 상품 출력
  function ProductPrintAjax(sequence) { //flask와 연결함
    var totalUrl;
    var baseUrl;
    var tempId;
    switch (sequence) {
      case 1: //*******라쿠텐************
        baseUrl = 'http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking';
        //아무것도 선택안한경우, 전체
        if (r_TopSelectValue == 0) {
          tempId = 0; //전체
        }
        //대카테고리만 선택한 경우-> 중카테고리의 첫번째 값
        else if (r_MidSelectValue == 0) {
          tempId = r_MidCategoryArray[0].id;
        }
        //중카테고리만 선택한 경우
        else if (r_BtmSelectValue == 0) {
          tempId = r_MidCategoryArray[r_MidSelectValue - 1].id;
        }
        //소카테고리만 선택한 경우
        else {
          tempId = r_BtmCategoryArray[r_BtmSelectValue - 1].id;
        }
        break;
      case 2: //*******아마존************
        baseUrl = 'http://ubuntu@54.199.177.237:5000/amazon_selected_ranking';
        if (a_TopSelectValue == 0) {
          tempId = 1; //전체 검색이 없기에, 제일 첫번째 장르 아이디 넘겨줌.
        }
        //대카테고리만 선택한 경우
        else if (a_MidSelectValue == 0) {
          tempId = a_TopCategoryArray[a_TopSelectValue - 1].id;
        }
        //중카테고리만 선택한 경우
        else {
          tempId = a_MidCategoryArray[a_MidSelectValue - 1].id;
        }
        break;
      case 3://*******야후************
        baseUrl = 'http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking';
        //아무것도 선택안한경우, 전체
        if (y_TopSelectValue == 0) {
          tempId = 0; //전체
        }
        //대카테고리만 선택한 경우
        else if (y_MidSelectValue == 0) {
          tempId = y_TopCategoryArray[y_TopSelectValue - 1].id;
        }
        //중카테고리만 선택한 경우
        else {
          tempId = y_MidCategoryArray[y_MidSelectValue - 1].id;
        }
        break;
    }
    var genreId = "genreId=" + tempId;
    var sort = 'sortnum=' + sortSelectValue;
    min = 'min=' + $('input[name=min]').val();
    max = 'max=' + $('input[name=max]').val();
    if (priceButtonClickCheck) {
      totalUrl = baseUrl + '?' + genreId + '&' + sort + '&' + min + '&' + max;
    } else {
      totalUrl = baseUrl + '?' + genreId + '&' + sort;
    }
    $.ajax({
      type: "GET",
      dataType: 'JSON',
      url: totalUrl,
      async: false,
      success: function(result) {
        switch (sequence) {
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
    });
  }

  //flask와 연결후 카테고리 출력 해주는 함수
  function CategoryPrintAjax(sequence, number) {
    var baseUrl;
    switch (sequence) {
      case 1:
        baseUrl = 'http://ubuntu@54.199.177.237:5000/rakuten_cate';
        break;
      case 2:
        baseUrl = 'http://ubuntu@54.199.177.237:5000/amazon_cate';
        break;
      case 3:
        baseUrl = 'http://ubuntu@54.199.177.237:5000/yahoo_cate';
        break;
      default:
    }
    $.ajax({
      type: "GET",
      dataType: 'JSON',
      url: baseUrl,
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
            a_MidCategoryStorage(result); //아마존 중카테고리 저장
            break;
          case 5:
            y_TopCategoryStorage(result); //야후 대카테고리 저장
            break;
          case 6:
            y_MidCategoryStorage(result); //야후 중카테고리 저장
            break;
        }
      }
    });
  }
  // //넘겨준 키워드로 상품 출력 해주는 함수 only 검색
  function KeywordSendingAjax(sequence) {
    var totalUrl;
    var baseUrl;
    var tempId;
    switch (sequence) {
      case 1://*******라쿠텐************
        baseUrl = 'http://ubuntu@54.199.177.237:5000/rakuten_searched';
        if (r_TopSelectValue == 0) { //아무것도 선택 안한 경우
          tempId = ["0"];
        } else if (r_MidSelectValue == 0) { //대 셀렉박스만 선택한 경우
          tempId = r_MidCategoryArray[0].id;
        } else if (r_BtmSelectValue == 0) { //중 셀렉박스까지 선택한 경우
          tempId = r_ChildrenId;
        } else {
          tempId = [String(r_BtmCategoryArray[r_BtmSelectValue - 1].id)]; //검색으로 ajax하는 경우 배열로 보내줘야 함
        }
        break;
      case 2://*******아마존************
        baseUrl = 'http://ubuntu@54.199.177.237:5000/amazon_searched';
        if (a_TopSelectValue == 0) { //아무것도 선택 안한 경우
          tempId = ["0"];
        } else if (a_MidSelectValue == 0) { //대 셀렉박스만 선택한 경우
          tempId = a_ChildrenId;
        } else { //중 셀렉박스까지 선택한 경우
          tempId = [String(a_MidCategoryArray[a_TopSelectValue - 1].id)];
        }
        break;
      case 3://*******야후************
        baseUrl = 'http://ubuntu@54.199.177.237:5000/yahoo_searched';
        if (y_TopSelectValue == 0) { //아무것도 선택 안한 경우
          tempId = ["0"];
        } else if (y_MidSelectValue == 0) { //대 셀렉박스만 선택한 경우
          tempId = y_ChildrenId;
        } else { //중 셀렉박스까지 선택한 경우
          tempId = [String(y_MidCategoryArray[y_TopSelectValue - 1].id)];
        }
        break;
      default:
    }
    var key = 'keyword=' + $("#searchBox").val();
    var sort = 'sortnum=' + sortSelectValue;
    var min = 'min=' + $('input[name=min]').val();
    var max = 'max=' + $('input[name=max]').val();
    if (priceButtonClickCheck) {
      totalUrl = baseUrl + '?' + key + '&' + sort + '&' + min + '&' + max;
    } else {
      totalUrl = baseUrl + '?' + key + '&' + sort;
    }

    if (tempId.length == 1) {
      tempId.push(tempId.toString()); //데이터가 1개로 갈 경우 오류가 나고 중복은 상관 없음
    }
    var js_tempId = JSON.stringify(tempId); //이렇게 해서 data에 넣어줘야 flask가 읽음
    $.ajax({
      async: false,
      type: 'POST',
      url: totalUrl,
      data: js_tempId,
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
        if (data.length !== 0) {
          switch (sequence) {
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
        } else making_undefined(sequence); //찾지 못했다고 출력해줌
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
    for (i = 0; i < 5 * scroll_count; i++) { //데이터가 출력되는 위치를 맞추기 위해
      if (i == r_name.length) break;
      r_PrintOneProduct(); //상품 정보 1개 만든 후 출력
    }
    window.onscroll = function() { //스크롤 할 경우
      scroll_Throw(); //스크롤에 따라 5개씩 출력
    };
  }
  //라쿠텐, DB에서 가져온 정보로 아이템 1개의 정보를 DIV에 담아 출력
  function r_PrintOneProduct() {
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
    item_link.setAttribute("target", "_blank");
    item_link.setAttribute("data-imageurl", r_ImageUrl[r_count]);
    item_link.setAttribute("data-key", 'r' + r_count);
    item_link.setAttribute("data-link", r_itemLinkUrl[r_count]);
    item_link.setAttribute("onclick", "ToWebDB(this);");
    item_link.href = r_itemLinkUrl[r_count]; //링크 연결
    item_link.appendChild(img);
    var item_linkText = document.createTextNode(r_name[r_count]); //링크 이름
    item_link.appendChild(item_linkText);

    //*****************리뷰 링크 *****************
    var review_link = document.createElement("a"); //리뷰 링크 만들기
    review_link.setAttribute("style", "text-decoration: none; color:black;");
    review_link.setAttribute("target", "_blank");

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
    div.setAttribute("style", " text-align:center; display:inline-block; width:100%; height:350px; overflow:hidden;");

    // div.setAttribute("abc", function(){return this.data;});
    div.appendChild(num); //순위 담기
    div.appendChild(item_link); // 아이템 링크 담기
    div.innerHTML += r_price[r_count]; // 아이템 가격 담기
    div.appendChild(review_link); //리뷰 링크 담기
    //****************화면에 뿌리기 *****************
    document.getElementById("r_ItemScreen").appendChild(div); //라쿠텐에 아이템 뿌리기
    r_count++; // 개수 파악
  }

  //storage for user to click item
  function ToWebDB(item) {
    var localObject = new Object();
    var date = new Date();
    localObject.link = $(item).data('link');
    localObject.imageurl = $(item).data('imageurl');
    localObject.date = date;
    var key = $(item).data('key');
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(localObject));
      printRecentSearchingItem(JSON.parse(localStorage.getItem(key)));
    }
  }
  //최근 본 상품 1개 출력하는 함수
  function printRecentSearchingItem(key) {
    var image = key.imageurl;
    var link = key.link;

    var img = document.createElement("IMG");
    img.setAttribute("style", "margin-left: auto; margin-right: auto; display: block;");
    img.setAttribute("src", image);
    img.setAttribute("height", "50px ");

    var item_link = document.createElement("a");
    item_link.setAttribute("style", "text-decoration: none; color:#0080FF");
    item_link.setAttribute("target", "_blank");
    item_link.appendChild(img);
    item_link.href = link;

    //이미지 담는 Div
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("style", " text-align:center; height:50px; position:absolute;");
    imageDiv.appendChild(item_link);

    //이미지 삭제 버튼
    var deleteButton = document.createElement("input");
    deleteButton.setAttribute("style", "display:inline; position:absolute; left:70%; bottom:60%;");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("value", "X");
    deleteButton.addEventListener("click", function() {
      localStorage.removeItem(key);
      $(this).closest("div").remove();
    });

    //가장 바깥쪽 DIV
    var outerDiv = document.createElement("DIV");
    outerDiv.setAttribute("style", " text-align:center; border: 1px solid black; margin:1% auto; display:block; width:auto; height:50px; position:relative;");
    outerDiv.appendChild(imageDiv);
    outerDiv.appendChild(deleteButton);
    document.getElementById('SideRecentItemShowingFrame').prepend(outerDiv);
  }
  //최근 본 상품 전체 출력하는 함수
  function printAllRecentItem() {
    var tempArray = new Array();
    //localStorage value 가져오기
    for (var i = 0; i < localStorage.length; i++) {
      tempArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    //데이터 오래된 순서부터 정렬
    for (i = 0; i < tempArray.length - 1; i++) {
      for (var j = i + 1; j < tempArray.length; j++) {
        if (new Date(tempArray[i].date) - new Date(tempArray[j].date) > 0) {
          var temp = tempArray[i];
          tempArray[i] = tempArray[j];
          tempArray[j] = temp;
        }
      }
    }
    //상품 1개씩 출력
    for (i = 0; i < tempArray.length; i++) {
      printRecentSearchingItem(tempArray[i]);
    }
  }
  //최근 본 상품 초기화
  function initRecentItem() {
    localStorage.clear(); //storage 초기화
    $(recentItemStorage).empty(); //화면 초기화
  }

  //5개씩 뿌려주는 기능 구현
  function scroll_Throw() {
    var scrolltop = $(window).scrollTop();
    if (scrolltop == $(document).height() - $(window).height()) {
      scroll_count++;
      for (i = 0; i < 5; i++) {
        if (r_count != r_ImageUrl.length)
          r_PrintOneProduct();
        if (y_count != y_ImageUrl.length)
          y_PrintOneProduct();
        if (a_count != a_ImageUrl.length)
          a_PrintOneProduct();
      }
    }
  }
  //아마존, 디비에서 가져온 정보 저장 및 일부 출력
  function a_DataStore_printItem(result) {
    for (i in result) {
      a_ImageUrl.push(result[i].mediumImageUrls);
      a_name.push(result[i].itemName);
      a_price.push("<p style=\"color:red;text-align:center;\">" + result[i].itemPrice + "円</p>");
      a_ReviewAvgValue.push(result[i].reviewAverage);
      a_TotalReviewCount.push(result[i].reviewCount);
      a_itemLinkUrl.push(result[i].itemUrl);
    }
    for (i = 0; i < 5 * scroll_count; i++) {
      if (i == a_name.length) break;
      a_PrintOneProduct();
    }
  }
  //아마존, DB에서 가져온 정보로 아이템 1개의 정보를 DIV에 담아 출력
  function a_PrintOneProduct() {
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
    var item_link = document.createElement("a");
    item_link.setAttribute("style", "text-decoration: none; color:#0080FF");
    item_link.setAttribute("target", "_blank");
    item_link.setAttribute("data-imageurl", a_ImageUrl[a_count]);
    item_link.setAttribute("data-key", 'a' + a_count);
    item_link.setAttribute("data-link", a_itemLinkUrl[a_count]);
    item_link.setAttribute("onclick", "ToWebDB(this);");
    item_link.href = a_itemLinkUrl[a_count]; //링크 연결
    item_link.appendChild(img);
    var item_linkText = document.createTextNode(a_name[a_count]); //링크 이름
    item_link.appendChild(item_linkText);
    //*****************리뷰 링크 *****************
    var review_link = document.createElement("a"); //리뷰 링크 만들기
    review_link.setAttribute("style", "text-decoration: none; color:black");
    review_link.setAttribute("target", "_blank");
    review_link.href = a_itemLinkUrl[a_count] + "#reviewsMedley"; //#js-review-widget
    //*******************평균 리뷰 값으로 별 만들기**************************
    var yellow = Math.round(a_ReviewAvgValue[a_count] * 2) / 2;
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
    var review_linkText = document.createTextNode("(" + a_TotalReviewCount[a_count] + ")건");
    review_link.appendChild(review_linkText);
    //*****************상품 담기 *****************
    var div = document.createElement("DIV"); //아이템 정보를 담을 그릇
    div.setAttribute("style", " text-align:center; display:inline-block; width:100%; height:350px; overflow:hidden;");
    div.appendChild(num); //순위 담기
    div.appendChild(item_link); // 아이템 링크 담기
    div.innerHTML += a_price[a_count]; // 아이템 가격 담기
    div.appendChild(review_link); //리뷰 링크 담기
    //****************화면에 뿌리기 *****************
    document.getElementById("a_ItemScreen").appendChild(div); //라쿠텐에 아이템 뿌리기
    a_count++; // 개수 파악
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
      y_PrintOneProduct();
    }
  }
  //*****************야후************
  function y_PrintOneProduct() {
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
    item_link.setAttribute("target", "_blank");
    item_link.setAttribute("data-imageurl", y_ImageUrl[y_count]);
    item_link.setAttribute("data-key", 'y' + y_count);
    item_link.setAttribute("data-link", y_itemLinkUrl[y_count]);
    item_link.setAttribute("onclick", "ToWebDB(this);");
    item_link.href = y_itemLinkUrl[y_count]; //링크 연결
    item_link.appendChild(img);
    var item_linkText = document.createTextNode(y_name[y_count]); //링크 이름
    item_link.appendChild(item_linkText);
    //*****************리뷰 링크 *****************
    var review_link = document.createElement("a");
    review_link.setAttribute("style", "text-decoration: none; color:black;");
    review_link.setAttribute("target", "_blank");
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
    div.setAttribute("style", " text-align:center; display:inline-block; width:100%; height:350px; overflow:hidden;");
    div.appendChild(num);
    div.appendChild(item_link);
    div.innerHTML += y_price[y_count];
    div.appendChild(review_link);
    //****************화면에 뿌리기 *****************
    document.getElementById("y_ItemScreen").appendChild(div);
    y_count++;
  }
  // 디비에 데이터가 없는 경우 출력
  function making_undefined(sequence) {
    var div = document.createElement("DIV");
    div.setAttribute("style", " text-align:center; display:inline-block; margin-top:2%;");
    div.innerHTML += "cannot found it";
    switch (sequence) {
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
    if (r_TopSelectValue != 0)
      r_TopSelector.append("<a href='javascript:;'>" + r_TopCategoryArray[r_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    //셀렉박스 초기화
    r_MidCategoryBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    r_BtmCategoryBox.children().remove(); //세번째 셀렉트 박스를 초기화 시킨다.
    r_MidCategoryBox.append("<option value=''>中カテゴリ</option>"); //두 세번째 베이스값 만들기
    r_BtmCategoryBox.append("<option value=''>ソカテゴリ</option>");
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
        r_MidSelector.append("<a href='javascript:;'>" + r_MidCategoryArray[i].cateName + "</a>" + "<span> > </span>");
        break;
      }
    }
    //셀렉박스 초기화
    r_BtmCategoryBox.children().remove();
    r_BtmCategoryBox.append("<option value=''>ソカテゴリ</option>");
  }
  //라쿠텐, 소 선택자 클릭시 초기화 시킬 정보 담은 함수
  function r_BtmSelectorClickInit() {
    //기록자 초기화
    r_BtmSelector.children().remove();
    for (var i = 0; i < r_BtmCategoryArray.length; i++) {
      if (r_TopSelectValue == r_BtmCategoryArray[i].main_category_id && r_MidSelectValue == r_BtmCategoryArray[i].sub_category_id && r_BtmSelectValue == r_BtmCategoryArray[i].thr_category_id) {
        r_BtmSelector.append("<a href='javascript:;'>" + r_BtmCategoryArray[i].cateName + "</a>");
        break;
      }
    }
  }
  //아마존, 대 선택자 클릭시 초기화 시킬 정보 담은 함수
  function a_TopSelectorClickInit() {
    //기록자 초기화
    a_TopSelector.children().remove();
    a_MidSelector.children().remove();
    if (a_TopSelectValue != 0) {
      a_TopSelector.append("<a href='javascript:;'>" + a_TopCategoryArray[a_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    } //셀렉박스 초기화
    a_MidCategoryBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    a_MidCategoryBox.append("<option value=''>中カテゴリ</option>"); //두 세번째 베이스값 만들기
  }

  //아마존, 중 선택자 클릭시 초기화 시킬 정보 담은 함수
  function a_MidSelectorBoxClickInit() {
    a_MidSelector.children().remove();
    for (i = 0; i < a_MidCategoryArray.length; i++) { //두번째 세부항목을 넣어보자.
      if (a_TopSelectValue == a_MidCategoryArray[i].main_category_id && a_MidSelectValue == a_MidCategoryArray[i].sub_category_id) {
        a_MidSelector.append("<a href='javascript:;'>" + a_MidCategoryArray[i].cateName + "</a>");
        break;
      }
    }
  }
  //야후, 대 선택자 클릭시 초기화 시킬 정보 담은 함수
  function y_TopSelectorClickInit() {
    //기록자 초기화
    y_TopSelector.children().remove();
    y_MidSelector.children().remove();
    if (y_TopSelectValue != 0)
      y_TopSelector.append("<a href='javascript:;'>" + y_TopCategoryArray[y_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    //셀렉박스 초기화
    y_MidCategoryBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    y_MidCategoryBox.append("<option value=''>中カテゴリ</option>"); //두 세번째 베이스값 만들기
  }
  //야후, 중 선택자 클릭시 초기화 시킬 정보 담은 함수
  function y_MidSelectorBoxClickInit() {
    y_MidSelector.children().remove();
    for (var i = 0; i < y_MidCategoryArray.length; i++) { //두번째 세부항목을 넣어보자.
      if (y_TopSelectValue == y_MidCategoryArray[i].main_category_id && y_MidSelectValue == y_MidCategoryArray[i].sub_category_id) {
        y_MidSelector.append("<a href='javascript:;'>" + y_MidCategoryArray[i].cateName + "</a>");
        break;
      }
    }
  }

  //라쿠텐 대 카테고리 하드코딩
  function r_TopCategoryBoxEnroll() {
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
  //sorting 카테고리 하드코딩
  function SortingCatergoryEnroll() {
    sortCategoryObject = new Object();
    sortCategoryObject.id = "1";
    sortCategoryObject.cateName = "価格が安い順";
    sortCategoryArray.push(sortCategoryObject);

    sortCategoryObject = new Object();
    sortCategoryObject.id = "2";
    sortCategoryObject.cateName = "価格が高い順";
    sortCategoryArray.push(sortCategoryObject);

    sortCategoryObject = new Object();
    sortCategoryObject.id = "3";
    sortCategoryObject.cateName = "レビュー件数順";
    sortCategoryArray.push(sortCategoryObject);

    sortCategoryObject = new Object();
    sortCategoryObject.id = "4";
    sortCategoryObject.cateName = "レビュー評価順";
    sortCategoryArray.push(sortCategoryObject);
  }

  //라쿠텐, 중 셀렉박스 데이터저장 함수
  function r_MidCategoryStorage(result) {
    r_MidCategoryArray = new Array(); // 기존의 데이터 날려야 함.
    result.filter(function(element) { // children안에 하위 카테고리 id가 들어가 있는데, 그 id의 각각의 genreId를 넘겨줘야 하위 정보를 가져올 수 있다.
      for (j = 0; j < r_TopCategoryArray[r_TopSelectValue - 1].children.length; j++) {
        if (element.id == r_TopCategoryArray[r_TopSelectValue - 1].children[j]) {
          element.main_category_id = String(r_TopSelectValue); // 부모 카테고리 번호 등록
          element.sub_category_id = String(j + 1); //본인 카테고리 번호 등록
          r_MidCategoryArray.push(element);
          r_MidCategoryBox.append("<option value='" + element.sub_category_id + "'>" + element.cateName + "</option>");
        }
      }
    });
    // 대 카테고리 선택시 중 카테고리 첫번째 값 자동으로 선택하게 만듦
    document.getElementById("r_CategorySelectBox").selectedIndex = 1; //박스 첫번째 선택
    r_MidSelectValue = 1;
    CategoryPrintAjax(1, 2); //라쿠텐 소 셀렉박스 저장 및 출력
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
          r_BtmCategoryBox.append("<option value='" + element.thr_category_id + "'>" + element.cateName + "</option>");
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
        a_TopCategoryBox.append("<option value='" + temp_count + "'>" + element.cateName + "</option>");
      }
    });
    //검색할 경우에는 초기 세팅한 값이 무효화 되야 함.
    if (!searchButtonClickCheck) {
      document.getElementById("a_CategorySelectBox").selectedIndex = 1;
      a_TopSelector.append("<a href='javascript:;'>" + a_TopCategoryArray[a_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    }
    CategoryPrintAjax(2, 4); //아마존 중 셀렉박스 저장 및 출력
  }

  //아마존, 중 셀렉박스 데이터저장 함수
  function a_MidCategoryStorage(result) {
    a_ChildrenId = new Array();
    a_MidCategoryArray = new Array();
    result.filter(function(element) {
      for (var j = 0; j < a_TopCategoryArray[a_TopSelectValue - 1].children.length; j++) {
        if (element.id == a_TopCategoryArray[a_TopSelectValue - 1].children[j]) {
          //선택된 아이템의 genreId와 children의 장르아이디 한꺼번에 담아서, 검색창에서 입력했을 때 넘겨줘야함.
          a_ChildrenId.push(String(element.id));
          console.log(a_ChildrenId);
          //아마존, 두번째 카테고리 데이터 만들기
          element.main_category_id = String(a_TopSelectValue); // 아마존 대카테고리 선택된 값이, 두번째 카테고리의 main id가 됨
          element.sub_category_id = String(j + 1);
          a_MidCategoryArray.push(element);
          a_MidCategoryBox.append("<option value='" + element.sub_category_id + "'>" + element.cateName + "</option>");
        }
      }
    });
    a_ChildrenId.push(String(a_TopCategoryArray[a_TopSelectValue - 1].id));
  }
  //야후, 대 셀렉박스 데이터저장 함수
  function y_TopCategoryStorage(result) { //야후, 대카테고리 selectBox에 등록 함수
    temp_count = 0;
    result.filter(function(element) {
      if (element.depth == 1) {
        element.main_category_id = ++temp_count;
        y_TopCategoryArray.push(element);
        y_TopCategoryBox.append("<option value='" + temp_count + "'>" + element.cateName + "</option>");
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
          y_MidCategoryBox.append("<option value='" + element.sub_category_id + "'>" + element.cateName + "</option>");
        }
      }
    });
    y_ChildrenId.push(String(y_TopCategoryArray[y_TopSelectValue - 1].id));
  }

  // function rakutenInitRequest() {
  //   r_TopSelectorClickInit(); //위에 주석처리 한 부분간략화 하기 위해 해당 코드로 바꿈 //라쿠텐, 중,소 기록자 셀렉박스 초기화
  //   r_TopSelector.children().remove(); //대 기록자 초기화
  //   r_TopCategoryBox.children().remove(); //대 셀렉박스 초기화
  //   r_TopCategoryBox.append("<option value=''>大カテゴリ</option>");
  //   for (i = 0; i < r_TopCategoryArray.length; i++) { //라쿠텐,  대 셀렉박스 데이터 출력
  //     r_TopCategoryBox.append("<option value='" + r_TopCategoryArray[i].id + "'>" + r_TopCategoryArray[i].cateName + "</option>");
  //   }
  //   ScreenInit('r');
  //   sortCategoryBox.children().remove();
  //   sortCategoryBox.append("<option value=''>標準</option>");
  //   for (i = 0; i < sortCategoryArray.length; i++) { // sort category 등록
  //     sortCategoryBox.append("<option value='" + sortCategoryArray[i].id + "'>" + sortCategoryArray[i].cateName + "</option>");
  //   }
  //   ProductPrintAjax(1); //라쿠텐 초기 데이터 호출
  // }
