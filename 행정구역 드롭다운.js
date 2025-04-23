function onEdit(e) {
  if (e && e.range) {
    var sheet = e.source.getActiveSheet();
    var editedCell = e.range;
    var editedRow = editedCell.getRow();
    var editedColumn = editedCell.getColumn();

    // B열에 있는 드롭다운을 변경할 때만 실행
    if (editedColumn === 2 && editedRow >= 3) {
      var dropdownList;

      // B열의 값에 따라 다른 드롭다운 목록 설정
      var location = sheet.getRange(editedRow, editedColumn).getValue();
      
      switch (location) {
      case "서울":
        dropdownList = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
        break;

     case "경기":
        dropdownList = ["가평","고양","과천","광명","광주","구리","군포","김포","남양주","동두천","부천","성남","수원","시흥","안산","안성","안양","양주","양평","여주","연천","오산","용인","의왕","의정부","이천","파주","평택","포천","하남","화성"];
        break;

      case "강원":
        dropdownList = ["강릉","고성","삼천","양구","양양","영월","원주","인제","정선","철원","춘천","태백","평찬","홍천","화천","횡성"];
        break; 

      case "인천":
        dropdownList = ["강화군","계양구","남구","남동구","동구","미추홀구","부평구","서구","연수구","옹진군","중구","영종도"];
        break;
 

      case "세종":
        dropdownList = ["금남면","부강면","연기면","연동면","연서면","장군면","전동면","전의면","조치원읍"];
        break;


      case "대전":
        dropdownList = ["대덕구","동구","서구","유성구","중구"];
        break; 

      case "충북":
        dropdownList = ["괴산","단양","보은","영동","옥천","음성","제천","중평","진천","청주","충주"];
        break;

      case "충남":
        dropdownList = ["계룡","공주","금산","논산","당진","보령","부여","서산","서천","아산","예산","천안","청양","태안","홍성"];
        break;

      case "전북":
        dropdownList = ["고창","군산","김제","남원","무주","부안","새만금","순창","완주","익산","임실","장수","전주","정읍","진안"];
        break;

      case "전남":
        dropdownList = ["강진","고흥","곡성","광양","구례","나주","담양","목포","무안","보성","순천","신안","여수","영광","영암","완도","장성","장흥","진도","함평","해남","화순"];
        break;
        
      case "광주":
        dropdownList = ["광산구","서구","북구","남구","동구"];
        break; 

      case "대구":
        dropdownList = ["남구","달서구","달성군","달성군","동구","북구","서구","수성구","중구"];
        break;

      case "부산":
        dropdownList = ["강서구","금정구","기장군","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구"];
        break; 

      case "울산":
        dropdownList = ["남구","동구","북구","소정면","울주군","중구",];
        break; 

      case "경북":
        dropdownList = ["경산","경주","고령","구미","군위","김천","문경","봉화","상주","성주","안동","영덕","영양","영주","영천","예천","울진","울릉","의성","청도","청송","칠곡","포항"];
        break; 

      case "경남":
        dropdownList = ["거제","거창","고성","김해","남해","밀양","사천","산청","양산","의령","진주","창녕","창원","통영","하동","함안","함양","합천"];
        break;

      case "제주":
        dropdownList = ["서귀포시","제주시"];
        break;
    }
    
    // C열에 드롭다운 목록 설정
      var rule = SpreadsheetApp.newDataValidation().requireValueInList(dropdownList).build();
      sheet.getRange(editedRow, editedColumn + 1).setDataValidation(rule); // B열 옆에 C열에 설정하도록 수정
    }
  }
}