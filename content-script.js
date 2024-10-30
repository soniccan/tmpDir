// リスナーを即時関数で囲む
(function() {
  console.log("Content script loaded"); // デバッグ用ログ
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message.functiontoInvoke == "github") {
          try {
              const url = location.href;
              const title = document.querySelector('[placeholder="新規ページ"]').innerHTML;
              const outputText = "[" + title + "](" + url + ")";
              
              navigator.clipboard.writeText(outputText)
                  .then(() => {
                      console.log("コピー成功");
                      // 重要：sendResponseを呼び出して成功を通知
                      sendResponse({success: true});
                  })
                  .catch(err => {
                      console.error("コピー失敗:", err);
                      sendResponse({success: false, error: err.message});
                  });
              
              // 非同期処理を行うため、trueを返す
              return true;
          } catch (error) {
              console.error("エラー発生:", error);
              sendResponse({success: false, error: error.message});
          }
      }
  });
})();