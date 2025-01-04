import { reactive, ref } from 'vue';

interface FormFields {
    name?: string
    email: string
    password: string
    password_confirmation?: string
}

export function useForm(initialValues: FormFields) {

  const form = reactive<FormFields>({ ...initialValues })
  const errors = ref<Record<string, string>>({})

  const updateField = (field: keyof FormFields, value: string) => {
    form[field] = value
  };

  const validate = () => {
    errors.value = {}
    let isValid = true

    if (!form.email) {
      errors.value.email = 'Email is required'
      isValid = false
    }

    return isValid
  };

  const submit = (callback: ( data: FormFields ) => void) => {
    if (validate()) {
      callback(form)
    }
  };

  return {
    form,
    errors,
    updateField,
    submit,
  };
}