<!-- Flowbiteの動作確認のために作成したページです
将来的に削除予定です。

▼コンポーネント参考GitHub:
https://github.com/themesberg/tailwind-nuxt-starter/tree/main/pages -->

<script setup lang="ts">
import { onMounted } from "vue";
import { useFlowbite } from "../composables/useFlowbite";
import { Modal, Tabs, Datepicker, Collapse } from "flowbite";
import type { ModalOptions, ModalInterface, TabsInterface, CollapseInterface, DatepickerInterface } from "flowbite";

onMounted(() => {
  useFlowbite(() => {
    // モーダルの表示
    const $buttonElement = document.querySelector<HTMLButtonElement>("#button");
    const $modalElement = document.querySelector<HTMLElement>("#modal");
    const $closeButton =
      document.querySelector<HTMLButtonElement>("#closeButton");

    // set modal options
    const modalOptions: ModalOptions = {
      backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
    };

    // create a new modal instance
    if ($modalElement) {
      const modal: ModalInterface = new Modal($modalElement, modalOptions);

      // set event listeners for the button to show the modal
      if ($buttonElement) {
        $buttonElement.addEventListener("click", () => modal.toggle());
      }

      if ($closeButton) {
        $closeButton.addEventListener("click", () => modal.hide());
      }
    }

    // タブの表示
    // setup tabs
    const tabsElement = document.getElementById("tabs-example");

    // create an array of objects with the id, trigger element (eg. button), and the content element
    const tabElements = [
      {
        id: "profile",
        triggerEl: document.querySelector(
          "#profile-tab-example"
        ) as HTMLElement,
        targetEl: document.querySelector("#profile-example") as HTMLElement,
      },
      {
        id: "dashboard",
        triggerEl: document.querySelector(
          "#dashboard-tab-example"
        ) as HTMLElement,
        targetEl: document.querySelector("#dashboard-example") as HTMLElement,
      },
      {
        id: "settings",
        triggerEl: document.querySelector(
          "#settings-tab-example"
        ) as HTMLElement,
        targetEl: document.querySelector("#settings-example") as HTMLElement,
      },
      {
        id: "contacts",
        triggerEl: document.querySelector(
          "#contacts-tab-example"
        ) as HTMLElement,
        targetEl: document.querySelector("#contacts-example") as HTMLElement,
      },
    ];
    // options with default values
    const options = {
      defaultTabId: "settings",
      activeClasses:
        "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500",
      inactiveClasses:
        "text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
      onShow: () => {
        console.log("tab is shown");
      },
    };
    if (document.querySelector("#profile-tab-example")) {
      /*
       * tabElements: array of tab objects
       * options: optional
       */
      const tabs: TabsInterface = new Tabs(tabsElement, tabElements, options);
      // open tab item based on id
      tabs.show("contacts");
    }
  });

  // カレンダーの表示
  // set the target element of the input field
  const $datepickerEl = document.getElementById("datepicker-custom");

  // optional options with default values and callback functions
  const options = {
    defaultDatepickerId: null,
    autohide: false,
    format: "mm/dd/yyyy",
    maxDate: null,
    minDate: null,
    orientation: "bottom",
    buttons: false,
    autoSelectToday: 0,
    title: null,
    language: "en",
    rangePicker: false,
    onShow: () => {},
    onHide: () => {},
  };

  const instanceOptions = {
    id: "datepicker-custom-example",
    override: true,
  };

  const datepicker: DatepickerInterface = new Datepicker($datepickerEl, options, instanceOptions);

  // メニュー表示
  // set the target element that will be collapsed or expanded (eg. navbar menu)
  const $targetEl = document.getElementById("targetEl");
  // optionally set a trigger element (eg. a button, hamburger icon)
  const $triggerEl = document.getElementById("triggerEl");
  // optional options with default values and callback functions
  const collapseOptions = {
    onCollapse: () => {
      console.log("element has been collapsed");
    },
    onExpand: () => {
      console.log("element has been expanded");
    },
    onToggle: () => {
      console.log("element has been toggled");
    },
  };
  if ($targetEl) {
    /*
     * targetEl: required
     * options: optional
     */
    const collapse: CollapseInterface = new Collapse($targetEl, $triggerEl, collapseOptions);
    // show the target element
    collapse.expand();
  }
});
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl flex-col">
    <h2
      class="mb-4 mt-10 border-b-2 border-gray-300 pb-2 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-white"
    >
      ボタン
    </h2>
    <div class="flex">
      <button
        type="button"
        class="mb-2 me-2 flex-grow basis-1/4 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Default
      </button>
      <button
        type="button"
        class="mb-2 me-2 flex-grow basis-1/4 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      >
        Alternative
      </button>
      <button
        type="button"
        class="mb-2 me-2 flex-grow basis-1/4 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >
        Dark
      </button>
      <button
        type="button"
        class="mb-2 me-2 flex-grow basis-1/4 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >
        Light
      </button>
      <button
        type="button"
        class="mb-2 me-2 flex-grow basis-1/4 rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Green
      </button>
      <button
        type="button"
        class="mb-2 me-2 flex-grow basis-1/4 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Red
      </button>
      <button
        type="button"
        class="mb-2 me-2 flex-grow basis-1/4 rounded-full bg-yellow-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
      >
        Yellow
      </button>
      <button
        type="button"
        class="mb-2 flex-grow basis-1/4 rounded-full bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        Purple
      </button>
    </div>

    <h2
      class="mb-4 mt-10 border-b-2 border-gray-300 pb-2 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-white"
    >
      モーダル
    </h2>
    <div>
      <div class="flex justify-center p-4">
        <button
          id="button"
          data-modal-toggle="modal"
          data-modal-target="modal"
          type="button"
          class="mb-2 mr-2 max-w-2xl rounded-lg bg-blue-700 p-4 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Show modal
        </button>
      </div>

      <div
        id="modal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
      >
        <div class="relative max-h-full w-full max-w-2xl">
          <!-- Modal content -->
          <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
              class="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600"
            >
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl"
              >
                Terms of Service
              </h3>
              <button
                id="closeButton"
                data-modal-hide="modal"
                type="button"
                class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <!-- Modal body -->
            <div class="space-y-6 p-6">
              <p
                class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              >
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p
                class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              >
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
            <!-- Modal footer -->
            <div
              class="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
            >
              <button
                type="button"
                class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                type="button"
                class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2
      class="mb-4 mt-10 border-b-2 border-gray-300 pb-2 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-white"
    >
      タブ
    </h2>
    <div class="mx-auto max-w-2xl p-4">
      <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          class="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          id="tabs-example"
          role="tablist"
        >
          <li class="mr-2" role="presentation">
            <button
              class="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              id="profile-tab-example"
              type="button"
              role="tab"
              aria-controls="profile-example"
              aria-selected="false"
            >
              Profile
            </button>
          </li>
          <li class="mr-2" role="presentation">
            <button
              class="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              id="dashboard-tab-example"
              type="button"
              role="tab"
              aria-controls="dashboard-example"
              aria-selected="false"
            >
              Dashboard
            </button>
          </li>
          <li class="mr-2" role="presentation">
            <button
              class="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              id="settings-tab-example"
              type="button"
              role="tab"
              aria-controls="settings-example"
              aria-selected="false"
            >
              Settings
            </button>
          </li>
          <li role="presentation">
            <button
              class="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              id="contacts-tab-example"
              type="button"
              role="tab"
              aria-controls="contacts-example"
              aria-selected="false"
            >
              Contacts
            </button>
          </li>
        </ul>
      </div>
      <div id="tabContentExample">
        <div
          class="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          id="profile-example"
          role="tabpanel"
          aria-labelledby="profile-tab-example"
        >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the
            <strong class="font-medium text-gray-800 dark:text-white"
              >Profile tab's associated content</strong
            >. Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          class="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          id="dashboard-example"
          role="tabpanel"
          aria-labelledby="dashboard-tab-example"
        >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the
            <strong class="font-medium text-gray-800 dark:text-white"
              >Dashboard tab's associated content</strong
            >. Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          class="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          id="settings-example"
          role="tabpanel"
          aria-labelledby="settings-tab-example"
        >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the
            <strong class="font-medium text-gray-800 dark:text-white"
              >Settings tab's associated content</strong
            >. Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          class="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          id="contacts-example"
          role="tabpanel"
          aria-labelledby="contacts-tab-example"
        >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the
            <strong class="font-medium text-gray-800 dark:text-white"
              >Contacts tab's associated content</strong
            >. Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
      </div>
    </div>

    <h2
      class="mb-4 mt-10 border-b-2 border-gray-300 pb-2 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-white"
    >
      カレンダー
    </h2>
    <div class="relative max-w-sm">
      <div
        class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5"
      >
        <svg
          class="h-4 w-4 text-gray-500 dark:text-gray-400"
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
        datepicker
        id="datepicker-custom"
        type="text"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Select date"
      />
    </div>

    <h2
      class="mb-4 mt-10 border-b-2 border-gray-300 pb-2 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-white"
    >
      フォーム
    </h2>

    <form>
      <div class="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <label
            for="first_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >First name</label
          >
          <input
            type="text"
            id="first_name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label
            for="last_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Last name</label
          >
          <input
            type="text"
            id="last_name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Doe"
            required
          />
        </div>
        <div>
          <label
            for="company"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Company</label
          >
          <input
            type="text"
            id="company"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Flowbite"
            required
          />
        </div>
        <div>
          <label
            for="phone"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Phone number</label
          >
          <input
            type="tel"
            id="phone"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="123-45-678"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            required
          />
        </div>
        <div>
          <label
            for="website"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Website URL</label
          >
          <input
            type="url"
            id="website"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="flowbite.com"
            required
          />
        </div>
        <div>
          <label
            for="visitors"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Unique visitors (per month)</label
          >
          <input
            type="number"
            id="visitors"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder=""
            required
          />
        </div>
      </div>
      <div class="mb-6">
        <label
          for="email"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Email address</label
        >
        <input
          type="email"
          id="email"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="john.doe@company.com"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Password</label
        >
        <input
          type="password"
          id="password"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="•••••••••"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="confirm_password"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Confirm password</label
        >
        <input
          type="password"
          id="confirm_password"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="•••••••••"
          required
        />
      </div>
      <div class="mb-6 flex items-start">
        <div class="flex h-5 items-center">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            required
          />
        </div>
        <label
          for="remember"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >I agree with the
          <a href="#" class="text-blue-600 hover:underline dark:text-blue-500"
            >terms and conditions</a
          >.</label
        >
      </div>
      <button
        type="submit"
        class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
      >
        Submit
      </button>
    </form>

    <h2
      class="mb-4 mt-10 border-b-2 border-gray-300 pb-2 text-3xl font-semibold text-gray-800 dark:border-gray-600 dark:text-white"
    >
      メニュー表示
    </h2>
    <div class="mx-auto max-w-2xl p-4">
      <!-- Trigger element -->
      <button
        id="triggerEl"
        aria-expanded="false"
        type="button"
        class="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Trigger collapse
      </button>

      <!-- Target element -->
      <div id="targetEl" class="hidden">
        <ul
          class="w-48 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <li
            class="w-full rounded-t-lg border-b border-gray-200 px-4 py-2 dark:border-gray-600"
          >
            Profile
          </li>
          <li
            class="w-full border-b border-gray-200 px-4 py-2 dark:border-gray-600"
          >
            Settings
          </li>
          <li
            class="w-full border-b border-gray-200 px-4 py-2 dark:border-gray-600"
          >
            Messages
          </li>
          <li class="w-full rounded-b-lg px-4 py-2">Download</li>
        </ul>
      </div>
    </div>
  </div>
</template>
