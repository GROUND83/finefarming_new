//
export function LinkPreview({ content }: { content: string }) {
  const urlRegex = new RegExp(/(https?:\/\/[^\s]+)/g);

  // 링크를 감지하여 a 태그로 감싸기
  const replace = (content: string) => {
    //
    // console.log("content", content);
    // const convertContent = content.replace(urlRegex, function (url) {
    //   return `<a href="${url}" target={"_blank"} className={"underline"}>${url}</a>`;
    // });
    // console.log("convertContent", convertContent);

    const htmlArr: any = [];
    content.split("\n").forEach(function (text) {
      const textHtml = `${text}`;
      htmlArr.push(textHtml);
    });
    // let newDAta = JSON.stringify(htmlArr);
    // console.log("htmlArr", JSON.parse(newDAta));
    return htmlArr;
  };

  const checkUrl = (url: string) => {
    let result = urlRegex.test(url);
    return result;
  };
  return (
    <div className="flex flex-col items-start justify-start flex-1   w-full h-full gap-2 ">
      <p>프리뷰</p>
      <div className=" p-6 flex-1 border w-full h-full rounded-md">
        {replace(content).map((item: any, index: any) => {
          console.log("item", item);
          return (
            <div key={index} className="flex flex-col items-start text-sm">
              {item ? (
                <>
                  {checkUrl(item) ? (
                    <a
                      href={`${item}`}
                      target={"_blank"}
                      className="underline text-primary"
                    >
                      {item}
                    </a>
                  ) : (
                    <p>{item}</p>
                  )}
                </>
              ) : (
                <p className="mt-4">{item}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export function UserLinkPreview({ content }: { content: string }) {
  const urlRegex = new RegExp(/(https?:\/\/[^\s]+)/g);

  // 링크를 감지하여 a 태그로 감싸기
  const replace = (content: string) => {
    //
    // console.log("content", content);
    // const convertContent = content.replace(urlRegex, function (url) {
    //   return `<a href="${url}" target={"_blank"} className={"underline"}>${url}</a>`;
    // });
    // console.log("convertContent", convertContent);

    const htmlArr: any = [];
    content.split("\n").forEach(function (text) {
      const textHtml = `${text}`;
      htmlArr.push(textHtml);
    });
    // let newDAta = JSON.stringify(htmlArr);
    // console.log("htmlArr", JSON.parse(newDAta));
    return htmlArr;
  };

  const checkUrl = (url: string) => {
    let result = urlRegex.test(url);
    return result;
  };
  return (
    <div className="flex flex-col items-start justify-start flex-1   w-full h-full gap-2 ">
      <div className=" p-6 flex-1 border w-full h-full ">
        {replace(content).map((item: any, index: any) => {
          console.log("item", item);
          return (
            <div key={index} className="flex flex-col items-start text-sm">
              {item ? (
                <>
                  {checkUrl(item) ? (
                    <a
                      href={`${item}`}
                      target={"_blank"}
                      className="underline text-primary text-sm"
                    >
                      {item}
                    </a>
                  ) : (
                    <p className="text-sm text-pretty">{item}</p>
                  )}
                </>
              ) : (
                <p className="mt-4">{item}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
