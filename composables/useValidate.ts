// NOTE: state
const errors = ref<Map<string, string>>(new Map());

// 注文内容の値を管理
const orderItemValue = ref({
  name: '',
  num: '',
});

export const useSearchFormError = () => {
  // NOTE: getters
  const getError = (id: string) => {
    if (errors.value.has(id)) {
      return errors.value.get(id);
    }
  };
  const hasErrors = () => {
    return errors.value.size > 0;
  };
  // NOTE: actions
  const setErrorText = (id: string, error: string) => {
    errors.value.set(id, error);
    errors.value = new Map(errors.value);
  };
  const deleteError = (id: string) => {
    if (errors.value.has(id)) {
      errors.value.delete(id);
      errors.value = new Map(errors.value);
    }
  };
  const resetErrors = () => {
    errors.value = new Map();
  };
  return {
    errors,
    setErrorText,
    deleteError,
    getError,
    hasErrors,
    resetErrors,
  };
};
export const useJudgeFormError = ({
  id,
  form,
  label,
}: {
  id: string;
  form: string;
  label?: string;
}) => {
  // エラーメッセージをリセット
  useSearchFormError().deleteError(id);
  // trueにすると未入力判定が除外される
  let isJudgementEmpty = false;

  // カナ判定
  if (['userKana'].includes(id)) {
    if (form.trim() !== '' && checkError().name.katakana(form)) {
      useSearchFormError().setErrorText(id, errorText.name.katakana);
      // カナのエラーがある場合、未入力エラー除外
      isJudgementEmpty = true;
    }
  }
  // 電話番号判定
  if (['telValue'].includes(id)) {
    // 必須項目でないので、未入力エラー除外
    isJudgementEmpty = true;
    // 入力値が数字以外だったらエラーを設定
    if (form.trim() !== '' && checkError().number.number(form)) {
      useSearchFormError().setErrorText(id, errorText.number.number);
    }
  }
  // メールアドレス判定
  if (['mailValue'].includes(id)) {
    if (form.trim() !== '' && checkError().mail.correct(form)) {
      useSearchFormError().setErrorText(id, errorText.mail.correct);
      isJudgementEmpty = true;
    }
  }
  // 注文内容の判定
  if (['orderItemName'].includes(id)) {
    // 必須項目でないので、未入力エラー除外
    isJudgementEmpty = true;
    // 商品の入力値を更新
    orderItemValue.value.name = form;
    // 商品が選択されておらず、個数が入力されている場合、エラーを表示する
    if (form.trim() === '' && orderItemValue.value.num) {
      useSearchFormError().setErrorText(id, errorText.input.correct);
    }
  }
  // 注文個数の判定
  if (['orderItemNum'].includes(id)) {
    // 必須項目でないので、未入力エラー除外
    isJudgementEmpty = true;
    // 入力値を更新
    orderItemValue.value.num = form;
    // 数量が未入力で、商品が選択されている場合、エラーを設定
    if (form.trim() === '' && orderItemValue.value.name) {
      useSearchFormError().setErrorText(id, errorText.input.correct);
    }
    // 入力値が数字以外だったらエラーを設定
    if (form.trim() !== '' && checkError().number.number(form)) {
      orderItemValue.value.num = form;
      useSearchFormError().setErrorText(id, errorText.number.number);
    }
  }

  // 未入力エラー
  if (!form.trim() && !isJudgementEmpty) {
    if (checkError().input.correct(form)) {
      const errorLabel = label ? `${label}は` : '';
      useSearchFormError().setErrorText(
        id,
        errorLabel + errorText.input.correct
      );
    }
  }
};
const checkError = () => {
  return {
    input: {
      // NOTE: 空欄か
      correct: (form: string) => {
        return !textPattern.input.correct.test(form);
      },
    },
    number: {
      // NOTE: 数字か
      number: (form: string) => {
        return !textPattern.tel.number.test(form);
      },
    },
    name: {
      // NOTE: 名前（カナ）がカタカナ入力か
      katakana: (form: string) => {
        return !textPattern.name.katakana.test(form);
      },
    },
    tel: {
      // NOTE: 電話番号が数字か
      number: (form: string) => {
        const nonHyphenated = form.replace(/-/g, '');
        return !textPattern.tel.number.test(nonHyphenated);
      },
      correctLength: (form: string) => {
        const nonHyphenated = form.replace(/-/g, '');
        return !textPattern.tel.correctLength.test(nonHyphenated);
      },
    },
    mail: {
      // NOTE: メールアドレスに使えるか文字か
      correct: (form: string) => {
        return !textPattern.mail.correct.test(form);
      },
    },
  };
};
// NOTE: 正規パターンを表記
const textPattern = {
  input: {
    correct: /^\S+$/,
  },
  number: {
    number: /^\d+$/,
  },
  name: {
    katakana: /^[\u30A0-\u30FF]+$/,
  },
  tel: {
    number: /^\d+$/,
    correctLength: /^.{10,11}$/,
  },
  mail: {
    correct: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
};
const errorText: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  input: {
    correct: '入力必須です',
  },
  number: {
    number: '数字で入力してください',
  },
  name: {
    katakana: 'カタカナで入力してください',
  },
  tel: {
    number: '半角数字で入力してください',
    correctLength: '10文字以上11文字以下の数字で入力してください',
  },
  mail: {
    correct: 'メールアドレスの形式が異なります',
  },
};
