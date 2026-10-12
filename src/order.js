export const validateOrder = (form) => {
  const errors = {};
  [
    ["name", "Введите имя"],
    ["phone", "Укажите телефон"],
    ["email", "Введите email"],
    ["date", "Выберите дату"],
    ["time", "Выберите интервал"],
  ].forEach(([k, m]) => {
    if (!form[k]?.trim()) errors[k] = m;
  });
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
    errors.email = "Проверьте email";
  if (form.method === "delivery" && !form.address?.trim())
    errors.address = "Укажите адрес доставки";
  if (form.method === "pickup" && !form.pickup)
    errors.pickup = "Выберите точку самовывоза";
  return errors;
};
