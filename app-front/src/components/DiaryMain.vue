<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const pageUrl = import.meta.env.VITE_API_BASE_URL;

const diaryText = ref("");
const authorSex = ref("");
const geminiSex = ref("");
const geminiRelationship = ref("");
const geminiComment = ref("");
const isLoading = ref(false);
const error = ref("");

/**
 * Geminiへの設定の初期化
 */
function initGeminiSettings() {
  authorSex.value = "無し";
  geminiSex.value = "無し";
  geminiRelationship.value = "無し";
}

/**
 * Geminiからコメントをもらう
 */
async function getGeminiComment() {
  //入力チェック
  if (!diaryText.value) {
    error.value = "日記の内容を入力して下さい。";
    return;
  }

  //geminiコメント、エラーコメントクリア
  geminiComment.value = "";
  error.value = "";

  isLoading.value = true;
  let response;

  try {
    response = await axios.post(`${pageUrl}/api/comment`, {
      diaryText: diaryText.value,
      geminiSettings: {
        authorSex: authorSex.value,
        geminiSex: geminiSex.value,
        geminiRelationship: geminiRelationship.value,
      },
    });
  } catch (e) {
    error.value = e;
    isLoading.value = false;
    return;
  }

  isLoading.value = false;

  if (response.data.error) {
    error.value = response.data.error;
  } else {
    geminiComment.value = response.data.comment;
  }
}

onMounted(() => {
  initGeminiSettings();
});

watch(geminiSex, () => {
  if (
    (geminiSex.value === "男性" &&
      (geminiRelationship.value === "姉" ||
        geminiRelationship.value === "妹")) ||
    (geminiSex.value === "女性" &&
      (geminiRelationship.value === "兄" ||
        geminiRelationship.value === "弟")) ||
    (geminiSex.value === "無し" &&
      (geminiRelationship.value === "兄" ||
        geminiRelationship.value === "弟" ||
        geminiRelationship.value === "姉" ||
        geminiRelationship.value === "妹"))
  ) {
    geminiRelationship.value = "無し";
  }
});
</script>

