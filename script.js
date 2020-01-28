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
  var totalObject = new Object();

  //****************************초기 화면 데이터 *******************************
  //카테고리단 등록
  r_TopCategoryBoxEnroll(); //라쿠텐 대카테고리 하드코딩 값 입력
  for (i = 0; i < r_TopCategoryArray.length; i++) { //라쿠텐, 초기 대카테고리 데이터 등록
    $("select[name='r_TopCategoryBox']").append("<option value='" + r_TopCategoryArray[i].id + "'>" + r_TopCategoryArray[i].cateName + "</option>");
  }
  //CategoryPrintAjax(sequence,number) -> sequence:라쿠텐 =1, 아마존=2,야후=3 ,number: 1:라쿠텐 중 2:라쿠텐 소 3:아마존 대 4:아마존 중 5:야후 대 6:야후 중
  CategoryPrintAjax(2, 3); //아마존 초기 대카테고리 호출
  CategoryPrintAjax(3, 5); //야후 초기 대카테고리 호출
  //분류단(sort) 등록
  SortingCatergoryEnroll(); //정렬 값 하드코딩
  for (i = 0; i < sortCategoryArray.length; i++) { // sort category 등록
    $("select[name='sortCategoryBox']").append("<option value='" + sortCategoryArray[i].id + "'>" + sortCategoryArray[i].cateName + "</option>");
  }
  //상품단 등록
  //ProductPrintAjax(sequence,gId) -> sequence:라쿠텐 =1, 아마존=2,야후=3 ,gId: genreId
  ProductPrintAjax(1); //라쿠텐 초기 데이터 호출 , 전체 ranking은 genreId =0 임
  ProductPrintAjax(2); //아마존 초기 데이터 호출, 아마존 같은 경우 전체 ranking이 없어서, 첫번째 상품 데이터 호출
  ProductPrintAjax(3); //야후 초기 데이터 호출
  //최근 본 상품 데이터 출력
  printAllRecentItem();

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
      $("span[name='r_TopSelector']").children().remove(); //대 기록자 초기화
      $("select[name='r_TopCategoryBox']").children().remove(); //대 셀렉박스 초기화
      $("select[name='r_TopCategoryBox']").append("<option value=''>大カテゴリ</option>");
      for (i = 0; i < r_TopCategoryArray.length; i++) { //라쿠텐,  대 셀렉박스 데이터 출력
        $("select[name='r_TopCategoryBox']").append("<option value='" + r_TopCategoryArray[i].id + "'>" + r_TopCategoryArray[i].cateName + "</option>");
      }
      //상품단
      //KeywordSendingAjax(sequence) -> sequence:라쿠텐 =1, 아마존=2,야후=3
      KeywordSendingAjax(1); //라쿠텐, 전체 검색
      //*********** amazon ***********
      //카테고리단
      a_TopSelectorClickInit(); //아마존, 중,소 기록자 셀렉박스 초기화
      $("span[name='a_TopSelector']").children().remove(); //대 기록자 초기화
      $("select[name='a_TopCategoryBox']").children().remove(); // 아마존, 대 셀렉박스 초기화
      a_TopSelectValue = 0; //초기값을 1로 해뒀기에, submit하면 0으로 바꿔줘야 키워드 검색 후 sort 한 후에 문제 안생김.
      $("select[name='a_TopCategoryBox']").append("<option value=''>大カテゴリ</option>");
      CategoryPrintAjax(2, 3); //아마존 대 셀렉박스 데이터 저장 및 출력
      //상품단
      KeywordSendingAjax(2); //아마존
      //*********** yahoo ***********
      //카테고리단
      y_TopSelectorClickInit(); //야후, 중 기록자 셀렉박스 초기화
      $("span[name='y_TopSelector']").children().remove(); //대 기록자 초기화
      $("select[name='y_TopCategoryBox']").children().remove(); // 야후, 대 셀렉박스 초기화
      $("select[name='y_TopCategoryBox']").append("<option value=''>大カテゴリ</option>");
      CategoryPrintAjax(3, 5); //야후 대 셀렉박스 데이터 저장 및 출력
      //상품단
      KeywordSendingAjax(3); //야후
    }
  });

  function totalClick(value) {
    var alphabet = value[0];
    var selectValue = 0;
    var ray; // rakuten, amazon, yahoo
    var topMidBtm;
    var catenum = 0;
    if (alphabet === 'r') {
      ray = 1;
      if (value.includes('Top')) {
        if(value.includes('Selector')){
          r_BtmSelectValue=0; // 소 카테고리까지 선택한 다음에, 대 선택자를 클릭할 경우, printAjax 안에서 r_BtmSelectValue 값이 설정되어 있어서 화면이 바뀌지 않는다.
        }
        selectValue = r_TopSelectValue;
        catenum = 1;
        topMidBtm = 1;
      } else if (value.includes('Mid')) {
        selectValue = r_MidSelectValue;
        catenum = 2;
        topMidBtm = 2;
      } else {
        selectValue = r_BtmSelectValue;
        topMidBtm = 3;
      }
      if (selectValue !== 0) {
        switch (topMidBtm) {
          case 1:
            r_TopSelectorClickInit();
            break;
          case 2:
            r_MidSelectorClickInit();
            break;
          case 3:
            r_BtmSelectorClickInit();
            break;
        }
      }
    } else if (alphabet === 'a') {
      ray = 2;
      if (value.includes('Top')) {
        if(value.includes('Selector')){
          a_MidSelectValue=0;
        }
        selectValue = a_TopSelectValue;
        catenum = 4;
        topMidBtm = 1;
      } else {
        selectValue = a_MidSelectValue;
        topMidBtm = 2;
      }

      if (selectValue !== 0 || selectValue !== undefined) {
        switch (topMidBtm) {
          case 1:
            a_TopSelectorClickInit();
            break;
          case 2:
            a_MidSelectorClickInit();
            break;
        }
      }
    } else {
      ray = 3;
      if (value.includes('Top')) {
        if(value.includes('Selector')){
          y_MidSelectValue=0;
        }
        selectValue = y_TopSelectValue;
        catenum = 6;
        topMidBtm = 1;
      } else {
        selectValue = y_MidSelectValue;
        topMidBtm = 2;
      }
      if (selectValue !== 0) {
        switch (topMidBtm) {
          case 1:
            y_TopSelectorClickInit();
            break;
          case 2:
            y_MidSelectorClickInit();
            break;
        }
      }
    }

    if (selectValue !== 0) {
      if (catenum !== 0) {
        CategoryPrintAjax(ray, catenum); //라쿠텐 중 셀렉박스 저장 및 출력
      }
      ScreenInit(alphabet); //기존 자료 자료들 지우기
      if (searchButtonClickCheck) { //검색어 제출한 경우
        KeywordSendingAjax(ray);
      } else { //검색 안한 경우
        ProductPrintAjax(ray);
      }
    } else {
      alert("カテゴリーを選択してください。");
    }
  }

  //************************** 기록자**************************
  $("#r_TopSelector,#r_MidSelector,#r_BtmSelector,#a_TopSelector,#a_MidSelector,#y_TopSelector,#y_MidSelector").click(function() {
    var value = $(this).attr('name');

    totalClick(value);
  });
  //*********** 셀렉박스 선택  ******************************
  $(document).on("change", "select[name='r_TopCategoryBox'],select[name='r_MidCategoryBox'],select[name='r_BtmCategoryBox'],select[name='a_TopCategoryBox'],select[name='a_MidCategoryBox'],select[name='y_TopCategoryBox'],select[name='y_MidCategoryBox']", function() { //대 셀렉박스 클릭
    var value = $(this).attr('name');
    $("option:selected", this).each(function() {
      var alpha = value[0];
      switch (alpha) {
        case 'r':
          if (value.includes('Top'))
            r_TopSelectValue = $(this).val(); //대 셀렉박스 선택한 값
          else if (value.includes('Mid'))
            r_MidSelectValue = $(this).val();
          else
            r_BtmSelectValue = $(this).val();
          break;
        case 'a':
          if (value.includes('Top'))
            a_TopSelectValue = $(this).val(); //대 셀렉박스 선택한 값
          else
            a_MidSelectValue = $(this).val();
          break;
        case 'y':
          if (value.includes('Top'))
            y_TopSelectValue = $(this).val(); //대 셀렉박스 선택한 값
          else
            y_MidSelectValue = $(this).val();
          break;
      }
      totalClick(value);
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
      case 3: //*******야후************
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
            DataStore_printItem(result,'r'); //라쿠텐 정보 저장 및 출력
            break;
          case 2:
            DataStore_printItem(result,'a'); //아마존 정보 저장 및 출력
            break;
          case 3:
            DataStore_printItem(result,'y'); //야후 정보 저장 및 출력
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
            MidCategoryStorage(result, 'r'); //라쿠텐 중카테고리 저장
            break;
          case 2:
            r_BtmCategoryStorage(result); //라쿠텐 소카테고리 저장
            break;
          case 3:
            TopCategoryStorage(result, 'a'); //아마존 대카테고리 저장
            break;
          case 4:
            MidCategoryStorage(result, 'a'); //아마존 중카테고리 저장
            break;
          case 5:
            TopCategoryStorage(result, 'y'); //야후 대카테고리 저장
            break;
          case 6:
            MidCategoryStorage(result, 'y'); //야후 중카테고리 저장
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
      case 1: //*******라쿠텐************
        baseUrl = 'http://ubuntu@54.199.177.237:5000/rakuten_searched';
        if (r_TopSelectValue == 0) { //아무것도 선택 안한 경우
          tempId = ["0"];
        } else if (r_MidSelectValue == 0) { //대 셀렉박스만 선택한 경우
          tempId = [String(r_MidCategoryArray[0].id)];
        } else if (r_BtmSelectValue == 0) { //중 셀렉박스까지 선택한 경우
          tempId = r_ChildrenId;
        } else {
          tempId = [String(r_BtmCategoryArray[r_BtmSelectValue - 1].id)]; //검색으로 ajax하는 경우 배열로 보내줘야 함
        }
        break;
      case 2: //*******아마존************
        baseUrl = 'http://ubuntu@54.199.177.237:5000/amazon_searched';
        if (a_TopSelectValue == 0) { //아무것도 선택 안한 경우
          tempId = ["0"];
        } else if (a_MidSelectValue == 0) { //대 셀렉박스만 선택한 경우
          tempId = a_ChildrenId;
        } else { //중 셀렉박스까지 선택한 경우
          tempId = [String(a_MidCategoryArray[a_TopSelectValue - 1].id)];
        }
        break;
      case 3: //*******야후************
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
              DataStore_printItem(data,'r'); //라쿠텐 정보 저장 및 출력
              break;
            case 2:
              DataStore_printItem(data,'a');
              break;
            case 3:
              DataStore_printItem(data,'y');
              break;
          }
        } else making_undefined(sequence); //찾지 못했다고 출력해줌
      }
    });
  }



  function PrintOneProduct(value) {
    var count, imgurl, name, price, revalue, recount, itemurl, page;
    var temp_reviewUrl;
    switch (value) {
      case 'r':
        count = r_count;
        imgurl = r_ImageUrl[count];
        name = r_name[count];
        price = r_price[count];
        revalue = r_ReviewAvgValue[count];
        recount = r_TotalReviewCount[count];
        itemurl = r_itemLinkUrl[count];
        page = 'r_ItemScreen';
        temp_reviewUrl = itemurl + "#itemReview";
        break;
      case 'a':
        count = a_count;
        imgurl = a_ImageUrl[count];
        name = a_name[count];
        price = a_price[count];
        revalue = a_ReviewAvgValue[count];
        recount = a_TotalReviewCount[count];
        itemurl = a_itemLinkUrl[count];
        page = 'a_ItemScreen';
        temp_reviewUrl = itemurl + "#reviewsMedley";
        break;
      case 'y':
        count = y_count;
        imgurl = y_ImageUrl[count];
        name = y_name[count];
        price = y_price[count];
        revalue = y_ReviewAvgValue[count];
        recount = y_TotalReviewCount[count];
        itemurl = y_itemLinkUrl[count];
        page = 'y_ItemScreen';
        temp_reviewUrl = itemurl + "#itmrvwfl";
        break;
    }

    //*****************상품 이미지 *****************
    var img = document.createElement("IMG");
    img.setAttribute("style", "margin-left: auto; margin-right: auto; display: block;");
    img.setAttribute("src", imgurl);
    // img.setAttribute("width", width);
    img.setAttribute("height", '160');
    //*****************상품 순위 *****************
    var num = document.createElement("P");
    num.setAttribute("style", "font-size:18px; color:red;");
    num.innerHTML = count + 1 + "位";
    //*****************상품 링크 *****************
    var item_link = document.createElement("a");
    item_link.setAttribute("style", "text-decoration: none; color:#0080FF");
    item_link.setAttribute("target", "_blank");
    item_link.setAttribute("data-imageurl", imgurl);
    item_link.setAttribute("data-key", value + count);
    item_link.setAttribute("data-link", itemurl);
    item_link.setAttribute("onclick", "ToWebDB(this);");
    item_link.href = itemurl; //링크 연결
    item_link.appendChild(img);
    var item_linkText = document.createTextNode(name); //링크 이름
    item_link.appendChild(item_linkText);

    //*****************리뷰 링크 *****************
    var review_link = document.createElement("a"); //리뷰 링크 만들기
    review_link.setAttribute("style", "text-decoration: none; color:black;");
    review_link.setAttribute("target", "_blank");

    review_link.href = temp_reviewUrl; //#js-review-widget
    //*******************평균 리뷰 값으로 별 만들기**************************
    var yellow = Math.round(revalue * 2) / 2;
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
    var review_linkText = document.createTextNode("(" + recount + ")건");
    review_link.appendChild(review_linkText);
    //*****************상품 담기 *****************
    var div = document.createElement("DIV"); //아이템 정보를 담을 그릇
    div.setAttribute("class", "productOuterDiv");

    // div.setAttribute("abc", function(){return this.data;});
    div.appendChild(num); //순위 담기
    div.appendChild(item_link); // 아이템 링크 담기
    div.innerHTML += price; // 아이템 가격 담기
    div.appendChild(review_link); //리뷰 링크 담기
    //****************화면에 뿌리기 *****************
    document.getElementById(page).appendChild(div); //라쿠텐에 아이템 뿌리기
    switch (value) {
      case 'r':
        r_count++;
        break;
      case 'a':
        a_count++;
        break;
      case 'y':
        y_count++;
        break;
    }
    // 개수 파악
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
    outerDiv.setAttribute("class", "sideProductOutDiv");
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
    $(SideRecentItemShowingFrame).empty(); //화면 초기화
  }

  //5개씩 뿌려주는 기능 구현
  function scroll_Throw() {
    var scrolltop = $(window).scrollTop();
    if (scrolltop == $(document).height() - $(window).height()) {
      scroll_count++;
      for (i = 0; i < 5; i++) {
        if (r_count != r_ImageUrl.length)
          PrintOneProduct('r');
        if (y_count != y_ImageUrl.length)
          PrintOneProduct('y');
        if (a_count != a_ImageUrl.length)
          PrintOneProduct('a');
      }
    }
  }
  function DataStore_printItem(result,value) {
    var imgUrl =new Array();
    var name=new Array();
    var price =new Array();
    var reviewValue = new Array();
    var reviewCount=new Array();
    var itemUrl=new Array();
    for (i in result) {
      imgUrl.push(result[i].mediumImageUrls);
      name.push(result[i].itemName);
      price.push("<p style=\"color:red;text-align:center;\">" + result[i].itemPrice + "円</p>");
      reviewValue.push(result[i].reviewAverage);
      reviewCount.push(result[i].reviewCount);
      itemUrl.push(result[i].itemUrl);
    }
    switch (value) {
      case 'r':
          r_ImageUrl = imgUrl.slice();
          r_name = name.slice();
          r_price = price.slice();
          r_ReviewAvgValue = reviewValue.slice();
          r_TotalReviewCount = reviewCount.slice();
          r_itemLinkUrl = itemUrl.slice();
        break;
      case 'a':
          a_ImageUrl = imgUrl.slice();
          a_name = name.slice();
          a_price = price.slice();
          a_ReviewAvgValue = reviewValue.slice();
          a_TotalReviewCount = reviewCount.slice();
          a_itemLinkUrl = itemUrl.slice();
        break;
      case 'y':
          y_ImageUrl =imgUrl.slice();
          y_name = name.slice();
          y_price = price.slice();
          y_ReviewAvgValue = reviewValue.slice();
          y_TotalReviewCount = reviewCount.slice();
          y_itemLinkUrl = itemUrl.slice();
        break;
    }
    for (i = 0; i < 5 * scroll_count; i++) {
      if (i == name.length) break;
      PrintOneProduct(value);
    }
    if(value==='r'){
      window.onscroll = function() { //스크롤 할 경우
        scroll_Throw(); //스크롤에 따라 5개씩 출력
      };
    }
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
    $("span[name='r_TopSelector']").children().remove();
    $("span[name='r_MidSelector']").children().remove();
    $("span[name='r_BtmSelector']").children().remove();
    if (r_TopSelectValue != 0)
      $("span[name='r_TopSelector']").append("<a href='javascript:;'>" + r_TopCategoryArray[r_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    //셀렉박스 초기화
    $("select[name='r_MidCategoryBox']").children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    $("select[name='r_BtmCategoryBox']").children().remove(); //세번째 셀렉트 박스를 초기화 시킨다.
    $("select[name='r_MidCategoryBox']").append("<option value=''>中カテゴリ</option>"); //두 세번째 베이스값 만들기
    $("select[name='r_BtmCategoryBox']").append("<option value=''>ソカテゴリ</option>");
  }

  //라쿠텐, 중 선택자 클릭시 초기화 시킬 정보 담은 함수
  function r_MidSelectorClickInit() {
    //기록자 초기화
    $("span[name='r_MidSelector']").children().remove();
    $("span[name='r_BtmSelector']").children().remove();
    for (var i = 0; i < r_MidCategoryArray.length; i++) { //선택된 기록자 등록
      if (r_TopSelectValue == r_MidCategoryArray[i].main_category_id && r_MidSelectValue == r_MidCategoryArray[i].sub_category_id) {
        //main_category_id도 일치해야, 다른 카테고리와 섞이지 않는다.
        $("span[name='r_MidSelector']").append("<a href='javascript:;'>" + r_MidCategoryArray[i].cateName + "</a>" + "<span> > </span>");
        break;
      }
    }
    //셀렉박스 초기화
    $("select[name='r_BtmCategoryBox']").children().remove();
    $("select[name='r_BtmCategoryBox']").append("<option value=''>ソカテゴリ</option>");
  }
  //라쿠텐, 소 선택자 클릭시 초기화 시킬 정보 담은 함수
  function r_BtmSelectorClickInit() {
    //기록자 초기화
    $("span[name='r_BtmSelector']").children().remove();
    for (var i = 0; i < r_BtmCategoryArray.length; i++) {
      if (r_TopSelectValue == r_BtmCategoryArray[i].main_category_id && r_MidSelectValue == r_BtmCategoryArray[i].sub_category_id && r_BtmSelectValue == r_BtmCategoryArray[i].thr_category_id) {
        $("span[name='r_BtmSelector']").append("<a href='javascript:;'>" + r_BtmCategoryArray[i].cateName + "</a>");
        break;
      }
    }
  }
  //아마존, 대 선택자 클릭시 초기화 시킬 정보 담은 함수
  function a_TopSelectorClickInit() {
    //기록자 초기화
    $("span[name='a_TopSelector']").children().remove();
    $("span[name='a_MidSelector']").children().remove();
    if (a_TopSelectValue != 0) {
      $("span[name='a_TopSelector']").append("<a href='javascript:;'>" + a_TopCategoryArray[a_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    } //셀렉박스 초기화
    $("select[name='a_MidCategoryBox']").children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    $("select[name='a_MidCategoryBox']").append("<option value=''>中カテゴリ</option>"); //두 세번째 베이스값 만들기
  }

  //아마존, 중 선택자 클릭시 초기화 시킬 정보 담은 함수
  function a_MidSelectorClickInit() {
    $("span[name='a_MidSelector']").children().remove();
    for (i = 0; i < a_MidCategoryArray.length; i++) { //두번째 세부항목을 넣어보자.
      if (a_TopSelectValue == a_MidCategoryArray[i].main_category_id && a_MidSelectValue == a_MidCategoryArray[i].sub_category_id) {
        $("span[name='a_MidSelector']").append("<a href='javascript:;'>" + a_MidCategoryArray[i].cateName + "</a>");
        break;
      }
    }
  }
  //야후, 대 선택자 클릭시 초기화 시킬 정보 담은 함수
  function y_TopSelectorClickInit() {
    //기록자 초기화
    $("span[name='y_TopSelector']").children().remove();
    $("span[name='y_MidSelector']").children().remove();

    if (y_TopSelectValue != 0)
      $("span[name='y_TopSelector']").append("<a href='javascript:;'>" + y_TopCategoryArray[y_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    //셀렉박스 초기화
    $("select[name='y_MidCategoryBox']").children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    $("select[name='y_MidCategoryBox']").append("<option value=''>中カテゴリ</option>"); //두 세번째 베이스값 만들기
  }
  //야후, 중 선택자 클릭시 초기화 시킬 정보 담은 함수
  function y_MidSelectorClickInit() {
    $("span[name='y_MidSelector']").children().remove();
    for (var i = 0; i < y_MidCategoryArray.length; i++) { //두번째 세부항목을 넣어보자.
      if (y_TopSelectValue == y_MidCategoryArray[i].main_category_id && y_MidSelectValue == y_MidCategoryArray[i].sub_category_id) {
        $("span[name='y_MidSelector']").append("<a href='javascript:;'>" + y_MidCategoryArray[i].cateName + "</a>");
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
          $("select[name='r_BtmCategoryBox']").append("<option value='" + element.thr_category_id + "'>" + element.cateName + "</option>");
        }
      }
    });
    r_ChildrenId.push(String(r_MidCategoryArray[r_MidSelectValue - 1].id)); // 본인 장르아이디까지 저장.
  }

  function TopCategoryStorage(result, value) { //아마존, 대카테고리 selectBox에 등록 함수
    temp_count = 0;
    var name;
    var topNum;
    var tempArray = new Array();
    result.filter(function(element) {
      if (element.depth == 1) {
        element.main_category_id = ++temp_count;
        tempArray.push(element);
      }
    });
    switch (value) {
      case 'a':
        a_TopCategoryArray = tempArray.slice();
        name = "select[name='a_TopCategoryBox']";
        topNum = a_TopSelectValue;
        break;
      case 'y':
        y_TopCategoryArray = tempArray.slice();
        name = "select[name='y_TopCategoryBox']";
        topNum = y_TopSelectValue;
        break;
    }
    for (i = 0; i < tempArray.length; i++) {
      $(name).append("<option value='" + Number(i + 1) + "'>" + tempArray[i].cateName + "</option>");
    }
    //검색할 경우에는 초기 세팅한 값이 무효화 되야 함.
    if (value === 'a') {
      if (!searchButtonClickCheck) {
        document.getElementById("a_CategorySelectBox").selectedIndex = 1;
        $("span[name='a_TopSelector']").append("<a href='javascript:;'>" + a_TopCategoryArray[a_TopSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
      }
      CategoryPrintAjax(2, 4); //아마존 중 셀렉박스 저장 및 출력
    }
  }

  function MidCategoryStorage(result, value) {
    temp_count = 0;
    var name;
    var midNum;
    var tempTopArray = new Array();
    var tempMidArray = new Array();
    switch (value) {
      case 'r':
        r_MidCategoryArray = new Array(); // 기존의 데이터 날려야 함.
        tempArray = r_TopCategoryArray;
        name = "select[name='r_MidCategoryBox']";
        topNum = r_TopSelectValue;
        break;
      case 'a':
        a_MidCategoryArray = new Array();
        tempArray = a_TopCategoryArray;
        name = "select[name='a_MidCategoryBox']";
        topNum = a_TopSelectValue;
        break;
      case 'y':
        y_MidCategoryArray = new Array();
        tempArray = y_TopCategoryArray;
        name = "select[name='y_MidCategoryBox']";
        topNum = y_TopSelectValue;
        break;
    }
    result.filter(function(element) {
      for (j = 0; j < tempArray[topNum - 1].children.length; j++) {
        if (element.id == tempArray[topNum - 1].children[j]) {
          element.main_category_id = String(topNum); // 부모 카테고리 번호 등록
          element.sub_category_id = String(j + 1); //본인 카테고리 번호 등록
          tempMidArray.push(element);
        }
      }
    });
    switch (value) {
      case 'r':
        r_MidCategoryArray = tempMidArray.slice();
        break;
      case 'a':
        a_MidCategoryArray = tempMidArray.slice();
        break;
      case 'y':
        y_MidCategoryArray = tempMidArray.slice();
        break;
    }

    for (i = 0; i < tempMidArray.length; i++) {
      $(name).append("<option value='" + Number(i + 1) + "'>" + tempMidArray[i].cateName + "</option>");
    }
    // 대 카테고리 선택시 중 카테고리 첫번째 값 자동으로 선택하게 만듦
    if (value === 'r') {
      document.getElementById("r_CategorySelectBox").selectedIndex = 1; //박스 첫번째 선택
      r_MidSelectValue = 1;
      $("span[name='r_MidSelector']").append("<a href='javascript:;'>" + r_MidCategoryArray[r_MidSelectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
      CategoryPrintAjax(1, 2); //라쿠텐 소 셀렉박스 저장 및 출력
    }
  }
