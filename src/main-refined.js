import "./style.css";
import "./style-refined.css";
import { products, reviews, logoImage } from "./data.js";
import { cart } from "./cart.js";
import { validateOrder } from "./order.js";

const app = document.querySelector("#app");
let filter = "all";
let introShown = false;
let chosenMethod = "";
let deliveryFee = 0;
const revealDelays = [180, 40, 260, 90, 320, 120, 220, 60, 290];
const money = (value) => new Intl.NumberFormat("ru-RU").format(value) + " ₽";

const productCard = (product) => {
  const qty = cart.items.find((item) => item.id === product.id)?.qty || 0;
  return `<article class="card reveal product-card" style="--reveal-delay:${revealDelays[(product.id - 1) % revealDelays.length]}ms"><div class="product-placeholder" data-placeholder="product-${product.id}"><img src="${product.image}" alt="Букет «${product.name}»" loading="lazy"></div><div class="card-body"><h3>${product.name}</h3><p>${product.description}</p><small>${product.character}</small><div class="card-foot"><strong>${money(product.price)}</strong>${qty ? `<div class="card-qty" aria-label="Количество ${product.name}"><button type="button" data-card-dec="${product.id}" aria-label="Уменьшить количество">−</button><b>${qty}</b><button type="button" data-card-inc="${product.id}" aria-label="Увеличить количество">+</button></div>` : `<button type="button" class="btn add" data-add="${product.id}">В корзину</button>`}</div></div></article>`;
};
const reviewMarkup = [...reviews, ...reviews]
  .map(
    ([name, text]) =>
      `<article class="review"><div class="review-person"><span aria-hidden="true">${name[0]}</span><strong>${name}</strong></div><div class="stars" aria-label="5 из 5">★★★★★</div><p>«${text}»</p></article>`,
  )
  .join("");

