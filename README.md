# 日記アプリ<!-- omit in toc -->
<img width="1440" height="1041" alt="Image" src="https://github.com/user-attachments/assets/71779149-969f-456a-bd3b-dd7b21b20391" />

## 目次<!-- omit in toc -->
- [概要](#概要)
- [公開URL](#公開url)
- [目的](#目的)
- [こだわったポイント](#こだわったポイント)
- [今後の展望](#今後の展望)
- [使用技術](#使用技術)
- [使用フォント](#使用フォント)
- [デザインカンプ](#デザインカンプ)
- [全体画像](#全体画像)
- [機能説明](#機能説明)
  - [日記テキスト入力](#日記テキスト入力)
  - [GeminiAPIの設定](#geminiapiの設定)
  - [Geminiにコメントをもらう](#geminiにコメントをもらう)

## 概要

ユーザーが書いた日記の内容に対して、Googleの生成AIであるGemini APIがコメントを返してくれるアプリケーションです。

## 公開URL
[https://diary-sample.mikanbako.jp/](https://diary-sample.mikanbako.jp/)

## 目的
Node.js、Express、Vue.jsでのアプリケーションに初めて挑戦し、学習のアウトプットとして作成しました。

## こだわったポイント

* **フルスタックJavaScriptでの開発**
  * フロントエンドは**Vue.js**、バックエンドは**Node.js**と**Express**を採用し、モダンなJavaScript環境でのWebアプリケーション開発の基礎を学びました。
* **外部APIとの連携**
  * バックエンドから**Gemini API**を呼び出し、ユーザーの入力内容や設定に応じて動的にプロンプトを生成し、パーソナライズされた応答を返す機能を実装しました。
  * フロントエンドからは**axios**を利用して、サーバーと非同期通信を行っています。

## 今後の展望

このアプリケーションの開発経験を活かし、より実践的な機能（ユーザー認証、データベースへの日記の保存・編集・削除機能など）を備えた、さらに規模の大きいWebアプリケーションの開発に取り組んでいく予定です。

## 使用技術
* **フロントエンド**: Vue.js (v3)
* **バックエンド**: Node.js, Express
* **API**: [Gemini API](https://ai.google.dev/api/generate-content?hl=ja#v1beta.models.generateContent)
* **その他**: axios

## 使用フォント
* [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)

## デザインカンプ
* デザインデータはありません。

## 全体画像
* 初期表示

<img width="1440" height="865" alt="Image" src="https://github.com/user-attachments/assets/e8f5bc8b-4f4e-4a82-a2dc-6a45d9ad07a7" />

* テキスト入力し、Geminiからコメントをいただき表示

<img width="1440" height="1041" alt="Image" src="https://github.com/user-attachments/assets/71779149-969f-456a-bd3b-dd7b21b20391" />


## 機能説明
このアプリケーションの各機能を紹介、説明します。

### 日記テキスト入力
![Image](https://github.com/user-attachments/assets/63ca8da8-7f48-455b-916a-a792e295ef0f)

日記テキストを入力します。

テキストを入力すると下にある「Geminiにコメントをもらう」ボタンをクリックできるようになります。
### GeminiAPIの設定
![Image](https://github.com/user-attachments/assets/cc617c74-3a07-4e19-bf6c-4d3e0c896176)

日記の書き手やGeminiの性別、関係性を設定します。

Geminiからもらえるコメントが設定にあわせて変化します。

### Geminiにコメントをもらう
![Image](https://github.com/user-attachments/assets/026721fb-058f-4140-8b1b-a6ff038b148b)

ボタンをクリックするとGeminiから日記に対してのコメントがもらえます。

クリックして少し時間が経過後、ボタンの下にコメントが表示されます。