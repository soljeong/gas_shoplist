function onEdit(e) {
  const sh = e.range.getSheet();
  const col = e.range.getColumn();
  if (col !== 6) return;            // F열만
  if (e.range.getRow() < 2) return; // 헤더 제외

  const values = e.range.getValues(); // 여러 행/열 붙여넣기 대비
  for (let r = 0; r < values.length; r++) {
    const fVal = values[r][0]; // F열 값
    const gCell = sh.getRange(e.range.getRow() + r, 7); // G열

    if (fVal !== "" && gCell.getValue() === "") {
      gCell.setValue(new Date()); // 최초 1회만 기록(고정)
    }

    // (선택) F를 지우면 G도 지우고 싶으면 아래 주석 해제
    // if (fVal === "") gCell.clearContent();
  }
}
  