function render() {
  app.innerHTML = `<div class="intro-loader" id="introLoader" aria-label="Загрузка сайта"><div class="intro-mark" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><p>лепесток</p></div><header class="header"><div class="container nav"><a class="logo" href="#top">лепесток<span aria-hidden="true">✿</span></a><nav class="nav-links" aria-label="Основная навигация"><a href="#catalog">Букеты</a><a href="#how">Как получить</a><a href="#faq">FAQ</a></nav><button class="cart-btn" id="openCart" type="button" aria-label="Открыть корзину">Корзина <b id="cartCount">${cart.count()}</b></button><button class="burger" type="button" aria-label="Открыть меню" aria-expanded="false">☰</button></div></header><main id="top"><section class="hero reveal"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">Цветы по Москве · сегодня</p><h1>Букет, который скажет всё за вас</h1><p class="lead">Соберём живой подарок и привезём бережно – домой, в офис или к месту встречи.</p><div class="actions"><a class="btn primary" href="#catalog">Выбрать букет</a><a class="btn secondary" href="#how">Как получить заказ</a></div></div><div class="hero-art" data-placeholder="hero"><img src="${products[0].image}" alt="Букет «${products[0].name}»"></div></div></section><section id="catalog" class="section"><div class="container"><div class="section-head"><div><p class="eyebrow">Коллекция</p><h2>Выберите своё настроение</h2></div><div class="filters" role="tablist" aria-label="Категории букетов">${[
    ["all", "Все букеты"],
    ["date", "Для свидания"],
    ["birthday", "День рождения"],
    ["thanks", "Спасибо"],
    ["no-reason", "Без повода"],
  ]
    .map(
      ([value, title]) =>
        `<button type="button" class="filter ${filter === value ? "active" : ""}" data-filter="${value}" role="tab" aria-selected="${filter === value}">${title}</button>`,
    )
    .join("")}</div></div><div class="grid products">${products
    .filter((p) => filter === "all" || p.category === filter)
    .map(productCard)
    .join(
      "",
    )}</div></div></section><section class="benefits section"><div class="container"><div class="benefit-intro"><p class="eyebrow">Важные детали</p><h2>Собираем сегодня.<br>Передаём лично.</h2></div><div class="benefit-grid">${[
    ["01", "Доставка по Москве", "Выберите удобный день и интервал."],
    ["02", "Самовывоз", "Заберите заказ из точки по пути."],
    ["03", "Бережная упаковка", "Каждый букет – в фирменной защите."],
    ["04", "Открытка", "Добавим ваш текст к букету."],
    ["05", "Удобная оплата", "Онлайн или при получении."],
  ]
    .map(
      ([num, title, text]) =>
        `<div class="benefit"><i>${num}</i><h3>${title}</h3><p>${text}</p></div>`,
    )
    .join(
      "",
    )}</div></div></section><section id="how" class="section reveal"><div class="container"><p class="eyebrow">Просто и понятно</p><h2>Как получить заказ</h2><div class="steps">${["Выберите букет", "Укажите способ получения", "Выберите дату и время", "Оплатите удобным способом", "Получите или заберите заказ"].map((title, index) => `<div class="step"><span>0${index + 1}</span><h3>${title}</h3></div>`).join("")}</div></div></section><section class="delivery section reveal"><div class="container delivery-box"><p class="eyebrow">Самовывоз и доставка</p><h2>Где нас найти</h2><p class="delivery-intro">Две точки в центре Москвы. На карте отмечены адреса самовывоза и зоны доставки.</p><div class="map-card" aria-label="Карта Москвы с точками самовывоза"><iframe title="Карта Москвы" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=37.48%2C55.70%2C37.75%2C55.82&layer=mapnik"></iframe><div class="map-zone-group zone-group-kremlin" aria-hidden="true"><div class="map-zone zone-red"></div><div class="map-zone zone-yellow"></div><div class="map-zone zone-free"></div></div><div class="map-zone-group zone-group-city" aria-hidden="true"><div class="map-zone zone-red"></div><div class="map-zone zone-yellow"></div><div class="map-zone zone-free"></div></div><span class="map-pin pin-kremlin"><span aria-hidden="true">✿</span><b>Кремль · Манежная площадь, 1</b></span><span class="map-pin pin-city"><span aria-hidden="true">✿</span><b>Москва-Сити · Пресненская набережная, 8с1</b></span></div><div class="map-legend" aria-label="Стоимость доставки"><span><i class="free"></i> Бесплатная доставка</span><span><i class="yellow"></i> 150 ₽</span><span><i class="red"></i> 300 ₽</span></div></div></section><section class="section reviews-section reveal"><div class="container"><div class="section-head"><div><p class="eyebrow">Личные истории</p><h2>Что говорят о «Лепестке»</h2></div></div><div class="review-window" aria-label="Отзывы клиентов"><div class="review-track" id="reviewTrack">${reviewMarkup}</div></div></div></section><section id="faq" class="section faq reveal"><div class="container"><p class="eyebrow">Подсказки</p><h2>Частые вопросы</h2>${[
    [
      "За сколько времени нужно оформить заказ?",
      "Лучше оформить за 2–3 часа. Если букет нужен срочно, покажем доступные интервалы.",
    ],
    [
      "Можно оплатить при получении?",
      "Да, картой или наличными. Онлайн-оплата также доступна.",
    ],
    [
      "Можно добавить открытку?",
      "Конечно – текст открытки можно указать в заказе, мы вложим её бесплатно.",
    ],
    [
      "Где находится самовывоз?",
      "Кремль – Манежная площадь, 1; Москва-Сити – Пресненская набережная, 8с1.",
    ],
  ]
    .map(
      ([question, answer], index) =>
        `<div class="faq-item"><button type="button" aria-expanded="false" aria-controls="faq-${index}">${question}<span aria-hidden="true">+</span></button><div id="faq-${index}" class="faq-answer">${answer}</div></div>`,
    )
    .join(
      "",
    )}</div></section><section class="final-cta"><div class="container"><h2>Подарок начинается с одного клика</h2><a class="btn primary" href="#catalog">Выбрать букет</a></div></section></main><footer><div class="container footer-grid"><div><a class="logo" href="#top">лепесток<span aria-hidden="true">✿</span></a><p>Цветы с городским характером.</p></div><div><b>Навигация</b><a href="#catalog">Букеты</a><a href="#how">Как получить</a><a href="#faq">FAQ</a></div><div><b>Контакты</b><span>+7 (495) 120-48-16</span><span>hello@lepestok.ru</span><span>Ежедневно 09:00–22:00</span><span>Москва · Манежная площадь, 1<br>Пресненская набережная, 8с1</span></div></div><p class="container demo-note">Демо-версия: каталог, корзина и форма заказа работают в браузере; данные никуда не отправляются.</p><div class="container copyright">Москва · ежедневно 09:00–22:00</div></footer><aside class="cart-panel" id="cartPanel" aria-hidden="true"><div class="cart-header"><h2>Корзина</h2><button id="closeCart" type="button" aria-label="Закрыть корзину">×</button></div><div id="cartContent"></div></aside><div class="overlay" id="overlay"></div><div class="toast" id="toast" role="status" aria-live="polite"></div><dialog id="orderDialog"><form method="dialog" id="orderForm" novalidate><button class="dialog-close" value="cancel" aria-label="Закрыть оформление">×</button><p class="eyebrow">Оформление заказа</p><h2>Пара деталей – и готово</h2><div class="form-grid"><label>Имя<input name="name" autocomplete="name" required></label><label>Телефон<input name="phone" type="tel" autocomplete="tel" required></label><label>Email<input name="email" type="email" autocomplete="email" required></label><label>Способ получения<select name="method"><option value="delivery">Доставка</option><option value="pickup">Самовывоз</option></select></label><label class="full">Адрес доставки<input name="address" placeholder="Улица, дом, квартира" autocomplete="street-address"></label><label>Точка самовывоза<select name="pickup"><option value="">Выберите точку</option><option>Кремль – Манежная площадь, 1</option><option>Москва-Сити – Пресненская набережная, 8с1</option></select></label><label>Дата<input name="date" type="date" required></label><label>Временной интервал<select name="time" required><option value="">Выберите время</option><option>10:00–13:00</option><option>14:00–17:00</option><option>18:00–21:00</option></select></label><label class="full">Комментарий<textarea name="comment" rows="2"></textarea></label><label class="full">Текст открытки<textarea name="card" rows="2" placeholder="Напишите пару тёплых слов"></textarea></label></div><fieldset><legend>Оплата</legend><label><input type="radio" name="payment" value="online" checked> Онлайн-картой</label><label><input type="radio" name="payment" value="card"> Картой при получении</label><label><input type="radio" name="payment" value="cash"> Наличными при получении</label></fieldset><div id="formStatus" class="form-status" aria-live="polite"></div><button class="btn primary full" type="submit">Подтвердить заказ</button></form></dialog>`;
  if (introShown) document.querySelector("#introLoader")?.remove();
  bind();
  updateCart();
  observe();
  cleanLayout();
  if (!introShown) {
    introShown = true;
    window.setTimeout(
      () => document.querySelector("#introLoader")?.classList.add("done"),
      1400,
    );
  }
}

