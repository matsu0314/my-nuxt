<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Datepicker } from 'flowbite';

import dayjs from 'dayjs';
const { $datepickerJa } = useNuxtApp();

// FlowbiteのDatepickerに日本語ロケールを設定
import('flowbite-datepicker').then((module) => {
  (module.Datepicker as any).locales.ja = $datepickerJa(); // 日本語ロケールを設定
});

const field_1 = ref('');
const field_2 = ref('');
const startDate = ref('');
const deadline = ref('');

onMounted(async () => {
  useFlowbite(() => {
    // カレンダー開始日と期限の要素を取得
    const datepickerStartDate = document.querySelector(
      '#datepicker-startDate'
    ) as HTMLElement;

    const datepickerDeadLine = document.querySelector(
      '#datepicker-deadline'
    ) as HTMLElement;

    // カレンダーオプション
    const options = {
      defaultDatepickerId: null,
      autohide: true,
      format: 'yyyy/mm/dd',
      maxDate: null,
      minDate: null,
      orientation: 'bottom',
      buttons: true,
      autoSelectToday: 0, // 今日の日付を選択
      title: null,
      language: 'ja',
      rangePicker: false, // 選択範囲のカレンダーを表示
      onShow: () => {},
      onHide: () => {},
    };

    // 開始日と期限のカレンダーを表示

    new Datepicker(datepickerStartDate, options, {
      id: `datepicker-statDate`,
      override: true,
    });

    new Datepicker(datepickerDeadLine, options, {
      id: `datepicker-deadLine`,
      override: true,
    });

    datepickerStartDate.addEventListener('changeView', (event) => {
      console.log(event)
      console.log("test")
    })


    datepickerStartDate.addEventListener('changeDate', (event: Event) => {
      const changeDateEvent = event as CustomEvent<{
        datepicker: { getDate(format: string): string };
      }>;
      startDate.value = changeDateEvent.detail.datepicker.getDate('yyyy/mm/dd');
    });

    datepickerDeadLine.addEventListener('changeDate', (event: Event) => {
      const changeDateEvent = event as CustomEvent<{
        datepicker: { getDate(format: string): string };
      }>;
      deadline.value = changeDateEvent.detail.datepicker.getDate('yyyy/mm/dd');
    });
  });
});
</script>

<template>
  <div>
    <main class="mb-32">
      <h1 class="mb-2 w-full max-w-2xl mx-auto my-2 text-3xl font-bold">
        サンプルフォーム(custom)
      </h1>
      <p class="mb-8 w-full max-w-2xl mx-auto my-12">カレンダーを２つ設置</p>
      <section class="mx-auto mb-8 w-full max-w-2xl">
        <h2
          class="mb-4 text-xl font-semibold text-gray-800 dark:border-gray-600 dark:text-white"
        >
          TextInput
        </h2>
        <dl class="border-b border-gray-300">
          <dt
            class="flex basis-1/4 flex-col justify-center p-4 text-sm font-medium text-gray-900 dark:text-white"
          >
            <span>フィールド1</span>
          </dt>
          <dd class="flex-auto p-4">
            <input
              type="text"
              v-model="field_1"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </dd>
        </dl>

        <dl class="border-b border-gray-300">
          <dt
            class="flex basis-1/4 flex-col justify-center p-4 text-sm font-medium text-gray-900 dark:text-white"
          >
            <span>フィールド2</span>
          </dt>
          <dd class="flex-auto p-4">
            <input
              type="text"
              v-model="field_2"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </dd>
        </dl>
      </section>

      <section class="mx-auto mb-8 w-full max-w-2xl">
        <h2
          class="mb-4 text-xl font-semibold text-gray-800 dark:border-gray-600 dark:text-white"
        >
          DatePicker
        </h2>
        <div class="flex items-center">
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                />
              </svg>
            </div>
            <input
              id="datepicker-startDate"
              v-model="startDate"
              readonly
              type="text"
              class="datepicker bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="日付を選択してください"
            />
          </div>
          <span class="mx-4 text-gray-500">to</span>
          <div class="relative">
            <div
              class="absolute inset-y-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                />
              </svg>
            </div>
            <input
              id="datepicker-deadline"
              v-model="deadline"
              readonly
              type="text"
              class="datepicker bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="日付を選択してください"
            />
          </div>
        </div>
        <p class="mt-2">{{ startDate }} to {{ deadline }}</p>
      </section>
    </main>
  </div>
</template>
