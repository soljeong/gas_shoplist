function exportSheetToJS() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EZ대리점( 작업자 : 정태민 외 작업금지 )"); // 시트 이름 맞춰주세요
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const indices = {
        nameIndex: headers.indexOf("index"),
        addressIndex: headers.indexOf("주소"),
        telIndex: headers.indexOf("전화번호"),
        ezIndex: headers.indexOf("EZ대리점"),
        bicycleIndex: headers.indexOf("자전거"),
        scooterIndex: headers.indexOf("스쿠터"),
        kickIndex: headers.indexOf("킥보드"),
        cityIndex: headers.indexOf("킥보드")
    };


  
    let jsArray = rows.map(row => {
      let objParts = headers.map((header, i) => {
        const key = header.trim();
        const value = row[i];
  
        // 문자열은 따옴표, 숫자/불리언은 그대로
        if (typeof value === "string") {
          return `"${key}": "${value.replace(/"/g, '\\"')}"`;
        } else if (typeof value === "boolean" || typeof value === "number") {
          return `"${key}": ${value}`;
        } else {
          return `"${key}": null`;
        }
      });
      return `{ ${objParts.join(", ")} }`;
    });
  
    const jsCode = "const STORES = [\n" + jsArray.join(",\n") + "\n];";
  
    Logger.log(jsCode); // Apps Script 로그에서 복사 가능
  }
  