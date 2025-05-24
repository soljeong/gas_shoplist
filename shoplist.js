function exportSheetToJS() {
  // 스프레드시트 ID를 직접 넣어 주세요
  const ss = SpreadsheetApp.openById("1_Kf5Zi1E26lNIFQATJOeyVNt-NFgZRTWrfvehQLjYlU");
  const sheet = ss.getSheetByName("EZ대리점");
  if (!sheet) throw new Error('시트 "EZ대리점"을 찾을 수 없습니다.');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  // 필요한 열 인덱스 정의
  const indices = {
    name: headers.indexOf("매장이름"),
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

function doGet() {
  const storesData = exportSheetToJS(); // 아래 함수 참조
  Logger.log(storesData);

  const html = `
    <html>
      <body>
        <a id="download" href="data:text/javascript;charset=utf-8,${encodeURIComponent(storesData)}" download="stores.js">Download stores.js</a>
        <script>document.getElementById("download").click();</script>
      </body>
    </html>
  `;
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("📦 유틸리티")
    .addItem("📝 JS 파일 다운로드", "openWebApp")
    .addToUi();
}

function openWebApp() {
  const url = "https://script.google.com/macros/s/AKfycbz5HvepLWwS0way5HgUtvrJq9EG3mVj-QJeHZz_GQ1k7ODh-TZlV_6nJCrfzv2ZEn4Bjg/exec"; // 웹앱 URL 넣기
  const html = `
    <script>
      window.open("${url}", "_blank");
      google.script.host.close();
    </script>
  `;
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(html).setWidth(10).setHeight(10),
    "JS 다운로드"
  );
}
