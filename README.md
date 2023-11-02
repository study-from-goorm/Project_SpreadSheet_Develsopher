# 📝 Spread Sheet Application With Vanilla Javascript

## 한줄설명
바닐라 자바스크립트로 `row`, `column`사이즈가 조절이 가능하며 `csv 파일추출`이 가능한 스프레드시트 어플리케이션 입니다.


![스크린샷 2023-11-02 오후 7 11 55](https://github.com/study-from-goorm/Project_SpreadSheet_Develsopher/assets/78126381/c37726fb-b70e-426b-8bcb-21e3d4e69f98)

### UI적 구현

- 기본 `10x10`사이즈의 스프레드시트 입니다.
- Row, Column관련 추가 및 삭제가 가능한 버튼을 추가하여 유저가 스프레드 시트의 사이즈를 조절할 수 있습니다.
- 어플리케이션 정책(최대 생성 Row, Column)에 따라 유저에게 안내메시지를 제공해줍니다.
- 해당 **Cell**클릭시 Cell의 위치정보를 나타내며 입력한 내용 기준으로 **CSV 파일추출**이 가능합니다.

### 코드적 구현
- **config파일**을 따로 구성하여 어플리케이션정책(초기 기본사이즈, 최대생성갯수 등)과 관련된 상수를 관리하여 유지보수에 도움이 되는 방향을 선택하였습니다.
- 셀 하나하나마다 이벤트를 걸지않고 **이벤트 위임**을 사용하여 해당요소에 해당하는 이벤트 기준으로 클릭 및 change액션을 수행함으로써 기능적 이점을 추구하였습니다.

https://github.com/study-from-goorm/Project_SpreadSheet_Develsopher/assets/78126381/0a484a2e-0ed1-43c7-90b4-49e4445cde47

