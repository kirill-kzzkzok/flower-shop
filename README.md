<div align="center">

# ✿ Лепесток

**Интернет-витрина цветочного магазина с корзиной и оформлением заказа**

[![Live Demo](https://img.shields.io/badge/Live-kirill--flowers.vercel.app-183b30?style=flat-square)](https://kirill-flowers.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-kirill--kzzkzok-1f2521?style=flat-square&logo=github)](https://github.com/kirill-kzzkzok)
[![Tech](https://img.shields.io/badge/stack-Vanilla%20JS%20%2B%20Vite-44751f?style=flat-square)](https://vite.dev)

</div>

---

## 🇷🇺 О проекте

**Лепесток** — коммерческий frontend-проект магазина цветов: продуктовая витрина, фильтруемый каталог букетов, полноценная корзина с выбором способа получения и демо-оформлением заказа. Реализован без единой внешней зависимости (zero-dependency UI) — только Vanilla JavaScript и CSS.

Сайт живой и полностью рабочий: [kirill-flowers.vercel.app](https://kirill-flowers.vercel.app)

### ✨ Возможности

- 🛒 **Корзина с сохранением** — состояние хранится в `localStorage`, переживает перезагрузку страницы
- 🧮 **Счётчики прямо в карточках** — выбор количества не отходя от букета
- 🚚 **Выбор способа получения** — доставка с расчётом стоимости по адресу или самовывоз
- 🔎 **Фильтрация по поводам** — «Для свидания», «День рождения», «Спасибо», «Без повода»
- ⚡ **Быстрая установка даты** — кнопки «Сегодня / Завтра / Послезавтра» в форме заказа
- 📱 **Адаптивная вёрстка** — от мобильных до широких десктопов, бургер-меню на малых экранах
- ♿ **Доступность** — aria-атрибуты, роли табов для фильтров, live-регион для тостов
- 🎨 **Intro-загрузчик** — фирменный экран приветствия с логотипом при первом входе
- 🗺️ **Карта доставки** — интерактивная OpenStreetMap с зонами бесплатной и платной доставки

### 🛠 Технологии

| Технология | Назначение |
|---|---|
| **Vanilla JavaScript** | Вся логика без фреймворков — DOM, состояние, валидация |
| **Vite** | Сборка и dev-сервер |
| **CSS (слои)** | Базовая тема + слой оверрайдов поверх |
| **localStorage** | Персистентность корзины |
| **OpenStreetMap** | Карта точек самовывоза и зон доставки |

### 🚀 Запуск

```bash
npm install    # установка (только Vite как dev-зависимость)
npm run dev    # дев-сервер → http://localhost:5173
npm run build  # продакшн-сборка → ./dist
npm run preview# превью собранного сайта
```

### 📁 Структура проекта

```
flower-shop/
├── index.html              # Точка входа: метаданные, шрифты, favicon
├── src/
│   ├── main.js             # Рендер страницы, обработчики событий
│   ├── data.js             # Каталог букетов, отзывы, ассеты
│   ├── cart.js             # Логика корзины (добавить/удалить/сумма)
│   ├── order.js            # Валидация формы заказа
│   └── styles/
│       ├── base.css        # Базовые стили: типографика, сетки
│       └── overrides.css   # Слой финальной темы поверх базовой
└── package.json
```

> ⚠️ **Демо-режим:** корзина и оформление заказа работают целиком в браузере — данные никуда не отправляются. Реальных платежей и backend-интеграций в проекте нет.

---

## 🇬🇧 English

<div align="center">

**Flower shop storefront with cart and checkout flow**

[![Live Demo](https://img.shields.io/badge/Live-kirill--flowers.vercel.app-183b30?style=flat-square)](https://kirill-flowers.vercel.app)

</div>

### About

**Lepestok** ("Petal") is a commercial frontend project for a flower shop: a product showcase, a filterable bouquet catalogue, and a full cart with delivery method selection and demo checkout. Built with zero runtime dependencies — pure Vanilla JavaScript and CSS.

The site is live and fully functional: [kirill-flowers.vercel.app](https://kirill-flowers.vercel.app)

### ✨ Features

- 🛒 **Persistent cart** — state survives page reloads via `localStorage`
- 🧮 **In-card quantity controls** — adjust quantity right on the product card
- 🚚 **Delivery method choice** — courier with address-based pricing, or pickup
- 🔎 **Occasion filters** — date night, birthday, thank-you, no-reason bouquets
- ⚡ **Quick date pickers** — Today / Tomorrow / Day After buttons in checkout
- 📱 **Responsive layout** — mobile to desktop, burger menu on small screens
- ♿ **Accessibility** — aria attributes, tab roles for filters, live region for toasts
- 🎨 **Intro loader** — branded welcome screen with logo on first visit
- 🗺️ **Delivery map** — interactive OpenStreetMap with free/paid delivery zones

### 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Vanilla JavaScript** | All logic without frameworks — DOM, state, validation |
| **Vite** | Build tool and dev server |
| **CSS (layered)** | Base theme + overrides layer on top |
| **localStorage** | Cart persistence |
| **OpenStreetMap** | Pickup points and delivery zones map |

### 🚀 Getting Started

```bash
npm install      # install dev dependencies (Vite only)
npm run dev      # dev server → http://localhost:5173
npm run build    # production build → ./dist
npm run preview  # preview the built site
```

### 📁 Project Structure

```
flower-shop/
├── index.html              # Entry point: metadata, fonts, favicon
├── src/
│   ├── main.js             # Page rendering, event handlers
│   ├── data.js             # Bouquet catalogue, reviews, assets
│   ├── cart.js             # Cart logic (add/remove/totals)
│   ├── order.js            # Order form validation
│   └── styles/
│       ├── base.css        # Base styles: typography, grids
│       └── overrides.css   # Final theme layer on top of base
└── package.json
```

> ⚠️ **Demo mode:** the cart and checkout run entirely in the browser — no data is sent anywhere. There are no real payments or backend integrations in this project.

---

<div align="center">
<sub>Автор / Author: <a href="https://github.com/kirill-kzzkzok">kirill-kzzkzok</a></sub>
</div>
