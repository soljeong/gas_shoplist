# 대리점안내 페이지
- 구글 시트에서 테이블 로드
- 데이터를 원래 지정된 형식의 js 파일로 만들기

## 목차

1. [개요](#개요)
2. [사전 요구사항](#사전-요구사항)
3. [프로젝트 구조](#프로젝트-구조)
4. [핵심 모듈 및 함수](#핵심-모듈-및-함수)

   * [exportSheetToJS()](#exportSheetToJS)
   * [onOpen()](#onOpen)
   * [showCodeDialog()](#showCodeDialog)
5. [환경 설정](#환경-설정)

   * [스프레드시트 ID 지정](#스프레드시트-ID-지정)
6. [코드 실행 방법](#코드-실행-방법)
7. [확장 포인트 및 유지보수](#확장-포인트-및-유지보수)
8. [에러 처리 가이드](#에러-처리-가이드)
9. [버전 관리 및 릴리즈 전략](#버전-관리-및-릴리즈-전략)
10. [참고 자료 및 연락처](#참고-자료-및-연락처)

---

## 개요

EZ대리점 스토어 데이터 다운로드 프로젝트는 **스프레드시트 사용자**만 활용하므로 별도의 웹 앱 배포 없이 구글 시트 내부에서 직접 `stores.js` 코드를 복사·사용할 수 있도록 기능을 제공합니다.

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
* **템플릿(`codeDialog.html`) 예시**:

  ```html
  <!DOCTYPE html>
  <html>
    <head><base target="_top"></head>
    <body>
      <h3>stores.js 코드 복사</h3>
      <textarea id="code-area" style="width:100%;height:300px;">{{CODE}}</textarea>
      <br>
      <button onclick="copyCode()">복사하기</button>
      <script>
        function copyCode() {
          const ta = document.getElementById('code-area');
          ta.select(); document.execCommand('copy');
          alert('클립보드에 복사되었습니다.');
        }
      </script>
    </body>
  </html>
  ```

## 환경 설정

### 스프레드시트 ID 지정

* `Code.gs` 최상단 상수로 `const spreadsheetId = '여기에_스프레드시트_ID';` 설정

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

## 버전 관리 및 릴리즈 전략

* Git에서 Semantic Versioning(예: `v1.0.0`) 사용
* 주요 변경사항은 `CHANGELOG.md`로 기록

## 참고 자료 및 연락처

* [Google Apps Script 공식 문서](https://developers.google.com/apps-script)
* 담당자: 홍길동 ([email@example.com](mailto:email@example.com))
