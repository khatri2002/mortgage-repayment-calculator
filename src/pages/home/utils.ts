export const roundOff = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const allowDecimalNumberOnly = (
  e: React.FormEvent<HTMLInputElement>,
) => {
  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, "");
  const parts = e.currentTarget.value.split(".");
  if (parts.length > 2)
    e.currentTarget.value = parts[0] + "." + parts.slice(1).join("");
};
