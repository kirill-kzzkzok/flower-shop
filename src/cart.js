import { products } from "./data.js";
const state = { items: JSON.parse(localStorage.getItem("petal-cart") || "[]") };
const save = () =>
  localStorage.setItem("petal-cart", JSON.stringify(state.items));
export const cart = {
  get items() {
    return state.items;
  },
  add(id) {
    const x = state.items.find((i) => i.id === id);
    x ? x.qty++ : state.items.push({ id, qty: 1 });
    save();
  },
  remove(id) {
    state.items = state.items.filter((i) => i.id !== id);
    save();
  },
  setQty(id, qty) {
    const x = state.items.find((i) => i.id === id);
    if (x) x.qty = Math.max(1, qty);
    save();
  },
  clear() {
    state.items = [];
    save();
  },
  count() {
    return state.items.reduce((s, i) => s + i.qty, 0);
  },
  subtotal() {
    return state.items.reduce(
      (s, i) => s + (products.find((p) => p.id === i.id)?.price || 0) * i.qty,
      0,
    );
  },
  delivery() {
    return this.items.length ? 450 : 0;
  },
  total() {
    return this.subtotal() + this.delivery();
  },
};