function bind() {
  document.querySelectorAll("[data-filter]").forEach(
    (button) =>
      (button.onclick = () => {
        filter = button.dataset.filter;
        render();
      }),
  );
  document.querySelectorAll("[data-add]").forEach(
    (button) =>
      (button.onclick = () => {
        cart.add(+button.dataset.add);
        render();
        showToast("Букет добавлен в корзину");
      }),
  );
  document.querySelectorAll("[data-card-inc]").forEach(
    (button) =>
      (button.onclick = () => {
        const id = +button.dataset.cardInc;
        const item = cart.items.find((x) => x.id === id);
        cart.setQty(id, (item?.qty || 0) + 1);
        render();
      }),
  );
  document.querySelectorAll("[data-card-dec]").forEach(
    (button) =>
      (button.onclick = () => {
        const id = +button.dataset.cardDec;
        const item = cart.items.find((x) => x.id === id);
        if (item?.qty > 1) cart.setQty(id, item.qty - 1);
        else cart.remove(id);
        render();
      }),
  );
  document.querySelector("#openCart").onclick = openCart;
  document.querySelector("#closeCart").onclick = closeCart;
  document.querySelector("#overlay").onclick = closeCart;
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  burger.onclick = () => {
    const open = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  };
  navLinks.querySelectorAll("a").forEach(
    (link) =>
      (link.onclick = () => {
        navLinks.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }),
  );
  document.querySelectorAll(".faq-item button").forEach(
    (button) =>
      (button.onclick = () => {
        const open = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!open));
        button.parentElement.classList.toggle("open", !open);
      }),
  );
  const form = document.querySelector("#orderForm");
  form.querySelector("[name=method]").onchange = () => {
    const pickup = form.querySelector("[name=pickup]").closest("label");
    const address = form.querySelector("[name=address]").closest("label");
    const isPickup = form.querySelector("[name=method]").value === "pickup";
    pickup.hidden = !isPickup;
    address.hidden = isPickup;
  };
  form.querySelector("[name=method]").dispatchEvent(new Event("change"));
  form.onsubmit = submitOrder;
  const dateInput = form.querySelector("[name=date]");
  if (dateInput && !form.querySelector(".date-quick")) {
    const quick = document.createElement("div");
    quick.className = "date-quick";
    quick.innerHTML =
      '<span>Дата получения</span><button type="button" data-days="0">Сегодня</button><button type="button" data-days="1">Завтра</button><button type="button" data-days="2">Послезавтра</button>';
    dateInput.parentElement.append(quick);
    quick.querySelectorAll("button").forEach(
      (btn) =>
        (btn.onclick = () => {
          const d = new Date();
          d.setDate(d.getDate() + Number(btn.dataset.days));
          dateInput.value = d.toISOString().slice(0, 10);
          quick
            .querySelectorAll("button")
            .forEach((b) => b.classList.toggle("active", b === btn));
        }),
    );
  }
  const addressInput = form.querySelector("[name=address]");
  if (addressInput && !form.querySelector(".delivery-price")) {
    const note = document.createElement("small");
    note.className = "delivery-price";
    note.textContent = "Стоимость доставки появится после ввода адреса";
    addressInput.parentElement.append(note);
    addressInput.addEventListener("input", () => {
      if (!addressInput.value.trim()) {
        deliveryFee = 0;
        note.textContent = "Стоимость доставки появится после ввода адреса";
      } else {
        deliveryFee = [0, 150, 300][addressInput.value.trim().length % 3];
        note.textContent = deliveryFee
          ? `Доставка – ${money(deliveryFee)}`
          : "Доставка – бесплатно";
      }
      const total = document.querySelector("#orderTotal");
      if (total)
        total.textContent = `Итого ${money(cart.subtotal() + deliveryFee)}`;
    });
  }
}
function refineDOM() {
  const loader = document.querySelector("#introLoader");
  if (loader) {
    /* Keep the welcome screen focused on the real mark – no extra petal icon. */
    loader.querySelector(".intro-mark")?.remove();
    loader.querySelector(":scope > p")?.remove();
    let brand = loader.querySelector(".loader-brand");
    if (!brand) {
      brand = document.createElement("div");
      brand.className = "loader-brand";
      loader.append(brand);
    }
    brand.innerHTML = `<p>лепесток</p><img src="${logoImage}" alt="Логотип Лепесток">`;
  }

  const heroArt = document.querySelector(".hero-art");
  const benefits = document.querySelector(".benefits");
  if (benefits) {
    benefits.classList.add("reveal");
    if (!benefits.dataset.revealBound && "IntersectionObserver" in window) {
      benefits.dataset.revealBound = "1";
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          }),
        { threshold: 0.12 },
      );
      io.observe(benefits);
    }
  }
  /* The proof board belongs to the first screen: it answers the trust question
     beside the product image, instead of creating a duplicate stats section. */
  if (heroArt && !heroArt.querySelector(".hero-stats-board")) {
    heroArt.classList.add("hero-stats-art");
    heroArt.innerHTML = `<div class="hero-stats-board" aria-label="О магазине Лепесток"><div><b data-counter="150">0</b><span>отзывов</span></div><div><b data-counter="300" data-suffix="+">0</b><span>букетов собрано</span></div><div><b data-counter="2021">0</b><span>год открытия</span></div></div>`;
  }
  /* Keep the page focused on shopping; the former timeline/stat section is no
     longer needed once its useful proof is visible in the hero. */
  benefits?.remove();
  const heroCta = document.querySelector(".hero .btn.primary");
  if (heroCta) heroCta.textContent = "Смотреть каталог";
  const footerIntro = document.querySelector(
    "footer .footer-grid > div:first-child p",
  );
  if (footerIntro) footerIntro.textContent = "Свежие букеты по Москве.";
  /* Hero remains a single, calm composition. The former floating corner image
     competed with the bouquet and is intentionally not mounted. */
  if (heroArt && !heroArt.parentElement.classList.contains("hero-art-wrap")) {
    const wrap = document.createElement("div");
    wrap.className = "hero-art-wrap";
    heroArt.parentElement.insertBefore(wrap, heroArt);
    wrap.append(heroArt);
  }
  /* The board is intentionally clean: the logo belongs to the welcome screen,
     not in the top-left corner of the statistics panel. */
  heroArt?.querySelector(".hero-brand-mark")?.remove();

  const map = document.querySelector(".map-card");
  if (map) {
    const frame = map.querySelector("iframe");
    if (frame)
      frame.src =
        "https://www.openstreetmap.org/export/embed.html?bbox=37.50%2C55.705%2C37.69%2C55.805&layer=mapnik";
    /* Coordinates are tied to the static map viewport, so the points and
       delivery rings cannot drift independently from the map. */
    const positions = {
      ".zone-group-kremlin": [66, 53],
      ".pin-kremlin": [66, 53],
      ".zone-group-city": [24, 58],
      ".pin-city": [24, 58],
    };
    Object.entries(positions).forEach(([selector, [x, y]]) => {
      const node = map.querySelector(selector);
      if (node) {
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
      }
    });
  }

  const methodField = document
    .querySelector('#orderForm [name="method"]')
    ?.closest("label");
  if (methodField) {
    const selected =
      chosenMethod || methodField.querySelector("select")?.value || "delivery";
    methodField.remove();
    const hiddenMethod = document.createElement("input");
    hiddenMethod.type = "hidden";
    hiddenMethod.name = "method";
    hiddenMethod.value = selected;
    document.querySelector("#orderForm")?.prepend(hiddenMethod);
  }
  const submitButton = document.querySelector(
    '#orderForm button[type="submit"]',
  );
  if (submitButton && !document.querySelector("#orderTotal")) {
    const total = document.createElement("strong");
    total.id = "orderTotal";
    total.className = "order-total";
    total.textContent = `Итого ${money(cart.subtotal())}`;
    submitButton.parentElement.insertBefore(total, submitButton);
  }

  /* The navigation itself is the only floating control. It tucks away while
     reading down and returns on an upward scroll, matching the reference
     header without adding a second CTA over the page. */
  if (!document.body.dataset.headerScrollBound) {
    document.body.dataset.headerScrollBound = "1";
    let lastY = window.scrollY;
    window.addEventListener(
      "scroll",
      () => {
        const currentY = window.scrollY;
        const header = document.querySelector(".header");
        if (header) {
          header.classList.toggle(
            "is-hidden",
            currentY > lastY && currentY > 40,
          );
          if (currentY < 48) header.classList.remove("is-hidden");
        }
        lastY = currentY;
      },
      { passive: true },
    );
  }

  const timeline = document.querySelector(".benefits");
  if (timeline) {
    const icons = ["↗", "⌂", "◌", "✧", "✓"];
    timeline.querySelectorAll(".benefit").forEach((item, index) => {
      if (!item.querySelector(".timeline-icon")) {
        const icon = document.createElement("span");
        icon.className = "timeline-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = icons[index] || "•";
        item.prepend(icon);
      }
    });
  }
  if (!document.body.dataset.counterBound && "IntersectionObserver" in window) {
    document.body.dataset.counterBound = "1";
    const animateCounter = (el) => {
      if (el.dataset.counterDone === "1") return;
      el.dataset.counterDone = "1";
      const target = Number(el.dataset.counter || 0);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / 900);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const counterObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          animateCounter(el);
          counterObserver.unobserve(el);
        }),
      { threshold: 0.3 },
    );
    const counters = document.querySelectorAll(
      ".hero-counters [data-counter], .stats-board [data-counter], .hero-stats-board [data-counter]",
    );
    counters.forEach((counter) => counterObserver.observe(counter));
    /* The hero can start under the intro curtain; make sure the trust facts
       still resolve once the curtain is gone even if the first IO sample was
       skipped by the browser. */
    window.setTimeout(
      () => counters.forEach((counter) => animateCounter(counter)),
      1700,
    );
  }

  const syncCartButton = () => {
    const button = document.querySelector("#openCart");
    if (!button) return;
    button.classList.toggle("has-items", cart.count() > 0);
    button.setAttribute(
      "aria-label",
      cart.count()
        ? `Открыть корзину, товаров: ${cart.count()}`
        : "Открыть корзину",
    );
  };
  syncCartButton();
  if (!document.body.dataset.cartObserver) {
    document.body.dataset.cartObserver = "1";
    const header = document.querySelector(".header");
    if (header)
      new MutationObserver(syncCartButton).observe(header, {
        childList: true,
        characterData: true,
        subtree: true,
      });
  }
}

