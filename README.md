# SmartBusStop
電子ペーパーを使用したスマートバス停

現在の使用機材

+ AL-050（通信モジュール）
+ Raspberry Pi3（マイコン）
+ 13.3インチ電子ペーパー

# Visionect Software Suiteの使い方 
Visionect Software SuiteはVisionect社が提供するVisionect社製電子ペーパーのコンテンツなどを管理するWebサービスである．

+ 参考サイト

[https://docs.visionect.com/VisionectSoftwareSuite/ManagementInterface.html](https://docs.visionect.com/VisionectSoftwareSuite/ManagementInterface.html)

あらかじめ使用するRaspberry PiにVisionect Software Suiteをインストール済みとする．

1. スイッチングハブにRaspberry Piと電子ペーパーを接続し，研究室内のインターネットに接続（ネットワークの場合は，あいちITSワールドの資料を参照してください．）
2. 電子ペーパーには付属バッテリーがあり，そこから伸びている電源コネクタをシステムボードに接続して電子ペーパーの電源をオン
3. Raspberry Piの電源を入れてデスクトップPCからWebブラウザを開き，`http://Raspberry PiのIPアドレス:8081/`と検索

以下のWebページが表示される．

![Visionect Software Suite 管理インターフェース](https://docs.visionect.com/_images/status.png)


 **ONLINE DEVICES**には接続されている電子ペーパーの現在の表示コンテンツが表示されている． 
 **View the device**をクリックすると 以下の表示画面の設定ページが表示される．

![Basic mode](https://docs.visionect.com/_images/basic_explain.png)

+ ①： デバイス（電子ペーパー）の状態 オンラインorオフライン
+ ②： デバイスID
+ ③：バッテリーと通信状態
+ ④：電子ペーパーのディスプレイに表示されているコンテンツ
+ ⑤：デバイスの設定 表示コンテンツの変更など

⑤の**Change content**をクリックすると以下のページが表示され，**Display web page**よりURLを入力すると表示したいページが表示される．

![Device Settings](https://docs.visionect.com/_images/basic_content.png)