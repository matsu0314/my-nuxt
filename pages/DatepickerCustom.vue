<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Datepicker } from "flowbite";

import dayjs from "dayjs";
const { $datepickerJa } = useNuxtApp();

// FlowbiteのDatepickerに日本語ロケールを設定
import("flowbite-datepicker").then((module) => {
  (module.Datepicker as any).locales.ja = $datepickerJa(); // 日本語ロケールを設定
});

const field_1 = ref("");
const field_2 = ref("");
const startDate = ref("カレンダー１");
const deadline = ref("カレンダー２");

onMounted(async () => {
  useFlowbite(() => {
    // カレンダー開始日と期限の要素を取得
    const datepickerStartDate = document.querySelector(
      "#datepicker-startDate"
    ) as HTMLElement;

    const datepickerDeadLine = document.querySelector(
      "#datepicker-deadline"
    ) as HTMLElement;

    // カレンダーオプション
    const options = {
      defaultDatepickerId: null,
      autohide: true,
      format: "yyyy/mm/dd",
      maxDate: null,
      minDate: null,
      orientation: "bottom",
      buttons: true,
      autoSelectToday: 0, // 今日の日付を選択
      title: null,
      language: "ja",
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

    // カレンダー要素を取得
    // 同じクラス名のため、判別できないので、querySelectorAllで取得し、インデックスで指定
    const dateRangePicker_0 = document.querySelectorAll(
      ".datepicker-picker"
    )[0] as HTMLElement;
    const dateRangePicker_1 = document.querySelectorAll(
      ".datepicker-picker"
    )[1] as HTMLElement;

    // カレンダーの状態をobserverで管理
    // TODO:他に方法があればそちらを採用
    setDate(startDate, dateRangePicker_0);
    setDate(deadline, dateRangePicker_1);

    function setDate(valueRef: { value: string }, element: HTMLElement) {
      const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            const targetCell = mutation.target as HTMLElement;

            if (targetCell.classList.contains("focused")) {
              const selectDay = dayjs(Number(targetCell.dataset.date)).format(
                "YYYY/MM/DD"
              );
              valueRef.value = selectDay;
            }
          }
        }
      });
      observer.observe(element, {
        attributes: true, // 属性の変更を監視
        childList: true, // 子ノードの変更を監視
        subtree: true, // 子孫ノードの変更を監視
      });
    }

    // カレンダーのクリアが押されたときの処理
    const datePickerClearBtn = document.querySelectorAll(
      ".datepicker-footer .clear-btn"
    );

    if (datePickerClearBtn.length === 0) return;
    datePickerClearBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        startDate.value = "";
        deadline.value = "";
      });
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
      <p class="mb-8 w-full max-w-2xl mx-auto my-12 ">カレンダーを２つ設置</p>
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
            <!-- TODO:v-model、startDateが機能しない -->
            <input
              id="datepicker-startDate"
              v-model="startDate"
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
            <!-- TODO:v-model、deadlineが機能しない -->
            <input
              id="datepicker-deadline"
              v-model="deadline"
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
