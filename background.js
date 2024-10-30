// コンテキストメニュー初期化用の関数
const updateContextMenus = async () => {
    // 一度全てクリア
    await chrome.contextMenus.removeAll();

    
    chrome.contextMenus.create({
        id: "irst-extension-something",
        type: "normal",
        title: "Notion Link&Title Copy",
        contexts: ["all"]
    });
};

// インストール時、再セットアップ時（拡張機能リロード）に実行されるよう、リスナーを登録
chrome.runtime.onInstalled.addListener(updateContextMenus);
chrome.runtime.onStartup.addListener(updateContextMenus);

// コンテキストメニューのクリックイベントリスナーを登録
chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));

    // 対象タブにメッセージを送信
    chrome.tabs.sendMessage(tab.id, {
        "functiontoInvoke": "github"
    }).then((response) => {
        if (response && response.success) {
            console.log("メッセージ送信成功");
        } else {
            console.error("メッセージ送信失敗:", response.error);
        }
    }).catch((error) => {
        console.error("メッセージ送信エラー:", error);
    });
});