$(function() {
  var submit_check = false; //검색란 입력 판단 변수
  //var width=400;
  var height = 160; //제품 이미지 높이 사이즈
  var i = 0; //반복문 사용 변수
  var j = 0; //반복문 사용 변수
  var r_count = 0; // 라쿠텐, 화면에 뿌려지는 아이템 카운트 변수
  var a_count = 0; // 아마존, 화면에 뿌려지는 아이템 카운트 변수
  var y_count = 0; // 야후, 화면에 뿌려지는 아이템 카운트 변수
  var temp_count = 0; // 임시 카운트 변수
  var r_sentence_checkInbigcate = false; // 라쿠텐 대카테고리만 선택시 '중카테고리를 선택하세요'라는 문장 화면 출력 체크 변수
  var r_imageUrl = []; //라쿠텐, DB에서 imgrurl 가져와 저장하는 배열
  var r_name = []; //라쿠텐,name 저장 배열
  var r_price = []; //라쿠텐,price 저장 배열
  var r_ReviewAvgValue = []; //라쿠텐, 리뷰평균값 저장 배열
  var r_TotalReviewCount = []; //라쿠텐, 전체 리뷰 갯수 저장 배열
  var r_itemLinkUrl = []; //라쿠텐, 아이템 링크 url 배열
  var scroll_count = 1; //5개씩 뿌려줄 때, 현재 몇번이나 뿌려줬는지 체크하는 변수
  var r_fselectValue = 0; //라쿠텐, 첫번째 selectBox의 선택된 값
  var r_sselectValue = 0; //라쿠텐, 두번째 selectBox의 선택된 값
  var r_tselectValue = 0; //라쿠텐, 세번째 selectBox의 선택된 값
  var submit_para = '?keyword='; //flask에 검색참 입력값 넘겨줄때 사용 하는 변수
  var y_imageUrl = []; //야후
  var y_name = [];
  var y_price = [];
  var y_ReviewAvgValue = [];
  var y_TotalReviewCount = [];
  var y_itemLinkUrl = [];
  var y_fselectValue = 0;
  var y_sselectValue = 0;
  var a_imageUrl = []; //아마존
  var a_name = [];
  var a_itemLinkUrl = [];
  var a_fselectValue = 0;
  var para = "?genreId="; // flask에 장르 값 넘겨줄때 사용 하는 변수
  var genreId = new Array(); //키워드 검색시 해당 카테고리의 장르아이디를 넘겨 줄 때 사용
  var genreId2 = new Array();
  var y_genreId = new Array();
  var r_mainCategoryArray = new Array(); //라쿠텐, 대카테고리 저장 배열
  var r_mainCategoryObject = new Object(); //라쿠텐, 대카테고리 저장을 위한 오브젝트
  var r_secCategoryArray = new Array(); //라쿠텐, 중카테고리 저장 배열
  var r_thirdCategoryArray = new Array(); //라쿠텐, 소 카테고리 저장 배열
  var y_mainCategoryArray = new Array();
  var y_secCategoryArray = new Array();
  var a_mainCategoryArray = new Array();
  var r_topselector = $("span[name='r_topselector']"); // 라쿠텐, 대카테고리 클릭시 위에 뜨는 기록
  var r_secselector = $("span[name='r_secselector']"); // 라쿠텐, 중카테고리 클릭시 위에 뜨는 기록
  var r_thrselector = $("span[name='r_thrselector']"); // 라쿠텐, 소카테고리 클릭시 위에 뜨는 기록
  var y_topselector = $("span[name='y_topselector']");
  var y_secselector = $("span[name='y_secselector']");
  var a_topselector = $("span[name='a_topselector']");
  var r_mainCategorySelectBox = $("select[name='r_mainCategory']"); //라쿠텐, 대 카테고리 selectbox
  var r_subCategorySelectBox = $("select[name='r_subCategory']"); //라쿠텐, 중 카테고리 selectbox
  var r_thirdCategorySelectBox = $("select[name='r_thirdCategory']"); //라쿠텐, 소 카테고리 selectbox
  var y_mainCategorySelectBox = $("select[name='y_mainCategory']");
  var y_subCategorySelectBox = $("select[name='y_subCategory']");
  var a_mainCategorySelectBox = $("select[name='a_mainCategory']");

  r_cat_init(); //라쿠텐 대카테고리 하드코딩 값 입력
  //******************** 키워드 검색 및 카테고리 클릭 **************************
  $(document).ready(function() {
    $("#submit").click(function(){ //검색란에 제출을 클릭
      submit_check = true; //submit 클릭 여부 저장
      page_init('ary'); //기존 화면의 데이터 아마존,라쿠텐,야후 모두 초기
      scroll_count = 1; // 처음엔 5개만 뿌리기 때문에 변수 1로 지정
      //*********** rakuten ***********
      r_topselector.children().remove();
      r_secselector.children().remove();
      r_thrselector.children().remove();
      r_mainCategorySelectBox.children().remove();
      r_subCategorySelectBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
      r_thirdCategorySelectBox.children().remove(); //세번째 셀렉트 박스를 초기화 시킨다.
      r_mainCategorySelectBox.append("<option value=''>大カテゴリ</option>"); //두 세번째 베이스값 만들기
      r_subCategorySelectBox.append("<option value=''>中大カテゴリ</option>"); //두 세번째 베이스값 만들기
      r_thirdCategorySelectBox.append("<option value=''>ソカテゴリ</option>");
      var temp = ["0"];
      post('http://ubuntu@54.199.177.237:5000/rakuten_searched', submit_para, $("#input").val(), temp, 1);
      for (i = 0; i < r_mainCategoryArray.length; i++) { //라쿠텐, 초기 대카테고리 데이터 등록
        r_mainCategorySelectBox.append("<option value='" + r_mainCategoryArray[i].id + "'>" + r_mainCategoryArray[i].cateName + "</option>");
      }
      //*********** amazon ***********
      a_topselector.children().remove();
      a_mainCategorySelectBox.children().remove();
      a_mainCategorySelectBox.append("<option value=''>大カテゴリ</option>");
      temp = ["1"];
      post('http://ubuntu@54.199.177.237:5000/amazon_searched', submit_para, $("#input").val(), temp, 2);
      item_ajax("http://ubuntu@54.199.177.237:5000/amazon_cate", '', '', 5); //아마존 초기 대카테고리 호출
      //*********** yahoo ***********
      y_topselector.children().remove();
      y_secselector.children().remove();
      y_mainCategorySelectBox.children().remove();
      y_subCategorySelectBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
      y_mainCategorySelectBox.append("<option value=''>大カテゴリ</option>"); //두 세번째 베이스값 만들기
      y_subCategorySelectBox.append("<option value=''>中大カテゴリ</option>"); //두 세번째 베이스값 만들기
      post('http://ubuntu@54.199.177.237:5000/yahoo_searched', submit_para, $("#input").val(), temp, 3);
      item_ajax("http://ubuntu@54.199.177.237:5000/yahoo_cate", '', '', 4); //야후 초기 대카테고리 호출

     });
    $("#r_topselector").click(function() { // 라쿠텐, 상단 대카테고리 기록자 클릭한 경우
      r_First_cate_click(); //전체 기록 카테고리 와 두,세번째 select box 초기화 / 첫번째 카테고리 선택에 따른 두번째 카테고리 리스트 생성 / 데이터 호출
    });
    $("#r_secselector").click(function() { // 라쿠텐,상당 중카테고리 기록자 클릭한 경우
      r_Second_cate_click(); //중,소 기록 카테고리 와 세번째 select box 초기화 / 두번째 카테고리 선택에 따른  세번째 카테고리 리스트 생성 / 데이터 호출
    });
    $("#r_thrselector").click(function() { // 라쿠텐, 상단 소카테고리 기록자 클릭한 경우
      r_Third_cate_click(); //세번째 데이터 호출
    });
    $("#y_topselector").click(function() {
      y_First_cate_click();
    });
    $("#y_secselector").click(function() {
      y_Second_cate_click();
    });
    $("#a_secselector").click(function() {
      a_First_cate_click();
    });

    item_ajax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', para, 0, 1); //라쿠텐 초기 데이터 호출
    item_ajax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', para, 1, 3); //야후 초기 데이터 호출
    item_ajax("http://ubuntu@54.199.177.237:5000/yahoo_cate", '', '', 4); //야후 초기 대카테고리 호출
    item_ajax('http://ubuntu@54.199.177.237:5000/amazon_selected_ranking', para, 1, 2); //아마존 초기 데이터 호출
    item_ajax("http://ubuntu@54.199.177.237:5000/amazon_cate", '', '', 5); //아마존 초기 대카테고리 호출

  });

  //*************************** 카테고리 셀렉트박스로 접근하는 경우!!!!!!!!!!!!!!!!!!!!!!!!!!1
  for (i = 0; i < r_mainCategoryArray.length; i++) { //라쿠텐, 초기 대카테고리 데이터 등록
    r_mainCategorySelectBox.append("<option value='" + r_mainCategoryArray[i].id + "'>" + r_mainCategoryArray[i].cateName + "</option>");
  }
  //*********** 라쿠텐 1depth카테고리 선택 후 2depth 생성 START ***********
  $(document).on("change", "select[name='r_mainCategory']", function() { //첫번째 카테고리 선택한 상황
    //***********선택한 첫번째 박스의 값을 가져와 일치하는 값을 두번째 셀렉트 박스에 넣는다.***********
    $("option:selected", this).each(function() {
      r_fselectValue = $(this).val(); //main category 에서 선택한 값
      r_First_cate_click(); //두번째 카테고리 생성
    });
  });
  //*********** 라쿠텐 2depth카테고리 선택 후 3depth 생성 START ***********
  $(document).on("change", "select[name='r_subCategory']", function() { //두번째 셀렉트 박스 선택한 상황
    //****** 두,세번째 세부항목과 셀렉트박스 초기화 ***********
    $("option:selected", this).each(function() { //두번째 셀렉트 박스의 값을 고른 상황
      r_sselectValue = $(this).val(); //subcategory  에서 선택한 값
      //console.log("r_second start");
      r_Second_cate_click(); //세번째 카테고리 생성
    });
  });
  //*********** 라쿠텐  3depth 셀렉트 박스 선택
  $(document).on("change", "select[name='r_thirdCategory']", function() {
    $("option:selected", this).each(function() {
      r_tselectValue = $(this).val(); //thirdcategory 에서 선택한 값
      r_Third_cate_click(); //세번째 데이터 호출
    });
  });
  //*********** yahoo 1depth카테고리 선택 후 2depth 생성 START ***********
  $(document).on("change", "select[name='y_mainCategory']", function() { //첫번째 카테고리 선택한 상황
    //***********선택한 첫번째 박스의 값을 가져와 일치하는 값을 두번째 셀렉트 박스에 넣는다.***********
    $("option:selected", this).each(function() {
      y_fselectValue = $(this).val(); //main category 에서 선택한 값
      y_First_cate_click();
    });
  });
  //*********** yahoo 2depth카테고리 선택 후 3depth 생성 START ***********
  $(document).on("change", "select[name='y_subCategory']", function() { //두번째 셀렉트 박스 선택한 상황
    //****** 두,세번째 세부항목과 셀렉트박스 초기화 ***********
    $("option:selected", this).each(function() { //두번째 셀렉트 박스의 값을 고른 상황
      y_sselectValue = $(this).val(); //main category 에서 선택한 값
      y_Second_cate_click();
    });
  });
  //*********** amazon 1depth카테고리 선택 ***********
  $(document).on("change", "select[name='a_mainCategory']", function() { //첫번째 카테고리 선택한 상황
    //***********선택한 첫번째 박스의 값을 가져와 일치하는 값을 두번째 셀렉트 박스에 넣는다.***********
    $("option:selected", this).each(function() {
      a_fselectValue = $(this).val(); //main category 에서 선택한 값
      a_First_cate_click();
    });
  });
  //*****************************************************8************************여기서 부터 함수단 ******************************8*********************************
  //초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화초기화
  function page_init(what) { //현재 화면 및 변수 초기화
    if (what.includes('r')) {
      $("#r_myList").empty();
      $("#r_top_fixedSize").empty();
      r_count = 0;
      r_sentence_checkInbigcate = false;
      r_imageUrl = [];
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
      a_imageUrl = [];
      a_name = [];
      a_itemLinkUrl = [];
    }

    if (what.includes('y')) {
      $("#y_myList").empty();
      y_count = 0;
      r_sentence_checkInbigcate = false;
      y_imageUrl = [];
      y_name = [];
      y_price = [];
      y_ReviewAvgValue = [];
      y_TotalReviewCount = [];
      y_itemLinkUrl = [];
    }
  }

  function item_ajax(baseUrl, param, gId, number) { //flask와 연결함
    $.ajax({
      type: "GET",
      dataType: 'JSON',
      url: baseUrl + param + gId,
      async: false,
      success: function(result) {
        switch (number) {
          case 1:
            r_arrPush_5(result); //라쿠텐 정보 저장 및 출력
            break;
          case 2:
            a_arrPush_5(result); //아마존 정보 저장 및 출력
            break;
          case 3:
            y_arrPush_5(result); //야후 정보 저장 및 출력
            break;
          case 4:
            y_cate_append(result); //야후 대카테고리 저장
            break;
          case 5:
            a_cate_append(result); //아마존 대카테고리 저장
            break;
          case 6:
            r_cat_append(result); //아마존 대카테고리 저장
            break;
        }
      },
      error: function(xtr, status, error) {
        alert(xtr + ":" + status + ":" + error);
      }
    });
  }
  //출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출력출출력출력출력출력출력출력출력출력출력출
  function post(baseUrl, para, gId, key, number) {
    if (key.length == 1) {
      key.push(key.toString());
    }
    console.log(key);
    var js_key = JSON.stringify(key);
    //  console.log(js_key);
    $.ajax({
      async: false,
      type: 'POST',
      url: baseUrl + para + gId,
      data: js_key,
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
        if (data.length != 0) {
          switch (number) {
            case 1:
              r_arrPush_5(data);
              break;
            case 2:
              a_arrPush_5(data);
              break;
            case 3:
              y_arrPush_5(data);
              break;
          }
        } else making_undefined(number);
      }
    });
  }

  function r_arrPush_5(result) { //라쿠텐, 디비에서 가져온 정보 저장
    for (i in result) {
      r_imageUrl.push(result[i].mediumImageUrls);
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
    img.setAttribute("src", r_imageUrl[r_count]);
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
        if (r_count != r_imageUrl.length)
          r_print_item();
        if (y_count != y_imageUrl.length)
          y_print_item();
        if (a_count != a_imageUrl.length)
          a_print_item();
      }
    }
  }

  function a_arrPush_5(result) { //아마존, 디비에서 가져온 정보 저장
    for (i in result) {
      a_imageUrl.push(result[i].mediumImageUrls);
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
    img.setAttribute("src", a_imageUrl[a_count]);
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

  function y_arrPush_5(result) { //야후 디비에서 가져온 데이터 저장
    for (i in result) {
      y_imageUrl.push(result[i].mediumImageUrls);
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
    img.setAttribute("src", y_imageUrl[y_count]);
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
  function r_First_cate_click() {
    f_init(); //전체 기록 카테고리 및 select box 초기화
    //****** 두번째 셀렉트 박스 내용 만들기 ***********
    r_secCategoryArray = new Array();
    item_ajax("http://ubuntu@54.199.177.237:5000/rakuten_cate",'','',6);
    if (submit_check) { //검색한 경우
      page_init('r'); //라쿠텐 데이터 초기화
      Bcate_check_fuc(); // 라쿠텐에서 대카테고리만 선택할 경우 보여주는 문장 출력 함수
    } else { //검색 안한 경우
      Bcate_check_fuc();
    }
  }
  // 대카테고리 셀렉트 박스 제외하고 나머지 대,중,소 카테고리 기록 초기화
  function f_init() {
    //전체 세부 카테고리 항목를 지운다
    r_topselector.children().remove();
    r_secselector.children().remove();
    r_thrselector.children().remove();
    r_subCategorySelectBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    r_thirdCategorySelectBox.children().remove(); //세번째 셀렉트 박스를 초기화 시킨다.
    //  r_mainCategorySelectBox.append("<option value=''>전체</option>"); //두 세번째 베이스값 만들기
    r_topselector.append("<a href='#'>" + r_mainCategoryArray[r_fselectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    r_subCategorySelectBox.append("<option value=''>전체</option>"); //두 세번째 베이스값 만들기
    r_thirdCategorySelectBox.append("<option value=''>전체</option>");
  }


  function Bcate_check_fuc() { // 라쿠텐에서 대카테고리만 선택할 경우 보여주는 문장 출력 함수
    if (r_sentence_checkInbigcate == false) {
      var div = document.createElement("DIV");
      div.setAttribute("style", " text-align:center; display:inline-block; border: 1px solid black; margin-top:3px");
      div.innerHTML = "중카테고리를 선택하세요";
      page_init('r');
      document.getElementById("r_myList").append(div); //
      r_sentence_checkInbigcate = true; //화면에 출력한 경우 다시 값을 변경해줌.
    }
  }

  function r_Second_cate_click() {
    r_secselector.children().remove();
    r_thrselector.children().remove();
    r_thirdCategorySelectBox.children().remove();
    for (var i = 0; i < r_secCategoryArray.length; i++) { //두번째 세부항목을 넣어보자.
      if (r_fselectValue == r_secCategoryArray[i].main_category_id && r_sselectValue == r_secCategoryArray[i].sub_category_id) {
        r_secselector.append("<a href='#'>" + r_secCategoryArray[i].cateName + "</a>" + "<span> > </span>");
        break;
      }
    }
    r_thirdCategorySelectBox.append("<option value=''>전체</option>"); //세번째 셀렉트 베이스 초기화
    //****** 세번째 셀렉트 박스 내용 만들기 ***********
    page_init('r'); //기존 자료 자료들 지우기
    //********************신경쓸 부분*************************
    genreId = new Array();
    genreId2 = new Array();
    r_thirdCategoryArray = new Array();
    $.ajax({
      async: false,
      type: "GET",
      dataType: 'JSON',
      url: "http://ubuntu@54.199.177.237:5000/rakuten_cate",
      success: function(result) {
        result.filter(function(element) {
          for (var j = 0; j < r_secCategoryArray[r_sselectValue - 1].children.length; j++) {
            if (element.id == r_secCategoryArray[r_sselectValue - 1].children[j]) {
              genreId2.push(String(element.genreId));
              element.main_category_id = String(r_fselectValue);
              element.sub_category_id = String(r_sselectValue);
              element.thr_category_id = String(j + 1);
              r_thirdCategoryArray.push(element);
              r_thirdCategorySelectBox.append("<option value='" + element.thr_category_id + "'>" + element.cateName + "</option>");
            }
          }
        });
        genreId2.push(String(r_secCategoryArray[r_sselectValue - 1].genreId));
      }
    });

    if (submit_check) { //검색한 경우
      post('http://ubuntu@54.199.177.237:5000/rakuten_searched', submit_para, $("#input").val(), genreId2, 1);
    } else { //검색 안한 경우
      item_ajax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', para, r_secCategoryArray[r_sselectValue - 1].genreId, 1);
    }
  }

  function r_Third_cate_click() {
    r_thrselector.children().remove();
    for (var i = 0; i < r_thirdCategoryArray.length; i++) {
      if (r_fselectValue == r_thirdCategoryArray[i].main_category_id && r_sselectValue == r_thirdCategoryArray[i].sub_category_id && r_tselectValue == r_thirdCategoryArray[i].thr_category_id) {
        r_thrselector.append("<a href='#'>" + r_thirdCategoryArray[i].cateName + "</a>");
        break;
      }
    }
    page_init('r');
    //********************신경쓸 부분*************************
    if (submit_check) {
      var temp = [String(r_thirdCategoryArray[r_tselectValue - 1].genreId)];
      console.log(temp);
      post('http://ubuntu@54.199.177.237:5000/rakuten_searched', submit_para, $("#input").val(), temp, 1);
    } else {
      console.log(r_tselectValue);
      item_ajax('http://ubuntu@54.199.177.237:5000/rakuten_selected_ranking', para, r_thirdCategoryArray[r_tselectValue - 1].genreId, 1);
    }
  }

  function a_First_cate_click() {
    a_topselector.children().remove();
    a_topselector.append("<a href='#'>" + a_mainCategoryArray[a_fselectValue - 1].cateName + "</a>"); //main 세부항목 만들기
    //****** 두번째 셀렉트 박스 내용 만들기 ***********
    page_init('a');
    if (submit_check) { //검색한 경우
      temp = [String(a_mainCategoryArray[a_fselectValue - 1].id)];
      post('http://ubuntu@54.199.177.237:5000/amazon_searched', submit_para, $("#input").val(), temp, 2);
    } else { //검색 안한 경우
      item_ajax('http://ubuntu@54.199.177.237:5000/amazon_selected_ranking', para, a_mainCategoryArray[a_fselectValue - 1].id, 2);
    }
  }

  function y_First_cate_click() {
    y_topselector.children().remove();
    y_secselector.children().remove();
    y_subCategorySelectBox.children().remove(); //두번째 셀렉트 박스를 초기화 시킨다.
    y_topselector.append("<a href='#'>" + y_mainCategoryArray[y_fselectValue - 1].cateName + "</a>" + "<span> > </span>"); //main 세부항목 만들기
    y_subCategorySelectBox.append("<option value=''>전체</option>"); //두 세번째 베이스값 만들기
    //****** 두번째 셀렉트 박스 내용 만들기 ***********
    y_makingSecondSelectBox();
    page_init('y');
    if (submit_check) { //검색한 경우
      post('http://ubuntu@54.199.177.237:5000/yahoo_searched', submit_para, $("#input").val(), y_genreId, 3);
    } else { //검색 안한 경우
      item_ajax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', para, y_mainCategoryArray[y_fselectValue - 1].genreId, 3);
    }
  }

  var g_json;

  function y_makingSecondSelectBox() {
    y_genreId = new Array();
    y_secCategoryArray = new Array();
    $.ajax({
      async: false,
      type: "GET",
      dataType: 'JSON',
      url: "http://ubuntu@54.199.177.237:5000/yahoo_cate",
      success: function(result) {
        result.filter(function(element) {
          for (var j = 0; j < y_mainCategoryArray[y_fselectValue - 1].children.length; j++) {
            if (element.id == y_mainCategoryArray[y_fselectValue - 1].children[j]) {
              //선택된 아이템의 genreId와 children의 장르아이디 한꺼번에 담아서, 검색창에서 입력했을 때 넘겨줘야함.
              y_genreId.push(String(element.genreId));
              //야후, 두번째 카테고리 데이터 만들기
              element.main_category_id = String(y_fselectValue); // 야후 대카테고리 선택된 값이, 두번째 카테고리의 main id가 됨
              element.sub_category_id = String(j + 1);
              y_secCategoryArray.push(element);
              y_subCategorySelectBox.append("<option value='" + element.sub_category_id + "'>" + element.cateName + "</option>");
            }
          }
        });
       y_genreId.push(String(y_mainCategoryArray[y_fselectValue - 1].genreId));
      }
    });
  }

  function y_Second_cate_click() {
    y_secselector.children().remove();
    for (var i = 0; i < y_secCategoryArray.length; i++) { //두번째 세부항목을 넣어보자.
      if (y_fselectValue == y_secCategoryArray[i].main_category_id && y_sselectValue == y_secCategoryArray[i].sub_category_id) {
        y_secselector.append("<a href='#'>" + y_secCategoryArray[i].cateName + "</a>");
        break;
      }
    }
    //****** 세번째 셀렉트 박스 내용 만들기 ***********
    page_init('y'); //기존 자료 자료들 지우기
    //********************신경쓸 부분*************************
    if (submit_check) { //검색한 경우
      var temp = [String(y_secCategoryArray[y_sselectValue - 1].genreId)];
      post('http://ubuntu@54.199.177.237:5000/yahoo_searched', submit_para, $("#input").val(), temp, 3);
    } else { //검색 안한 경우
      console.log(y_secCategoryArray[y_sselectValue - 1].genreId);
      item_ajax('http://ubuntu@54.199.177.237:5000/yahoo_selected_ranking', para, y_secCategoryArray[y_sselectValue - 1].genreId, 3);
    }
  }


  function r_cat_init() { //라쿠텐 대 카테고리 하드코딩
    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "1";
    r_mainCategoryObject.cateName = "スポーツ・ゴルフ";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["102"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "2";
    r_mainCategoryObject.cateName = "ファッション・インナー";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["1", "22", "37"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "3";
    r_mainCategoryObject.cateName = "ファッション小物";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["42", "62", "67", "77"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "4";
    r_mainCategoryObject.cateName = "キッズ・ベビー・玩具";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["88", "95"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "5";
    r_mainCategoryObject.cateName = "家電・TV・カメラ";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["136", "146"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "6";
    r_mainCategoryObject.cateName = "PC・スマホ・通信";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["161", "180", "193"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "7";
    r_mainCategoryObject.cateName = "食品・スイーツ";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["199", "218"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "8";
    r_mainCategoryObject.cateName = "ドリンク・お酒";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["235", "257", "274"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "9";
    r_mainCategoryObject.cateName = "本・電子書籍・音楽";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["338", "367"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "10";
    r_mainCategoryObject.cateName = "ゲーム・ホビー・楽器";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["376", "393"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "11";
    r_mainCategoryObject.cateName = "車・バイク";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["407", "412"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "12";
    r_mainCategoryObject.cateName = "インテリア・寝具";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["279"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "13";
    r_mainCategoryObject.cateName = "日用雑貨・キッチン用品";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["306", "323"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "14";
    r_mainCategoryObject.cateName = "ペット・花・DIY工具";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["454", "469"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "15";
    r_mainCategoryObject.cateName = "コスメ・健康・医薬品";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["416", "431", "440"];
    r_mainCategoryArray.push(r_mainCategoryObject);

    r_mainCategoryObject = new Object();
    r_mainCategoryObject.id = "16";
    r_mainCategoryObject.cateName = "サービス・リフォーム";
    r_mainCategoryObject.depth = "1";
    r_mainCategoryObject.children = ["478", "494"];
    r_mainCategoryArray.push(r_mainCategoryObject);
  }
function r_cat_append(result){
  result.filter(function(element) { // children안에 하위 카테고리 id가 들어가 있는데, 그 id의 genreid를 넘겨줘야, 하위카테고리 정보를 얻을 수 있다.
    for (j = 0; j < r_mainCategoryArray[r_fselectValue - 1].children.length; j++) {
      if (element.id == r_mainCategoryArray[r_fselectValue - 1].children[j]) {
        element.main_category_id = String(r_fselectValue);
        element.sub_category_id = String(j + 1);
        r_secCategoryArray.push(element);
        r_subCategorySelectBox.append("<option value='" + element.sub_category_id + "'>" + element.cateName + "</option>");
      }
    }
  });
}
  function a_cate_append(result) { //아마존, 대카테고리 selectBox에 등록 함수
    temp_count = 0;
    result.filter(function(element) {
      if (element.depth == 1) {
        element.main_category_id = ++temp_count;
        a_mainCategoryArray.push(element);
        a_mainCategorySelectBox.append("<option value='" + temp_count + "'>" + element.cateName + "</option>");
      }
    });
  }

  function y_cate_append(result) { //야후, 대카테고리 selectBox에 등록 함수
    result.filter(function(element) {
      if (element.depth == 1) {
        element.main_category_id = ++temp_count;
        y_mainCategoryArray.push(element);
        y_mainCategorySelectBox.append("<option value='" + temp_count + "'>" + element.cateName + "</option>");
      }
    });
  }
});
