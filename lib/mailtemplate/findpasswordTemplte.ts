export default function findPasswordTemlplate({
  username,
  tempassword,
}: {
  username: string;
  tempassword: string;
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

          <h1 style="font-size: 24px; margin-top: 20px">비밀번호 변경</h1>
          <p style="font-size: 24px">${username} 비밀번호 변경 안내입니다.</p>
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
              <span>임시 비밀번호 </span>
              <span style="margin-left: 10px">${tempassword}</span>
            </div>
           <p style="margin-top: 10px">임시 비밀번호 로그인 후 비밀번호를 변경하세요. </p>
          
           
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
