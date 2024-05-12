import Image from "next/image";

export default function PersonalPolicyWrap() {
  return (
    <div className="container  mx-auto py-12 flex flex-col items-start">
      <h1 className="text-xl font-bold">개인정보처리방침</h1>
      <p className="mt-3 border bg-neutral-100 p-3">
        파인파밍은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및
        관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게
        관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게
        개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을
        신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보
        처리방침을 수립·공개합니다.
      </p>
      <div className="flex flex-col w-full items-center mt-6">
        <h2 className="text-lg font-bold">주요 개인정보처리 표시(라벨링)</h2>
        <p className="text-neutral-500">
          ※ 세부항목은 개인정보 처리방침 본문 확인
        </p>
        <div className=" grid grid-cols-12 gap-3 mt-12">
          <div className="col-span-12  lg:col-span-4 flex flex-col items-center border rounded-md p-12 h-[200px]  justify-center gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/pi_collect.png"
              width={40}
              height={30}
              className=" object-cover"
              alt="일반 개인정보 수집"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold">일반 개인정보 수집 </p>
              <p className="text-sm">이름, 휴대전화번호, 이메일 등 </p>
            </div>
          </div>
          <div className="col-span-12  lg:col-span-4 flex flex-col items-center border rounded-md p-12 h-[200px]  justify-center gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/pi_object.png"
              width={40}
              height={30}
              className=" object-cover"
              alt="개인정보 처리 목적"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold">개인정보 처리 목적</p>
              <p className="text-sm">회원제 서비스 제공, 체험예약 등</p>
            </div>
          </div>
          <div className=" col-span-12  lg:col-span-4 flex flex-col items-center border rounded-md p-12 h-[200px]  justify-center gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/pi_period.png"
              width={40}
              height={30}
              className=" object-cover"
              alt="개인정보 보유기간"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold">개인정보 보유기간 </p>
              <p className="text-sm">회원탈퇴 시 즉시 파기 등</p>
            </div>
          </div>
          <div className="  col-span-12  lg:col-span-4 flex flex-col items-center border rounded-md p-12 h-[200px]  justify-center gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/pi_supply.png"
              width={40}
              height={30}
              className=" object-cover"
              alt="개인정보의 제3자 제공"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold">개인정보의 제3자 제공 </p>
              <p className="text-sm">
                제3자에게 개인정보를 제공 하고 있지 않습니다.
              </p>
            </div>
          </div>
          <div className=" col-span-12  lg:col-span-4 flex flex-col items-center border rounded-md p-12 h-[200px]  justify-center gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/pi_consignment.png"
              width={40}
              height={30}
              className=" object-cover"
              alt="개인정보 처리위탁"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold">개인정보 처리위탁 </p>
              <p className="text-sm">
                개인정보 처리업무를 위탁 하고 있지 않습니다.{" "}
              </p>
            </div>
          </div>
          <div className=" col-span-12  lg:col-span-4 flex flex-col items-center border rounded-md p-12 h-[200px]  justify-center gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/pi_voc.png"
              width={40}
              height={30}
              className=" object-cover"
              alt="고충처리부서"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold">고충처리부서 </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center mt-12">
        <h2 className="text-lg font-bold">목차</h2>
        <p className="text-neutral-500">
          「개인정보 처리방침」은 다음과 같은 내용으로 구성되어 있습니다.
        </p>

        <div className=" grid grid-cols-12 gap-6 mt-12 border rounded-md w-full p-6">
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_object.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제1조 개인정보의 처리목적, 수집항목, 보유 및 이용기간"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제1조 개인정보의 처리목적, 수집항목, 보유 및 이용기간
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_third.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제2조 개인정보의 제3자 제공에 관한 사항"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제2조 개인정보의 제3자 제공에 관한 사항
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_consign.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제3조 개인정보 처리업무의 위탁에 관한 사항"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제3조 개인정보 처리업무의 위탁에 관한 사항
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_destruction.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제4조 개인정보의 파기 절차 및 방법에 관한 사항 "
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제4조 개인정보의 파기 절차 및 방법에 관한 사항
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_court.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제5조 정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항 "
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제5조 정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_safe.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제6조 개인정보의 안전성 확보조치에 관한 사항"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제6조 개인정보의 안전성 확보조치에 관한 사항
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_cookie.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제7조 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항 "
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제7조 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에
                관한 사항
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/pi_collect.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제8조 전자우편주소 무단수집 거부 "
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제8조 전자우편주소 무단수집 거부
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/pi_collect.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제9조 개인 ID/비밀번호 관리"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제9조 개인 ID/비밀번호 관리
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_cpo.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제10조 개인정보 보호책임자에 관한 사항"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제10조 개인정보 보호책임자에 관한 사항
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_browse.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제11조 개인정보의 열람 청구를 접수·처리하는 부서"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제11조 개인정보의 열람청구를 접수·처리하는 부서
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_help.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제12조 정보주체의 권익침해에 대한 구제방법"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제12조 정보주체의 권익침해에 대한 구제방법
              </p>
            </div>
          </div>
          <div className="  col-span-12 flex flex-row items-center   justify-start gap-3">
            <Image
              src="https://www.privacy.go.kr/assets/img/sub/img_change.png"
              width={30}
              height={30}
              className=" object-cover"
              alt="제13조 개인정보 처리방침의 변경에 관한 사항"
            />
            <div className="flex gap-1 flex-col items-center">
              <p className=" font-semibold text-sm">
                제13조 개인정보 처리방침의 변경에 관한 사항
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_object.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제1조 개인정보의 처리목적, 수집항목, 보유 및 이용기간"
          />
          <h2 className="text-lg font-bold">
            제1조 개인정보의 처리목적, 수집 항목, 보유 및 이용기간
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>① 파인파밍은 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
          <p>
            ② 정보주체가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는
            사용되지 않으며 이용 목적이 변경될 시에는 사전 동의를 구할 것입니다.
          </p>
          <div className="w-full grid  grid-cols-12 gap-2 mt-3 ">
            <div className=" col-span-3  bg-neutral-100 text-sm p-3">
              <p>구분</p>
            </div>
            <div className=" col-span-3  bg-neutral-100 text-sm p-3">
              <p>수집목적</p>
            </div>
            <div className=" col-span-3  bg-neutral-100 text-sm p-3">
              <p>수집항목</p>
            </div>
            <div className=" col-span-3  bg-neutral-100 text-sm p-3">
              <p>보유 및 이용기간</p>
            </div>
          </div>
          <div className="w-full  text-sm">
            <div className=" grid grid-cols-12 w-full gap-2">
              <div className=" text-sm  col-span-12  grid grid-cols-12   gap-2">
                <div className=" col-span-1 bg-neutral-100 text-sm p-3">
                  <p>회원가입</p>
                </div>
                <div className="  col-span-11 grid grid-cols-11">
                  <div className=" col-span-2 bg-neutral-100 text-sm p-3">
                    <p>카카오계정으로 간편가입</p>
                  </div>
                  <div className=" col-span-3 bg-neutral-100 text-sm p-3">
                    <p>회원제서비스 제공, 체험예약 등</p>
                  </div>
                  <div className="  col-span-3 bg-neutral-100 text-sm p-3">
                    <p>[필수] 이름, 이메일</p>
                  </div>
                  <div className="  col-span-3 bg-neutral-100 text-sm p-3">
                    <p>회원탈퇴 시 즉시파기</p>
                  </div>
                </div>
                <div className="  col-span-12 grid grid-cols-12">
                  <div className=" col-start-2 col-end-4 bg-neutral-100 text-sm p-3">
                    <p>네이버계정으로 간편가입</p>
                  </div>
                  <div className="  col-span-3 bg-neutral-100 text-sm p-3">
                    <p>회원제서비스 제공, 체험예약 등</p>
                  </div>
                  <div className="  col-span-3 bg-neutral-100 text-sm p-3">
                    <p>[필수] 이름, 이메일</p>
                  </div>
                  <div className="  col-span-3 bg-neutral-100 text-sm p-3">
                    <p>회원탈퇴 시 즉시파기</p>
                  </div>
                </div>
                <div className="col-span-12 grid grid-cols-12">
                  <div className="bg-neutral-100 text-sm p-3 w-full  col-span-3">
                    <p>체험예약 시 이용 고객정보 입력</p>
                  </div>

                  <div className="bg-neutral-100 text-sm p-3 w-full  col-span-3">
                    <p>체험 예약정보 통지 및 확인 </p>
                  </div>

                  <div className="bg-neutral-100 text-sm p-3 w-full  col-span-3">
                    <p>필수 이름, 휴대전화번호</p>
                  </div>
                  <div className="bg-neutral-100 text-sm p-3 w-full  col-span-3">
                    <p>5년</p>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-12 grid grid-cols-12">
                  <div className="bg-neutral-100 text-sm p-3 w-full  col-span-3">
                    <p>마케팅 정보 수신동의</p>
                  </div>

                  <div className="bg-neutral-100 text-sm p-3 w-full  col-span-3">
                    <p>이벤트 및 혜택 정보 안내</p>
                  </div>

                  <div className="bg-neutral-100 text-sm p-3 w-full  col-span-3">
                    <p>[선택]이메일, 휴대전화번호</p>
                  </div>
                  <div className="bg-neutral-100 text-sm p-3 w-full  col-span-3">
                    <p>회원탈퇴 및 동의 철회 시 까지</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            ③ 서비스의 이용 과정에서 다음과 같은 정보들이 자동으로 생성되어
            수집될 수 있습니다. - 세션정보, 접속IP, 접속로그, 서비스 이용기록
          </p>
          <p>
            ④ 계약 종료, 서비스 탈퇴 또는 보유기간 경과 시에도 불구하고
            관계법령에 의해 보존하는 경우는 다음과 같습니다.
          </p>
          <div className="w-full grid grid-cols-12 gap-2 mt-3">
            <div className=" col-span-4 bg-neutral-100 text-sm p-3">
              <p>구분</p>
            </div>
            <div className=" col-span-4 bg-neutral-100 text-sm p-3">
              <p>수집항목</p>
            </div>
            <div className=" col-span-4 bg-neutral-100 text-sm p-3">
              <p>보유기간</p>
            </div>
          </div>
          <div className="w-full grid grid-cols-12 gap-2">
            <div className=" col-span-4 bg-neutral-100 text-sm p-3">
              <p>전자상거래 등에서의 소비자 보호에 관한 법률</p>
            </div>
            <div className=" col-span-4  flex flex-col items-start">
              <div className="bg-neutral-100 text-sm p-3 w-full">
                <p>계약 또는 청약철회 등에 관한 기록</p>
              </div>
              <div className="bg-neutral-100 text-sm p-3 w-full">
                <p>대금결제 및 재화 등의 공급에 관한 기록</p>
              </div>
              <div className="bg-neutral-100 text-sm p-3 w-full">
                <p>소비자의 불만 또는 분쟁처리에 관한 기록</p>
              </div>
              <div className="bg-neutral-100 text-sm p-3 w-full">
                <p>표시 및 광고에 관한 기록</p>
              </div>
            </div>
            <div className=" col-span-4">
              <div className=" col-span-4 bg-neutral-100 text-sm p-3">
                <p>5년</p>
              </div>
              <div className=" col-span-4 bg-neutral-100 text-sm p-3">
                <p>5년</p>
              </div>
              <div className=" col-span-4 bg-neutral-100 text-sm p-3">
                <p>3년</p>
              </div>
              <div className=" col-span-4 bg-neutral-100 text-sm p-3">
                <p>6개월</p>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-12 gap-2">
            <div className=" col-span-4 bg-neutral-100 text-sm p-3">
              <p>통신비밀보호법</p>
            </div>
            <div className=" col-span-4  flex flex-col items-start">
              <div className="bg-neutral-100 text-sm p-3 w-full">
                <p>이용자의 인터넷 등 로그 기록</p>
              </div>
            </div>
            <div className=" col-span-4">
              <div className=" col-span-4 bg-neutral-100 text-sm p-3">
                <p>3개월</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_third.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제2조 개인정보의 제3자 제공에 관한 사항"
          />
          <h2 className="text-lg font-bold">
            제2조 개인정보의 제3자 제공에 관한 사항
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① 파인파밍은 정보주체의 동의, 법률의 특별한 규정 등 「개인정보
            보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
            제공하며, 그 이외에는 정보주체의 개인정보를 제3자에게 제공하지
            않습니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_consign.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제3조 개인정보 처리업무의 위탁에 관한 사항"
          />
          <h2 className="text-lg font-bold">
            제3조 개인정보 처리업무의 위탁에 관한 사항
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>① 파인파밍은 개인정보 처리업무를 위탁하고 있지 않습니다.</p>
          <p>
            ② 파인파밍은 위탁업무의 내용이 변경될 경우에는 지체없이 본 개인정보
            처리방침을 통해 공개하도록 하겠습니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_destruction.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제4조 개인정보의 파기 절차 및 방법에 관한 사항 "
          />
          <h2 className="text-lg font-bold">
            제4조 개인정보의 파기 절차 및 방법에 관한 사항
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① 파인파밍은 다른 법률에 따라 개인정보를 보존하여야 하는 경우가 아닌
            한, 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게
            되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </p>
          <p>
            ② 정보주체로부터 동의 받은 보유기간이 경과하거나 처리목적이 달성
            되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는
            경우에는, 다른 회원의 개인정보와 분리하여 보관합니다.
          </p>
          <p>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
          <p>
            가. 파기절차 : 파인파밍은 파기 사유가 발생한 개인정보를 선정하고,
            파인파밍의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
          </p>
          <p>
            나. 파기방법 : 파인파밍은 전자적 파일 형태로 기록·저장된 개인정보는
            기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는
            분쇄기로 분쇄하거나 소각하여 파기합니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_court.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제5조 정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항 "
          />
          <h2 className="text-lg font-bold">
            제5조 정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① 정보주체는 파인파밍에 대해 언제든지 다음 각호에 해당하는
            개인정보에 관련한 권리를 행사할 수 있습니다.
          </p>
          <div className="pl-3">
            <p>가. 개인정보 열람요구</p>
            <p>나. 개인정보의 오류에 대한 정정 및 삭제의 요구</p>
            <p>다. 처리정지 요구</p>
            <p>라. 동의철회 요구</p>
          </div>
          <p>
            ② 제1항에 따른 권리 행사는 파인파밍에 대해 「개인정보 보호법」
            시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여
            하실 수 있으며, 파인파밍은 이에 대해 지체 없이 조치하겠습니다. 또한,
            마이페이지 내 ‘정보수정’을 클릭하여 직접 열람 및 정정(선택적
            동의철회 포함)을 하실 수 있으며, ‘회원탈퇴’를 클릭하여 본인 확인
            절차를 거치신 후 탈퇴가 가능합니다.
          </p>
          <p>
            ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자
            등 대리인을 통하여 하실 수 있습니다. 이 경우 “개인정보 처리 방법에
            관한 고시” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
          </p>
          <p>
            ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항,
            제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
          </p>
          <p>
            ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집
            대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
          </p>
          <p>
            ⑥ 파인파밍은 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구,
            처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한
            대리인인지를 확인합니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_safe.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제6조 개인정보의 안전성 확보조치에 관한 사항"
          />
          <h2 className="text-lg font-bold">
            제6조 개인정보의 안전성 확보조치에 관한 사항
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① 파인파밍은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
            있습니다.
          </p>
          <div className="pl-3">
            <p>가. 관리적 조치 : 내부관리계획 수립·시행 등</p>
            <p>
              나. 기술·물리적 조치 : 개인정보처리시스템 등의 접근권한 관리·통제
              등
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_cookie.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제7조 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항 "
          />
          <h2 className="text-lg font-bold">
            제7조 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① 쿠키는 일반 웹사이트를 운영하는데 이용되는 서버가 사용자
            브라우저에 보내는 조그마한 데이터 꾸러미입니다.
          </p>
          <p>
            ② 쿠키는 보통 하드디스크의 windows cookies에 암호화되어 저장됩니다.
          </p>
          <div className="pl-3">
            <p>
              - 파인파밍에서 제공하는 인터넷 서비스를 통하여 개인 PC 정보를
              찾아내는 쿠키(cookie)를 설치, 운영하는 경우도 있습니다.
            </p>
            <p>
              - 쿠키란 웹 서버가 웹 브라우저에게 보내어 저장했다가 서버의
              부가적인 요청이 있을 때 다시 서버로 보내주는 문자열 정보를
              말합니다. 웹 사이트에 접속을 하시면 정보주체의 브라우저에 있는
              쿠키의 내용을 읽고, 추가 정보를 찾아 접속에 따른 성명 등의 추가
              입력 없이 서비스를 제공할 수 있습니다.
            </p>
            <p>
              - 파인파밍이 쿠키를 통해 수집하는 정보는 회원의 ID에 한하며, 그
              외의 다른 정보는 수집하지 않습니다. 퍼인파밍이 쿠키를 통해 수집한
              회원의 ID는 다음의 목적을 위해 사용될 수 있습니다.
            </p>
          </div>
          <div className="pl-3">
            <p>(1) 개인의 관심 분야에 따라 차별화된 화면 정보를 제공</p>
            <p>
              (2) 관심 있게 둘러본 내용들에 대한 자취를 추적하여 다음 번 접속 때
              개인 맞춤 서비스를 제공
            </p>
            <p>(3) 회원들의 습관을 분석하여 서비스 개편 등의 척도로 활용</p>
            <div className="pl-3">
              <p>
                - 거부 설정 방법: 다음의 방법을 통한 옵션 설정을 통해 쿠키 저
                장을 거부할 수 있습니다.
              </p>
              <p>
                {`1) Microsoft edge의 경우 : 웹 브라우저 상단의 설정 및 기타 메뉴 (Alt+F) > 쿠키 및 사이트 권한 > 쿠키 및 사이트 데이터 관리 및 삭제 > “사이트에서 쿠키 데이터를 저장하고 읽도록 허용” 비활성화`}
              </p>
              <p>
                {`2) Chrome의 경우 : 웹 브라우저 우측의 설정 메뉴 > 설정 > 개인 정보 및 보안 > 쿠키 및 기타 사이트 데이터`}
              </p>
              <p>
                {`3) Internet Explorer 11 의 경우 : 웹 브라우저 상단의 도구 메뉴 > 인터넷 옵션 > 개인정보 > 고급`}
              </p>
              <p>
                - 단, 정보주체가 쿠키 설치를 거부하였을 경우 서비스 이용에
                불편이 있거나, 서비스 제공에 어려움이 있을 수 있습니다.
              </p>
              <p>- 쿠키는 브라우저의 종료 시나 로그아웃 시 만료됩니다.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/pi_collect.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제8조 전자우편주소 무단수집 거부 "
          />
          <h2 className="text-lg font-bold">
            제8조 전자우편주소 무단수집 거부
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① &quot;홈페이지&quot;에 게시된 이메일 주소가 전자우편 수집
            프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을
            거부하며, 이를 위반 시 「개인정보 보호법」에 의해 형사 처벌됨을
            유념하시기 바랍니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/pi_collect.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제9조 개인 ID/비밀번호 관리"
          />
          <h2 className="text-lg font-bold">제9조 개인 ID/비밀번호 관리</h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① 홈페이지 서비스의 ID와 비밀번호에 대한 관리 책임은 본인에게
            있습니다.
          </p>
          <p>
            ② 파인파밍은 홈페이지 서비스 이용자의 개인정보를 보호하기 위해
            최선을 다하고 있습니다.
          </p>
          <p>
            ③ 그러나 이런 노력 이외에도 이용자 개개인이 본인의 개인정보를
            효과적으로 보호하기 위해서 자신의 회원ID 와 비밀번호를 적절하게
            관리해야 하고 여기에 대한 책임을 져야 합니다.
          </p>
          <p>
            ④ 혹시라도 이용자 본인이 본인의 ID와 비밀번호를 유출하였다면 이에
            대해서 회사가 책임을 지지 않습니다.
          </p>
          <p>
            ⑤ 또한 파인파밍은 어떠한 경우에도 전화나 e-mail 등을 통해 사용자의
            비밀번호를 묻지 않습니다.
          </p>
          <p>
            ⑥ 그러므로 해당 ID와 비밀번호는 절대 본인만이 사용하시고, 비밀번호를
            자주 바꿔주시는 것이 좋습니다.
          </p>
          <p>
            ⑦ 또한, 파인파밍은 개인정보보호에 최선을 다하지만 이용자 개인의
            실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을
            지지 않습니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_cpo.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제10조 개인정보 보호책임자에 관한 사항"
          />
          <h2 className="text-lg font-bold">
            제10조 개인정보 보호책임자에 관한 사항
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① 파인파밍은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="pl-3">
            <p> - 개인정보보호책임자 : 허정근(010-3381-6893)</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_browse.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제11조 개인정보의 열람 청구를 접수·처리하는 부서"
          />
          <h2 className="text-lg font-bold">
            제11조 개인정보의 열람 청구를 접수·처리하는 부서
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① 정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람
            청구를 아래의 부서에 할 수 있습니다. 파인파밍은 정보주체의 개인정보
            열람청구가 신속하게 처리되도록 노력 하겠습니다.
          </p>
          <div className="pl-3 w-full">
            <p>- 개인정보 열람청구 접수·처리 담당자 : 허정근(010-3381-6893)</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_help.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제12조 정보주체의 권익침해에 대한 구제방법"
          />
          <h2 className="text-lg font-bold">
            제12조 정보주체의 권익침해에 대한 구제방법
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① 정보주체는 개인정보침해로 인한 구제를 받기 위하여
            개인정보분쟁조정위원회, 한국인터넷진흥원, 개인정보침해신고센터 등에
            분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타
            개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기
            바랍니다.
          </p>
          <div className="pl-3">
            <p>
              - 개인정보분쟁조정위원회 : (국번없이) 1833-6972
              (www.privacy.go.kr)
            </p>
            <p>- 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</p>
            <p>- 대검찰청 : (국번없이) 1301 (www.spo.go.kr)</p>
            <p>- 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-start mt-12 gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <Image
            src="https://www.privacy.go.kr/assets/img/sub/img_change.png"
            width={30}
            height={30}
            className=" object-cover"
            alt="제13조 개인정보 처리방침의 변경에 관한 사항"
          />
          <h2 className="text-lg font-bold">
            제13조 개인정보 처리방침의 변경에 관한 사항
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2  w-full ">
          <p>
            ① 이 개인정보처리방침은 파인파밍 서비스 오픈에 맞춰 최초로 수립된
            것으로 2024년 5월 10일부터 적용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
