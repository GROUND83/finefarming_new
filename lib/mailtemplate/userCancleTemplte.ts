export default function userCancleTemple({
  username,
  farmAddress,
  checkIndate,
  visitor,
  visitorPhone,
  farmName,
}: {
  username: string;
  farmAddress: string;
  checkIndate: string;
  visitor: string;
  visitorPhone: string;
  farmName: string;
}) {
  let html = `<!doctype html>
  <html>
  <body style="width:500px;">
  <div style="border: 1px;width: 400px;background-color: #f5f5f5;border: 1px solid #e5e7eb;padding: 70px;border-radius: 20px;">

    <img
      src="https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/bdab6fb3-d498-49e5-3a5b-d03c601c8d00/public"
      alt="finefarminglogo"
      title="Logo"
      style="display:block;width:100px;height:50px;"

    />
 
  <h1 style="font-size: 24px; margin-top: 20px;">예약 취소</h1>
  <p style="font-size: 24px">${username} 고객님의 예약을 취소하였습니다.</p>
  <div
    style="   
      width: 100%;
      margin-top: 20px;
    "
  >
    <div
      style="
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e7eb;
      "
    >
      <span>방문자대표 </span>
      <span style="margin-left: 10px">${visitor}</span>
    </div>
    <div
      style="
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e7eb;
      "
    >
      <span>방문자대표 연락처</span>
      <span style="margin-left: 10px">${visitorPhone}</span>
    </div>
    <div
      style="
        width: 100%;
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e7eb;
      "
    >
      <span>농장명</span>
      <span style="margin-left: 10px">${farmName}</span>
    </div>
    <div
      style="
       
        width: 100%;
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e7eb;
      "
    >
      <span>농장 주소</span>
      <span style="margin-left: 10px">${farmAddress}</span>
    </div>
    <div
      style="
       
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e7eb;
        margin-top: 10px;
      "
    >
      <span>방문일시</span>
      <span style="margin-left: 10px">${checkIndate}</span>
    </div>

  
  </div>
  <div style="margin-top: 50px">
    <a
      href="https://finefarming.co.kr"
      style="
        padding: 10px 20px;
        border-radius: 10px;
        text-decoration: none;
        background-color: #21c45d;
        color: white;
      "
    >
      파인파밍 바로가기</a
    >
  </div>
  <div style="margin-top: 50px">
    <p style="color: #737373">© 2024. FineFarming All rights reserved.</p>
  </div>
</div>
</body>
</html>
`;

  return html;
}
