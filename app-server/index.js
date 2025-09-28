require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * 日記テキストをgeminiAPIに渡し、コメントをもらう
 */
app.post("/api/comment", async (req, res) => {
  try {
    //フロント側から日記テキスト、geminiへの設定を取得
    let { diaryText, geminiSettings } = req.body;

    //日記データが無い場合
    if (!diaryText || diaryText.trim() === "") {
      return res.status(400).json({ error: '日記の内容がありません。' });
    }

    //geminiへの指示設定
    const systemPrompt = `日記の書き手の性別は${geminiSettings.authorSex}です。あなたの性別は${geminiSettings.geminiSex}、あなたは日記の書き手の${geminiSettings.geminiRelationship}です。これから送られてくる日記の内容に対して、常に優しく、すべてを肯定するようなポジティブな立場で、感想を伝えてください。場合によってはアドバイスもしてください。共感し、寄り添うような温かいコメントを100文字程度の日本語で返してください。`;

    //geminiへ渡すユーザーのテキスト
    diaryText = diaryText.replace(/\r\n/g, '\n');
    const userPrompt = `【日記】\n${diaryText}`;

    //geminiのAPI
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

    //api呼び出し
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
      }),
    });

    //正常なレスポンスがない場合
    if (!geminiResponse.ok) {
      throw new Error(`APIエラーが発生しました。ステータス: ${geminiResponse.status}`);
    }

    //結果をjson形式で取得
    const result = await geminiResponse.json();
    let comment;

    if (result.candidates && result.candidates[0].content.parts[0].text) {
      //レスポンスからコメントを取得
      comment = result.candidates[0].content.parts[0].text;
    } else {
      // 候補がない場合や、予期しないレスポンスの時
      throw new Error('有効なレスポンスがありませんでした。');
    }

    // フロント側に、GeminiからのコメントをJSON形式で返す
    res.json({ comment });

  } catch (error) {
    console.error('Error in /api/comment:', error);
    res.status(500).json({ error: 'サーバーでエラーが発生しました。' });
  }
});














app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動したよ、お兄ちゃん♡`);
});