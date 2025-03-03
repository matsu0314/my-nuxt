<script setup lang="ts">
const userName = ref('');
const userKana = ref('');
const telValue = ref('');
const mailValue = ref('');
const orderItemName = ref('');
const orderItemNum = ref('');
const memo = ref('');


const handleSubmit = () => {
  useJudgeFormError({ id: 'userName', form: userName.value, label: 'お名前' });
  // バリデーション判定の関数
  useJudgeFormError({
    id: 'mailValue',
    form: mailValue.value,
    label: 'メールアドレス',
    type: 'mail',
  });

  useJudgeFormError({
    id: 'telValue',
    form: telValue.value,
    label: '電話番号',
    type: 'number',
  });
  useJudgeFormError({
    id: 'userKana',
    form: userKana.value,
    label: 'カナ',
    type: 'kana',
  });
  // グループバリデーション判定の関数
  useJudgeGroupError([
    {
      id: 'orderItemName',
      form: orderItemName.value,
      label: '注文内容',
    },
    {
      id: 'orderItemNum',
      form: orderItemNum.value,
      label: '個数',
      type: 'number',
    },
  ]);

  // エラーがなければデータを送信
  if (useSearchFormError().hasErrors()) return;

  // 送信データ
  console.log(`
  userName: ${userName.value},
  userKana: ${userKana.value},
  telValue: ${telValue.value},
  mailValue: ${mailValue.value},
  orderItemName: ${orderItemName.value},
  orderItemNum: ${orderItemNum.value},
  memo: ${memo.value}
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
      注文内容<br />
      <!-- TODO:必須項目ではないが、商品、数量どちらかが入力されていた場合、必須項目になる -->
      <div class="flex items-top">
        <div class="mr-4">
          <select
            v-model="orderItemName"
            class="w-full bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">選択してください</option>
            <option value="商品１">商品１</option>
            <option value="商品２">商品２</option>
            <option value="商品３">商品３</option>
          </select>
          <div
            v-if="useSearchFormError().getError('orderItemName')"
            class="text-red-500 text-xs"
          >
            {{ useSearchFormError().getError('orderItemName') }}
          </div>
        </div>
        <div>
          <div class="flex items-center">
            <input
              v-model="orderItemNum"
              placeholder="例）3"
              class="w-full rounded-lg border mb-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            /><span class="m-2">個</span>
          </div>

          <div
            v-if="useSearchFormError().getError('orderItemNum')"
            class="text-red-500 text-xs"
          >
            {{ useSearchFormError().getError('orderItemNum') }}
          </div>
        </div>
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
