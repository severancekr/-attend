// 출근 관리 시스템 - 웹 설정
// 이 파일은 GitHub에 올리는 파일과, 인터넷이 막힌 근무지 PC에 복사하는 파일이 똑같아야 합니다.
window.ATT_CONFIG = {
  // Apps Script 배포 후 받은 "웹 앱 URL" (https://script.google.com/macros/s/..../exec)
  API_URL: "https://script.google.com/macros/s/AKfycbyZFmGzXdEMZrVWjNUniJHtjHBMoNzlB3Z4kXrVTNQTOfUE_d5A72OdYbH7XSH3YpXL/exec",

  // GitHub Pages 주소 (끝에 / 포함). 인터넷이 막힌 PC에서 만드는 QR도 이 주소로 연결됩니다.
  WEB_URL: "https://아이디.github.io/attend/",

  // 개인정보 동의서에 표시되는 회사명과 문의처
  COMPANY_NAME: "(주)에스텍시스템",
  CONTACT: "문의:02-2227-4915",

  // 인터넷이 막힌 PC에서 첫 설정할 때 보여줄 근무지 목록
  // (구글 시트 '근무지' 탭과 코드가 같아야 합니다. 근무지를 추가하면 여기에도 한 줄 추가하세요)
  SITES: [
    { code: "M1F", name: "본관 1층" },
    { code: "M3F", name: "본관 3층" },
    { code: "C1F", name: "암병원 1층" },
    { code: "C3F", name: "암병원 3층" },
    { code: "SC-REHAB", name: "전문센터 - 재활" },
    { code: "SC-MED", name: "전문센터 - 의대" },
    { code: "SC-EYE", name: "전문센터 - 안과" },
    { code: "SC-DENT", name: "전문센터 - 치과" },
    { code: "SC-HEART", name: "전문센터 - 심혈관" },
    { code: "SC-KIDS", name: "전문센터 - 어린이" }
  ]
};
