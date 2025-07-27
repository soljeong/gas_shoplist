# 대리점안내 페이지
- 구글 시트에서 테이블 로드
- 데이터를 원래 지정된 형식의 js 파일로 만들기



## 사전 요구사항

* Google 계정
* 해당 스프레드시트에 대한 **편집 권한** (스크립트 메뉴 접근 및 실행)
* Apps Script 프로젝트 생성 권한

## 프로젝트 구조

```
/src
  └ Code.gs            // 주 스크립트 파일
/resources
  └ codeDialog.html    // 코드 복사용 HTML 템플릿
appsscript.json        // 프로젝트 설정
```

## 핵심 모듈 및 함수

### `exportSheetToJS()`

* **목적**: "EZ대리점" 시트의 데이터를 읽어 JavaScript 객체 배열로 변환
* **동작 요약**:

  1. `SpreadsheetApp.openById(spreadsheetId)`로 문서 접근
  2. `getSheetByName('EZ대리점')`으로 시트 선택
  3. 헤더 행으로부터 `indices` 생성
  4. 데이터 행을 순회하며 매장 객체 배열 구성
  5. `JSON.stringify(stores, null, 2)`로 포맷팅
* **반환값**: `String` 형태의 JS 코드

### `onOpen()`

* **목적**: 스프레드시트 UI에 커스텀 메뉴 추가
* **동작**:

  ```js
  function onOpen() {
    SpreadsheetApp.getUi()
      .createMenu('📦 유틸리티')
      .addItem('📝 JS 코드 보기', 'showCodeDialog')
      .addToUi();
  }
  ```

### `showCodeDialog()`

* **목적**: 모달 대화상자로 `stores.js` 코드 표시 및 복사를 지원
* **동작**:

  1. `exportSheetToJS()` 호출해 코드 문자열 생성
  2. `HtmlService.createHtmlOutputFromFile('codeDialog')` 사용
  3. 템플릿 내 `<textarea>`에 코드 삽입 후 `Ui.showModalDialog()` 호출


## 환경 설정

## 코드 실행 방법

1. 구글 스프레드시트에서 **📦 유틸리티 > 📝 JS 코드 보기** 클릭
2. 모달 대화상자에 표시된 코드 영역에서 **전체 선택(Ctrl+A) 후 복사(Ctrl+C)**
3. 로컬 에디터에 붙여넣기하여 `stores.js`로 저장

## 확장 포인트 및 유지보수

* **필드 추가**: `exportSheetToJS()` 내 `indices` 객체와 매핑 로직 수정
* **UI 커스터마이징**: `codeDialog.html` 스타일 및 버튼 기능 확장

## 에러 처리 가이드

* **스프레드시트 ID 오류**: `openById` 예외 메시지 확인 및 ID 재설정
* **시트 없음**: `getSheetByName` 반환값 검사 후 사용자 경고 추가
