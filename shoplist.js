function exportSheetToJS() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("대리점");  // 시트 이름
  if (!sheet) throw new Error('시트 "대리점"을 찾을 수 없습니다.');

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  // 열 인덱스 매핑 : 시트에서 사용할 열의 이름을 입력
  const idx = (name) => headers.indexOf(name);

  const indices = {
    name: idx("온라인매장명"),
    status: idx("구분"),
    address: idx("주소"),
    tel: idx("매장번호"),

    red: idx("red"),               
    bicycle: idx("bicycle"),
    scooter: idx("scooter"),
    kick: idx("kick"),

    city: idx("city"),
    county: idx("county"),
    lat: idx("lat"),
    lng: idx("lng"),

    hours: idx("영업시간"),
    map: idx("지도링크"),
    models: idx("취급모델"),          // 쉼표 구분 문자열
    youtube: idx("youtube"),
    insta: idx("insta"),
    blog: idx("blog"),
    comment: idx("comment")
  };

  const stores = rows
    .filter(r => r[indices.name])                 // 매장명 없는 행 제외
    .filter(r => r[indices.status] !== "일반")  // 구분에 일반 매장 제외
    .map(r => ({
      name: r[indices.name],
      address: r[indices.address],
      tel: r[indices.tel],

      red: !!r[indices.red],
      bicycle: !!r[indices.bicycle],
      scooter: !!r[indices.scooter],
      kick: !!r[indices.kick],

      city: r[indices.city],
      county: r[indices.county],
      lat: Number(r[indices.lat]),
      lng: Number(r[indices.lng]),

      hours: r[indices.hours] || "",
      map: r[indices.map] || "",

      models: r[indices.models]
        ? String(r[indices.models])
            .split(",")
            .map(s => s.trim())
            .filter(Boolean)
        : [],

      youtube: r[indices.youtube] || "",
      insta: r[indices.insta] || "",
      blog: r[indices.blog] || "",
      comment: r[indices.comment] || ""
    }));

  let body = JSON.stringify(stores, null, 2);

  // JSON key "name": → JS key name:
  body = body.replace(/"([a-zA-Z0-9_]+)"\s*:/g, "$1:");

  const jsCode = `const STORES = ${body};`;
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

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <style>
      body {
        font-family: monospace;
        margin: 0;
        padding: 12px;
        background: #f9f9f9;
      }
      textarea {
        width: 100%;
        height: 90vh;
        box-sizing: border-box;
        font-family: monospace;
        font-size: 12px;
        white-space: pre;
        resize: none;
      }
      .actions {
        margin-bottom: 8px;
        text-align: right;
      }
      button {
        padding: 6px 12px;
        font-size: 12px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="actions">
      <button onclick="selectAll()">전체 선택</button>
    </div>

    <textarea id="code" readonly></textarea>

    <script>
      const code = ${JSON.stringify(code)};
      const ta = document.getElementById("code");
      ta.value = code;

      function selectAll() {
        ta.focus();
        ta.select();
      }

      // 다이얼로그 열리면 자동 전체 선택
      window.onload = selectAll;
    </script>
  </body>
</html>
`;

  const output = HtmlService.createHtmlOutput(html)
    .setWidth(900)
    .setHeight(600);

  SpreadsheetApp.getUi().showModalDialog(output, "stores.js 코드 복사");
}