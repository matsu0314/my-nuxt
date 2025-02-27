<script setup lang="ts">
const userName = ref('');
const userKana = ref('');
const telValue = ref('');
const mailValue = ref('');
const memo = ref('');

// バリデーション判定の関数
const judgeForm = ({ id, form }: { id: string; form: string }) => {
  // TODO:TypeScriptのエラーの解決法を調べる
  useJudgeFormError({ id, form });
};

const handleSubmit = () => {
  // バリデーションチェック
  const keys = Object.keys(validateItemList);
  keys.forEach((key) => {
    // TODO: evalの使用は推奨されてない？他の方法があれば
    judgeForm({ id: key, form: eval(key).value });
  });

  // エラーがなければデータを送信
  if (useSearchFormError().hasErrors()) return;

  // 送信データ
  console.log(`
  userName: ${userName.value},
  userKana: ${userKana.value},
  telValue: ${telValue.value},
  mailValue: ${mailValue.value},
  memo: ${memo.value},\n
  
  `);
};
</script>
<template>
  <div class="flex h-screen items-center justify-center bg-gray-50">
    <div>
      <h1 class="mb-6 text-4xl">サンプルコード</h1>
      お名前<span
        class="mx-2 my-2 bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300"
        >必須</span
      >
      <input
        v-model="userName"
        class="w-full rounded-lg mb-2 border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
      <div
        v-if="useSearchFormError().getError('userName')"
        class="text-red-500 text-xs"
      >
        {{ useSearchFormError().getError('userName') }}
      </div>
      <br />
      カナ<span
        class="mx-2 my-2 bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300"
        >必須</span
      ><input
        v-model="userKana"
        class="w-full rounded-lg mb-2 border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
      <div
        v-if="useSearchFormError().getError('userKana')"
        class="text-red-500 text-xs"
      >
        {{ useSearchFormError().getError('userKana') }}
      </div>
      <br />

      電話番号<input
        v-model="telValue"
        class="w-full rounded-lg border mb-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
      <div
        v-if="useSearchFormError().getError('telValue')"
        class="text-red-500 text-xs"
      >
        {{ useSearchFormError().getError('telValue') }}
      </div>
      <br />

      メールアドレス<span
        class="mx-2 my-2 bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300"
        >必須</span
      ><input
        v-model="mailValue"
        class="w-full rounded-lg border mb-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
      <div
        v-if="useSearchFormError().getError('mailValue')"
        class="text-red-500 text-xs"
      >
        {{ useSearchFormError().getError('mailValue') }}
      </div>
      <br />
      メモ<br />
      <textarea
        v-model="memo"
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
      ></textarea>
      <div
        v-if="useSearchFormError().getError('memo')"
        class="text-red-500 text-xs"
      >
        {{ useSearchFormError().getError('memo') }}
      </div>
      <br />
      <button
        id="button"
        type="button"
        @click="handleSubmit()"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        送信
      </button>
    </div>
  </div>
</template>