<template>
  <div class="diary">
    <h1 class="diary__title">日記アプリ</h1>
    <p class="diary__description">
      今日あった出来事を書いてみてね。Geminiが優しくコメントをくれるよ♡
    </p>

    <!-- 日記入力エリア -->
    <div class="diary__input-area">
      <h2 class="diary__sub-title">日記の内容</h2>
      <textarea
        id="diary__input-textarea"
        v-model="diaryText"
        rows="6"
        class="diary__input-textarea"
        placeholder="（例）今日は天気が良くて気持ちよかったから、近所の公園を散歩した。"
      ></textarea>
    </div>

    <!-- gemini設定エリア -->
    <div class="diary__gemini-settings-area">
      <h2 class="diary__sub-title">GeminiAPIの設定</h2>
      <div class="diary__group-wrapper">
        <fieldset class="diary__setting-group">
          <legend class="diary__caption">日記の書き手の性別</legend>
          <div class="diary__radio-item">
            <input
              type="radio"
              id="author-sex-none"
              class="diary__radio"
              value="無し"
              v-model="authorSex"
            />
            <label for="author-sex-none" class="diary__label">無し</label>
          </div>
          <div class="diary__radio-item">
            <input
              type="radio"
              id="author-sex-man"
              class="diary__radio"
              value="男性"
              v-model="authorSex"
            />
            <label for="author-sex-man" class="diary__label">男性</label>
          </div>
          <div class="diary__radio-item">
            <input
              type="radio"
              id="author-sex-woman"
              class="diary__radio"
              value="女性"
              v-model="authorSex"
            />
            <label for="author-sex-woman" class="diary__label">女性</label>
          </div>
        </fieldset>
        <fieldset class="diary__setting-group">
          <legend class="diary__caption">geminiの性別</legend>
          <div class="diary__radio-item">
            <input
              type="radio"
              id="gemini-sex-none"
              class="diary__radio"
              value="無し"
              v-model="geminiSex"
            />
            <label for="gemini-sex-none" class="diary__label">無し</label>
          </div>
          <div class="diary__radio-item">
            <input
              type="radio"
              id="gemini-sex-man"
              class="diary__radio"
              value="男性"
              v-model="geminiSex"
            />
            <label for="gemini-sex-man" class="diary__label">男性</label>
          </div>
          <div class="diary__radio-item">
            <input
              type="radio"
              id="gemini-sex-woman"
              class="diary__radio"
              value="女性"
              v-model="geminiSex"
            />
            <label for="gemini-sex-woman" class="diary__label">女性</label>
          </div>
        </fieldset>
        <fieldset class="diary__setting-group">
          <legend class="diary__caption">日記の書き手との関係性</legend>
          <div class="diary__radio-item">
            <input
              type="radio"
              id="relationship-none"
              class="diary__radio"
              value="無し"
              v-model="geminiRelationship"
            />
            <label for="relationship-none" class="diary__label">無し</label>
          </div>
          <div v-if="geminiSex === '男性'" class="diary__radio-item">
            <input
              type="radio"
              id="relationship-big-brother"
              class="diary__radio"
              value="兄"
              v-model="geminiRelationship"
            />
            <label for="relationship-big-brother" class="diary__label"
              >兄</label
            >
          </div>
          <div v-if="geminiSex === '男性'" class="diary__radio-item">
            <input
              type="radio"
              id="relationship-little-brother"
              class="diary__radio"
              value="弟"
              v-model="geminiRelationship"
            />
            <label for="relationship-little-brother" class="diary__label"
              >弟</label
            >
          </div>
          <div v-if="geminiSex === '女性'" class="diary__radio-item">
            <input
              type="radio"
              id="relationship-big-sister"
              class="diary__radio"
              value="姉"
              v-model="geminiRelationship"
            />
            <label for="relationship-big-sister" class="diary__label">姉</label>
          </div>
          <div v-if="geminiSex === '女性'" class="diary__radio-item">
            <input
              type="radio"
              id="relationship-little-sister"
              class="diary__radio"
              value="妹"
              v-model="geminiRelationship"
            />
            <label for="relationship-little-sister" class="diary__label"
              >妹</label
            >
          </div>
          <div class="diary__radio-item">
            <input
              type="radio"
              id="relationship-friend"
              class="diary__radio"
              value="友人"
              v-model="geminiRelationship"
            />
            <label for="relationship-friend" class="diary__label">友人</label>
          </div>
          <div class="diary__radio-item">
            <input
              type="radio"
              id="relationship-partner"
              class="diary__radio"
              value="恋人"
              v-model="geminiRelationship"
            />
            <label for="relationship-partner" class="diary__label">恋人</label>
          </div>
        </fieldset>
      </div>
    </div>

    <!-- 送信ボタン -->
    <div class="diary__submit-button-area">
      <button
        @click="getGeminiComment"
        :disabled="isLoading || diaryText.trim() === ''"
        class="diary__submit-button"
      >
        <span v-if="!isLoading">Geminiにコメントをもらう</span>
        <span v-else class="diary__loading">Gemini考え中...</span>
      </button>
    </div>

    <!-- Geminiのコメント表示エリア -->
    <div v-if="geminiComment" class="diary__comment-area">
      <h2 class="diary__sub-title">Geminiからのコメント</h2>
      <p class="diary__comment">{{ geminiComment }}</p>
    </div>

    <!-- エラー表示エリア -->
    <div v-if="error" class="diary__error-area">
      <h2 class="diary__sub-title diary__sub-title--error">エラー</h2>
      <p class="diary__error">{{ error }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.diary {
  @include contents-width;
  $parent: &;

  &__title {
    @include section-margin;
    margin-top: 2.4rem;
    text-align: center;
    font-weight: 700;
    font-size: clamp(22px, 2.2rem, 26px);

    @include tab {
      margin-top: 3.2rem;
      font-size: clamp(26px, 2.6rem, 30px);
    }

    @include pc {
      margin-top: 4rem;
      font-size: clamp(30px, 3.4rem, 34px);
    }
  }

  &__description {
    @include section-margin;
    text-align: center;
    font-size: clamp(14px, 1.4rem, 16px);

    @include tab {
      font-size: clamp(16px, 1.6rem, 18px);
    }

    @include pc {
      font-size: clamp(16px, 1.8rem, 18px);
    }
  }

  &__input-area {
    @include section-margin;
  }

  &__sub-title {
    @include sub-title;

    &--error {
      color: $red;
    }
  }

  &__input-textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid $light-black;
    border-radius: 4px;
    font-size: clamp(14px, 1.4rem, 16px);
    line-height: 1.8;
    transition: box-shadow 0.3s ease-out;

    &::placeholder {
      color: $light-black;
    }

    &:focus {
      box-shadow: 0 0 8px 0 $light-blue;
    }

    @include tab {
      padding: 1.2rem;
      font-size: clamp(16px, 1.6rem, 18px);
    }

    @include pc {
      padding: 1.6rem;
      font-size: clamp(16px, 1.8rem, 18px);
    }
  }

  &__gemini-settings-area {
    @include section-margin;
  }

  &__group-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    @include tab {
      gap: 1.6rem;
    }

    @include pc {
      flex-direction: row;
      gap: 2rem;
    }
  }

  &__setting-group {
    width: fit-content;
    padding: 1rem;
    border: 1px solid $light-black;
    border-radius: 4px;
    display: flex;
    gap: 1.6rem;

    @include tab {
      padding: 1.4rem;
      gap: 2rem;
    }

    @include pc {
      padding: 2rem;
      gap: 2.4rem;
    }
  }

  &__caption {
    padding: 0 0.6rem;
    font-size: clamp(12px, 1.2rem, 14px);
    font-weight: 700;

    @include tab {
      padding: 0 0.8rem;
      font-size: clamp(14px, 1.4rem, 16px);
    }

    @include pc {
      padding: 0 1rem;
      font-size: clamp(14px, 1.6rem, 16px);
    }
  }

  &__radio {
    display: none;

    &:checked + #{$parent}__label {
      background-color: $light-blue;
      color: $white;
    }
  }

  &__label {
    cursor: pointer;
    display: block;
    padding: 1rem;
    border: 1px solid $blue;
    border-radius: 4px;
    font-size: clamp(12px, 1.2rem, 14px);
    transition: background-color 0.3s ease-out, color 0.3s ease-out;

    @include tab {
      padding: 1.2rem;
      font-size: clamp(14px, 1.4rem, 16px);
    }

    @include pc {
      padding: 1.4rem;
      font-size: clamp(14px, 1.6rem, 16px);
    }
  }

  &__submit-button-area {
    @include section-margin;
  }

  &__submit-button {
    cursor: pointer;
    display: block;
    margin-inline: auto;
    width: 100%;
    padding: 1.6rem;
    background-color: $orange;
    border-radius: 100vmax;
    text-align: center;
    color: $white;
    font-weight: 700;
    font-size: clamp(14px, 1.4rem, 16px);
    transition: background-color 0.3s ease-out, color 0.3s ease-out;

    &:disabled {
      cursor: not-allowed;
      color: $light-black;
      background-color: $gray;
    }

    @include tab {
      max-width: 280px;
      padding: 2rem;
      font-size: clamp(16px, 1.6rem, 18px);
    }

    @include pc {
      max-width: 320px;
      padding: 2.4rem;
      font-size: clamp(16px, 1.8rem, 18px);
    }
  }

  &__loading {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: -3em;
      transform: translateY(-50%);
      width: 2em;
      aspect-ratio: 1;
      border-radius: 100vmax;
      border: 3px solid $light-black;
      border-top-color: $black;
      animation: spinner 1.5s linear infinite;
    }

    @keyframes spinner {
      to {
        transform: translateY(-50%) rotate(360deg);
      }
    }
  }

  &__comment-area {
    @include section-margin;
  }

  &__comment,
  &__error {
    padding: 1.2rem;
    border-left: 10px solid $orange;
    background-color: $light-orange;
    font-size: clamp(14px, 1.4rem, 16px);
    line-height: 1.8;

    @include tab {
      padding: 1.8rem;
      font-size: clamp(16px, 1.6rem, 18px);
    }

    @include pc {
      padding: 2.4rem;
      font-size: clamp(16px, 1.8rem, 18px);
    }
  }

  &__error-area {
    @include section-margin;
  }

  &__error {
    border-left: 10px solid $red;
  }
}
</style>
