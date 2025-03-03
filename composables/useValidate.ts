// NOTE: state
const errors = ref<Map<string, string>>(new Map());

type JudgeFormType = 'kana' | 'mail' | 'number' | undefined;

type JudgeFormArgs = {
  id: string;
  form: string;
  label?: string;
  type?: JudgeFormType;
  require?: boolean;
};

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
  type,
  require = true,
}: JudgeFormArgs) => {
  // エラーメッセージをリセット
  useSearchFormError().deleteError(id);
  // タイプ別バリデーション実行
  typeValidation(type, form, id);
  // 未入力エラー
  if (require) {
    judgeEmpty(id, form, label);
  }
};

export const useJudgeGroupError = (formObj: JudgeFormArgs[]) => {
  formObj.forEach((item) => {
    // エラーメッセージをリセット
    useSearchFormError().deleteError(item.id);

    // 全てのフィールドに対してバリデーション実行
    const isInputDataValid = areAllFieldsConsistent(formObj);

    // タイプ別バリデーション実行
    typeValidation(item.type, item.form, item.id);
    // 未入力エラー
    if (item.require) {
      judgeEmpty(item.id, item.form, item.label);
    }

    // どれか1つでも値があり、他の項目に空文字が含まれている場合
    if (!isInputDataValid) {
      judgeEmpty(item.id, item.form, item.label);
    }
  });
};


// 未入力エラー
const judgeEmpty = (id: string, form: string, label?: string) => {
  if (checkError().input.correct(form)) {
    const errorLabel = label ? `${label}は` : '';
    useSearchFormError().setErrorText(id, errorLabel + errorText.input.correct);
  }
};
// タイプ別エラー
const typeValidation = (
  type: JudgeFormType, 
  form: string, 
  id: string
) => {
  if (!type) return;
  
  // カナエラー
  if (type === 'kana') {
    validationFunc().kana(form, id);
  }
  // メールエラー
  if (type === 'mail') {
    validationFunc().mail(form, id);
  }
  // 数字エラー
  if (type === 'number') {
    validationFunc().number(form, id);
  }
}

// どれか1つでも値があった場合、他の項目に空文字が含まれているか判定
const areAllFieldsConsistent = (
  forms: {
    id: string;
    form: string;
    label?: string;
    type?: 'kana' | 'number' | 'mail';
    require?: boolean;
  }[]
) => {
  // 空文字以外の値が一つでもあった場合、他のすべてのフォームが空文字でないことを確認
  const nonEmptyCount = forms.filter((item) => item.form !== '').length;

  if (nonEmptyCount === 0) {
    // すべて空文字だった場合
    return true;
  }

  // どれか1つでも値があった場合、他の項目に空文字が含まれていないか確認
  return forms.every(
    (item) => item.form !== '' || nonEmptyCount === forms.length
  );
};
// タイプ別バリデーションチェック
const validationFunc = () => {
  return {
    number: (form: string, id: string) => {
      if (form.trim() !== '' && checkError().number.number(form)) {
        useSearchFormError().setErrorText(id, errorText.number.number);
      }
    },
    mail: (form: string, id: string) => {
      if (form.trim() !== '' && checkError().mail.correct(form)) {
        useSearchFormError().setErrorText(id, errorText.mail.correct);
      }
    },
    kana: (form: string, id: string) => {
      // カナ判定
      if (form.trim() !== '' && checkError().name.katakana(form)) {
        useSearchFormError().setErrorText(id, errorText.name.katakana);
        return;
      }
    },
  };
};
// バリデーション条件
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
