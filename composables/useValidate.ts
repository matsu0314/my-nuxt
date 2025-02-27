// NOTE: state
const errors = ref<Map<string, string>>(new Map());

// バリデーションリスト
// TODO: 別ファイルで管理した方が良い?
export const validateItemList = {
  userName: 'お名前',
  userKana: 'カナ',
  telValue: '電話番号',
  mailValue: 'メールアドレス',
};
// バリデーションリストの型定義
export type ValidateItemList = typeof validateItemList;

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
}: {
  id: keyof ValidateItemList;
  form: string;
}) => {
  useSearchFormError().deleteError(id);
  // trueにすると未入力判定が除外される
  let isHasError = false;

  if (['userKana'].includes(id)) {
    if (form.trim() !== '' && checkError().name.katakana(form)) {
      useSearchFormError().setErrorText(id, errorText.name.katakana);
      isHasError = true;
    }
  }

  if (['telValue'].includes(id)) {
    if (form.trim() !== '' && checkError().number.number(form)) {
      useSearchFormError().setErrorText(id, errorText.number.number);
    }
    // TELは必須項目でないので、未入力エラー除外
    isHasError = true;
  }
  if (['mailValue'].includes(id)) {
    if (form.trim() !== '' && checkError().mail.correct(form)) {
      useSearchFormError().setErrorText(id, errorText.mail.correct);
      isHasError = true;
    }
  }

  // 未入力エラー
  if (!form.trim() && !isHasError) {
    if (checkError().input.correct(form)) {
      useSearchFormError().setErrorText(
        id,
        validateItemList[id] + 'は' + errorText.input.correct
      );
    }
    isHasError = true;
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