function cleanLayout() {
  document.querySelectorAll('a[href="#how"]').forEach((link) => link.remove());
  const mainNav = document.querySelector(".nav-links");
  if (mainNav && !mainNav.querySelector('a[href="#reviews"]')) {
    const reviewsLink = document.createElement("a");
    reviewsLink.href = "#reviews";
    reviewsLink.textContent = "Отзывы";
    reviewsLink.addEventListener("click", () => {
      mainNav.classList.remove("open");
      document.querySelector(".burger")?.setAttribute("aria-expanded", "false");
    });
    mainNav.insertBefore(
      reviewsLink,
      mainNav.querySelector('a[href="#faq"]') || null,
    );
  }
  document.querySelector("#how")?.remove();
  document.querySelector("#scrollCta")?.remove();
  document.querySelector(".hero-secondary-art")?.remove();
  const heroImage = document.querySelector(".hero-art img");
  if (heroImage) {
    heroImage.alt = "Букет из коллекции Лепестка";
  }
  const heroSecondary = document.querySelector(".hero .btn.secondary");
  if (heroSecondary) {
    heroSecondary.href = "#reviews";
    heroSecondary.textContent = "Отзывы";
  }
  document.querySelector(".reviews-section")?.setAttribute("id", "reviews");
  const loader = document.querySelector("#introLoader");
  if (loader && !loader.querySelector(".loader-brand"))
    loader.insertAdjacentHTML(
      "beforeend",
      `<div class="loader-brand"><p>лепесток</p><img src="${logoImage}" alt=""></div>`,
    );
  document.querySelectorAll(".logo span").forEach((span) => {
    span.innerHTML = `<img src="${logoImage}" alt="" aria-hidden="true">`;
  });
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.querySelector("h1").textContent = "Цветы, которые остаются в памяти.";
    hero.querySelector(".lead").textContent =
      "Свежие букеты с доставкой по Москве – соберём сегодня и привезём к нужному часу.";
    const image = hero.querySelector(".hero-art img");
  }
  document
    .querySelectorAll(".benefit-intro .eyebrow")
    .forEach((n) => (n.textContent = "Как это работает"));
  document
    .querySelectorAll(".benefits .benefit")
    .forEach((n, i) => n.style.setProperty("--timeline-delay", `${i * 90}ms`));
  const replacements = new Map([
    ["Выберите своё настроение", "Букеты на сегодня"],
    ["Подарок начинается с одного клика", "Выберите букет для своего повода"],
    ["Личные истории", "Отзывы покупателей"],
    ["Важные детали", "Сервис"],
    ["Просто и понятно", "Ответы"],
  ]);
  document.querySelectorAll("h1,h2,h3,p,.eyebrow").forEach((node) => {
    const value = node.textContent.trim();
    if (replacements.has(value)) node.textContent = replacements.get(value);
  });
}
function updateCart() {
  const content = document.querySelector("#cartContent");
  document.querySelector("#cartCount").textContent = cart.count();
  if (!cart.items.length) {
    content.innerHTML =
      '<div class="empty">Корзина пуста<br><a href="#catalog" class="btn secondary">Перейти к букетам</a></div>';
    return;
  }
  content.innerHTML =
    cart.items
      .map((item) => {
        const product = products.find((x) => x.id === item.id);
        return `<div class="cart-item"><img class="product-thumb" src="${product.image}" alt=""><div><b>${product.name}</b><small>${money(product.price)}</small><div class="qty"><button type="button" data-dec="${product.id}" aria-label="Уменьшить количество">−</button><span>${item.qty}</span><button type="button" data-inc="${product.id}" aria-label="Увеличить количество">+</button><button type="button" class="remove" data-remove="${product.id}">Удалить</button></div></div></div>`;
      })
      .join("") +
    `<div class="summary"><span>Букеты <b>${money(cart.subtotal())}</b></span><span>Доставка <b>После выбора способа</b></span><strong>Итого <b>${money(cart.subtotal())}</b></strong><button class="btn primary full" id="checkout" type="button">Оформить заказ</button></div>`;
  content.querySelectorAll("[data-inc]").forEach(
    (button) =>
      (button.onclick = () => {
        const id = +button.dataset.inc;
        cart.setQty(id, cart.items.find((item) => item.id === id).qty + 1);
        updateCart();
      }),
  );
  content.querySelectorAll("[data-dec]").forEach(
    (button) =>
      (button.onclick = () => {
        const id = +button.dataset.dec;
        const item = cart.items.find((x) => x.id === id);
        if (item.qty > 1) cart.setQty(id, item.qty - 1);
        else cart.remove(id);
        updateCart();
      }),
  );
  content.querySelectorAll("[data-remove]").forEach(
    (button) =>
      (button.onclick = () => {
        cart.remove(+button.dataset.remove);
        updateCart();
      }),
  );
  document.querySelector("#checkout").onclick = () => {
    closeCart();
    document.querySelector("#orderDialog").showModal();
  };
}
function updateCartEnhanced() {
  const content = document.querySelector("#cartContent");
  document.querySelector("#cartCount").textContent = cart.count();
  if (!cart.items.length) {
    content.innerHTML =
      '<div class="empty">Корзина пуста<br><a href="#catalog" data-close-cart class="btn secondary">Перейти к букетам</a></div>';
    content
      .querySelector("[data-close-cart]")
      ?.addEventListener("click", closeCart);
    return;
  }
  const items = cart.items
    .map((item) => {
      const product = products.find((x) => x.id === item.id);
      return `<div class="cart-item"><img class="product-thumb" src="${product.image}" alt=""><div><b>${product.name}</b><small>${money(product.price)}</small><div class="qty"><button type="button" data-dec="${product.id}" aria-label="Уменьшить количество">−</button><span>${item.qty}</span><button type="button" data-inc="${product.id}" aria-label="Увеличить количество">+</button><button type="button" class="remove" data-remove="${product.id}">Удалить</button></div></div></div>`;
    })
    .join("");
  const isDelivery = chosenMethod === "delivery";
  const deliveryLabel = isDelivery ? "После ввода адреса" : "";
  const totalLabel = isDelivery ? "После ввода адреса" : money(cart.subtotal());
  content.innerHTML =
    items +
    `<div class="summary"><span>Букеты <b>${money(cart.subtotal())}</b></span><div class="method-choice"><span>Получение</span><div class="method-buttons"><button type="button" class="method-btn ${chosenMethod === "delivery" ? "active" : ""}" data-method="delivery">Доставка</button><button type="button" class="method-btn ${chosenMethod === "pickup" ? "active" : ""}" data-method="pickup">Самовывоз</button></div></div>${isDelivery ? `<span>Доставка <b>${deliveryLabel}</b></span>` : ""}<strong>Итого <b>${totalLabel}</b></strong><button class="btn primary full" id="checkout" type="button" ${chosenMethod ? "" : "disabled"}>${chosenMethod ? (isDelivery ? "Указать адрес" : "Перейти к оформлению") : "Сначала выберите способ"}</button></div>`;
  content.querySelectorAll("[data-method]").forEach(
    (btn) =>
      (btn.onclick = () => {
        chosenMethod = btn.dataset.method;
        deliveryFee = 0;
        updateCartEnhanced();
      }),
  );
  content.querySelectorAll("[data-inc]").forEach(
    (btn) =>
      (btn.onclick = () => {
        const id = +btn.dataset.inc;
        cart.setQty(id, cart.items.find((item) => item.id === id).qty + 1);
        updateCartEnhanced();
      }),
  );
  content.querySelectorAll("[data-dec]").forEach(
    (btn) =>
      (btn.onclick = () => {
        const id = +btn.dataset.dec;
        const item = cart.items.find((x) => x.id === id);
        if (item.qty > 1) cart.setQty(id, item.qty - 1);
        else cart.remove(id);
        updateCartEnhanced();
      }),
  );
  content.querySelectorAll("[data-remove]").forEach(
    (btn) =>
      (btn.onclick = () => {
        cart.remove(+btn.dataset.remove);
        updateCartEnhanced();
      }),
  );
  content.querySelector("#checkout").onclick = () => {
    if (!chosenMethod) return;
    closeCart();
    const dialog = document.querySelector("#orderDialog");
    const form = dialog.querySelector("#orderForm");
    let method = form.querySelector("[name=method]");
    if (!method) {
      method = document.createElement("input");
      method.type = "hidden";
      method.name = "method";
      form.prepend(method);
    }
    method.value = chosenMethod;
    deliveryFee = 0;
    const isPickup = chosenMethod === "pickup";
    form
      .querySelector("[name=address]")
      ?.closest("label")
      ?.toggleAttribute("hidden", isPickup);
    form
      .querySelector("[name=pickup]")
      ?.closest("label")
      ?.toggleAttribute("hidden", !isPickup);
    const total = document.querySelector("#orderTotal");
    if (total) total.textContent = `Итого ${money(cart.subtotal())}`;
    dialog.showModal();
  };
}
updateCart = updateCartEnhanced;
function openCart() {
  document.querySelector("#cartPanel").classList.add("open");
  document.querySelector("#cartPanel").setAttribute("aria-hidden", "false");
  document.querySelector("#overlay").classList.add("show");
}
function closeCart() {
  document.querySelector("#cartPanel").classList.remove("open");
  document.querySelector("#cartPanel").setAttribute("aria-hidden", "true");
  document.querySelector("#overlay").classList.remove("show");
}
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}
function submitOrder(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  document.querySelectorAll(".error").forEach((error) => error.remove());
  const errors = validateOrder(data);
  if (Object.keys(errors).length) {
    Object.entries(errors).forEach(([key, message]) => {
      const field = form.elements[key];
      if (!field) return;
      const error = document.createElement("small");
      error.className = "error";
      error.textContent = message;
      field.parentElement.append(error);
    });
    return;
  }
  const status = document.querySelector("#formStatus");
  status.textContent = "Оформляем заказ…";
  status.className = "form-status loading";
  window.setTimeout(() => {
    status.textContent =
      "Заказ успешно оформлен в демо-режиме. Данные никуда не отправлялись.";
    status.className = "form-status success";
    cart.clear();
    updateCart();
  }, 800);
}
function observe() {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));
}
render();
