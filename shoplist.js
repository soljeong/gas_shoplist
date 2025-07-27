function exportSheetToJS() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("EZ대리점");
  if (!sheet) throw new Error('시트 "EZ대리점"을 찾을 수 없습니다.');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  // 필요한 열 인덱스 정의
  const indices = {
    name: headers.indexOf("온라인매장명"),
    statusIdx: headers.indexOf("구분"),
    address: headers.indexOf("주소"),
    tel: headers.indexOf("매장번호"),
    ez: headers.indexOf("ez"),
    bicycle: headers.indexOf("bicycle"),
    scooter: headers.indexOf("scooter"),
    kick: headers.indexOf("kick"),
    city: headers.indexOf("city"),
    county: headers.indexOf("county"),
    lat: headers.indexOf("lat"),
    lng: headers.indexOf("lng"),
    imageNo: headers.indexOf("imageNo")
  };
  
  // 객체 배열 구성
  const storeObjects = rows
    .filter(row => row[indices.name]) // 빈 행 제외
    .filter(row => row[indices.statusIdx] === '대리점회원')   // '대리점회원'만 필터링
    .map(row => {
      return {
        name: row[indices.name],
        address: row[indices.address],
        tel: row[indices.tel],
        ez: !!row[indices.ez],
        bicycle: !!row[indices.bicycle],
        scooter: !!row[indices.scooter],
        kick: !!row[indices.kick],
        city: row[indices.city],
        county: row[indices.county],
        lat: Number(row[indices.lat]),
        lng: Number(row[indices.lng]),
        imageNo: Number(row[indices.imageNo])
      };
    });

  const jsCode = `const STORES = ${JSON.stringify(storeObjects, null, 2)};`;
  return jsCode;
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("📦 유틸리티")
    .addItem('📝 JS 코드 보기', 'showCodeDialog')
    .addToUi();
}

function showCodeDialog() {
  const code = exportSheetToJS();
  const template = HtmlService.createTemplateFromFile('codeDialog');
  template.CODE = code;
  const html = template.evaluate()
    .setWidth(600)
    .setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, 'stores.js 코드 복사');
}