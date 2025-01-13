import {
  g as U,
  A as E,
  C as F,
  E as k,
  r as d,
  F as w,
  G as v,
  H as D,
  j as t,
  R as S,
  T as _,
  J as A,
  K as P,
  N as H,
  O as T,
  Q as W,
  U as B,
  V as N,
  X as R,
  Y as $,
  Z as I,
  $ as J,
  a0 as M,
  W as O,
} from "./index-ab53a40d.js";
import { T as j } from "./TextField-1a9e6805.js";
import { B as b } from "./Button-f4a0cf8d.js";
import "./useFormControl-3a006078.js";
const G = U("MuiBox", ["root"]),
  V = G,
  K = E({ defaultClassName: V.root, generateClassName: F.generate }),
  C = K,
  Q = k(),
  y = Q;
function X() {
  const [a, l] = d.useState(null),
    [h, r] = d.useState({ head: "", text: "" }),
    p = w(),
    m = v((e) => e.utils.pvtutil);
  d.useEffect(() => {
    p(D());
  }, [p]),
    d.useEffect(() => {
      m && l(m[0]);
    }, [m]);
  const f = (e) => {
      const { name: i, value: c } = e.target;
      l((x) => ({ ...x, [i]: c }));
    },
    n = (e) => {
      const { name: i, files: c } = e.target;
      c && l((x) => ({ ...x, [i]: c[0] }));
    },
    u = () => {
      const e = new FormData();
      ["head_pvt", "image_alt_pvt", "text_pvt", "steps"].forEach((c) =>
        e.append(c, c === "steps" ? JSON.stringify(a[c]) : a[c])
      ),
        typeof a.image_pvt == "object" && e.append("image_pvt", a.image_pvt),
        p(A(a._id, e));
    },
    o = (e) => {
      const { name: i, value: c } = e.target;
      r((x) => ({ ...x, [i]: c }));
    },
    s = (e) => {
      const i = a.steps.filter((c, x) => x !== e);
      l((c) => ({ ...c, steps: i }));
    },
    g = () => {
      const e = [...a.steps, h];
      l((i) => ({ ...i, steps: e })), r({ head: "", text: "" });
    };
  return (
    a &&
    t.jsxs(y, {
      direction: "column",
      spacing: 2,
      children: [
        ["head_pvt", "text_pvt", "image_alt_pvt"].map((e) =>
          t.jsx(j, { name: e, value: a[e], onChange: f, label: e }, e)
        ),
        t.jsx("img", {
          src: a.image_pvt,
          alt: "",
          height: "100px",
          width: "100px",
        }),
        t.jsx("input", {
          type: "file",
          accept: "image/*",
          onChange: n,
          name: "image_pvt",
        }),
        ["head", "text"].map((e) =>
          t.jsx(j, { name: e, value: h[e], onChange: o, label: e }, e)
        ),
        t.jsx(b, { onClick: g, children: "Add Step" }),
        a.steps.map((e, i) =>
          t.jsxs(
            S.Fragment,
            {
              children: [
                t.jsxs(_, {
                  children: [t.jsx("b", { children: "Head:" }), " ", e.head],
                }),
                t.jsxs(_, {
                  children: [t.jsx("b", { children: "Text:" }), " ", e.text],
                }),
                t.jsx(b, { onClick: () => s(i), children: "Remove" }),
              ],
            },
            i
          )
        ),
        t.jsx(b, { variant: "contained", onClick: u, children: "Update" }),
      ],
    })
  );
}
function Y() {
  const [a, l] = d.useState(null),
    h = w(),
    r = v((n) => n.utils.pcdutil);
  d.useEffect(() => {
    h(P());
  }, [h]),
    d.useEffect(() => {
      r && l(r[0]);
    }, [r]);
  const p = (n) => {
      const { name: u, value: o } = n.target;
      l((s) => ({ ...s, [u]: o }));
    },
    m = (n) => {
      const { name: u, files: o } = n.target;
      o && l((s) => ({ ...s, [u]: o[0] }));
    },
    f = () => {
      const n = new FormData();
      ["head_pcd", "image_alt_pcd"].forEach((o) => n.append(o, a[o])),
        typeof a.image_pcd == "object" && n.append("image_pcd", a.image_pcd),
        h(H(a._id, n));
    };
  return (
    a &&
    t.jsxs(y, {
      direction: "column",
      spacing: 2,
      children: [
        ["head_pcd", "image_alt_pcd"].map((n) =>
          t.jsx(j, { name: n, value: a[n], onChange: p, label: n }, n)
        ),
        t.jsx("img", {
          src: a.image_pcd,
          alt: "",
          height: "100px",
          width: "100px",
        }),
        t.jsx("input", {
          type: "file",
          accept: "image/*",
          onChange: m,
          name: "image_pcd",
        }),
        t.jsx(b, { variant: "contained", onClick: f, children: "Update" }),
      ],
    })
  );
}
function Z() {
  const [a, l] = d.useState(null),
    h = w(),
    r = v((n) => n.utils.homeutil);
  d.useEffect(() => {
    h(T());
  }, [h]),
    d.useEffect(() => {
      r && l(r[0]);
    }, [r]);
  const p = (n) => {
      const { name: u, value: o } = n.target;
      l((s) => ({ ...s, [u]: o }));
    },
    m = (n) => {
      const { name: u, files: o } = n.target;
      o && l((s) => ({ ...s, [u]: o[0] }));
    },
    f = () => {
      const n = new FormData();
      [
        "head_hero",
        "spline_hero",
        "subhead_about",
        "text_about",
        "image_alt_about",
        "head_whyus",
        "text1_whyus",
        "whylist_whyus",
        "text2_whyus",
        "text_3_whyus",
        "image_alt_3_whyus",
        "text_4_whyus",
        "image_alt_4_whyus",
      ].forEach((o) => n.append(o, a[o])),
        ["image_about", "image_3_whyus", "image_4_whyus"].forEach((o) => {
          typeof a[o] == "object" && n.append(o, a[o]);
        }),
        h(W(a._id, n));
    };
  return (
    a &&
    t.jsxs(y, {
      direction: "column",
      spacing: 2,
      children: [
        [
          { name: "head_hero", label: "head_hero" },
          { name: "spline_hero", label: "spline_hero" },
          { name: "subhead_about", label: "subhead_about" },
          { name: "text_about", label: "text_about" },
          { name: "image_alt_about", label: "image_alt_about" },
          { name: "head_whyus", label: "head_whyus" },
          { name: "text1_whyus", label: "text1_whyus" },
          { name: "text2_whyus", label: "text2_whyus" },
          { name: "text_3_whyus", label: "text_3_whyus" },
          { name: "image_alt_3_whyus", label: "image_alt_3_whyus" },
          { name: "text_4_whyus", label: "text_4_whyus" },
          { name: "image_alt_4_whyus", label: "image_alt_4_whyus" },
          { name: "whylist_whyus", label: "whylist_whyus" },
        ].map(({ name: n, label: u }) =>
          t.jsx(j, { name: n, value: a[n], onChange: p, label: u }, n)
        ),
        [
          { name: "image_about", src: a.image_about },
          { name: "image_3_whyus", src: a.image_3_whyus },
          { name: "image_4_whyus", src: a.image_4_whyus },
        ].map(({ name: n, src: u }) =>
          t.jsxs(
            S.Fragment,
            {
              children: [
                t.jsx("img", {
                  src: u,
                  alt: "",
                  height: "100px",
                  width: "100px",
                }),
                t.jsx("input", {
                  type: "file",
                  accept: "image/*",
                  onChange: m,
                  name: n,
                }),
              ],
            },
            n
          )
        ),
        t.jsx(b, { variant: "contained", onClick: f, children: "Update" }),
      ],
    })
  );
}
function q() {
  const [a, l] = d.useState(null),
    [h, r] = d.useState({ head: "", text: "" }),
    p = w(),
    m = v((e) => e.utils.customutil);
  d.useEffect(() => {
    p(B());
  }, [p]),
    d.useEffect(() => {
      m && l(m[0]);
    }, [m]);
  const f = (e) => {
      const { name: i, value: c } = e.target;
      l((x) => ({ ...x, [i]: c }));
    },
    n = (e) => {
      const { name: i, files: c } = e.target;
      c && l((x) => ({ ...x, [i]: c[0] }));
    },
    u = () => {
      const e = new FormData();
      ["head_custom", "image_alt_custom", "text_custom", "steps"].forEach((c) =>
        e.append(c, c === "steps" ? JSON.stringify(a[c]) : a[c])
      ),
        typeof a.image_custom == "object" &&
          e.append("image_custom", a.image_custom),
        p(N(a._id, e));
    },
    o = (e) => {
      const { name: i, value: c } = e.target;
      r((x) => ({ ...x, [i]: c }));
    },
    s = (e) => {
      const i = a.steps.filter((c, x) => x !== e);
      l((c) => ({ ...c, steps: i }));
    },
    g = () => {
      const e = [...a.steps, h];
      l((i) => ({ ...i, steps: e })), r({ head: "", text: "" });
    };
  return (
    a &&
    t.jsxs(y, {
      direction: "column",
      spacing: 2,
      children: [
        ["head_custom", "text_custom", "image_alt_custom"].map((e) =>
          t.jsx(j, { name: e, value: a[e], onChange: f, label: e }, e)
        ),
        t.jsx("img", {
          src: a.image_custom,
          alt: "",
          height: "100px",
          width: "100px",
        }),
        t.jsx("input", {
          type: "file",
          accept: "image/*",
          onChange: n,
          name: "image_custom",
        }),
        ["head", "text"].map((e) =>
          t.jsx(j, { name: e, value: h[e], onChange: o, label: e }, e)
        ),
        t.jsx(b, { onClick: g, children: "Add Step" }),
        a.steps.map((e, i) =>
          t.jsxs(
            S.Fragment,
            {
              children: [
                t.jsxs(_, {
                  children: [t.jsx("b", { children: "Head:" }), " ", e.head],
                }),
                t.jsxs(_, {
                  children: [t.jsx("b", { children: "Text:" }), " ", e.text],
                }),
                t.jsx(b, { onClick: () => s(i), children: "Remove" }),
              ],
            },
            i
          )
        ),
        t.jsx(b, { variant: "contained", onClick: u, children: "Update" }),
      ],
    })
  );
}
function z() {
  const [a, l] = d.useState(null),
    h = w(),
    r = v((s) => s.utils.aboututil),
    [p, m] = d.useState(null);
  d.useEffect(() => {
    h(R());
  }, [h]),
    d.useEffect(() => {
      r && l(r[0]);
    }, [r]);
  const f = (s) => {
      const { name: g, value: e } = s.target;
      l((i) => ({ ...i, [g]: e }));
    },
    n = (s) => {
      const { name: g, files: e } = s.target;
      e && l((i) => ({ ...i, [g]: e[0] }));
    },
    u = (s) => {
      m([...s.target.files]);
    },
    o = () => {
      const s = new FormData();
      [
        "subhead_hero",
        "subhead_about",
        "text_about",
        "image_alt_about",
      ].forEach((e) => s.append(e, a[e])),
        typeof a.image_about == "object" &&
          s.append("about_image", a.image_about),
        p &&
          p.length > 0 &&
          p.forEach((e) => {
            s.append("hero_images", e);
          }),
        h($(a._id, s));
    };
  return (
    a &&
    t.jsxs(y, {
      direction: "column",
      spacing: 2,
      children: [
        ["subhead_hero", "subhead_about", "text_about", "image_alt_about"].map(
          (s) => t.jsx(j, { name: s, value: a[s], onChange: f, label: s }, s)
        ),
        a.image.map((s, g) =>
          t.jsx(
            "img",
            { src: s, alt: "image", height: "100px", width: "100px" },
            g
          )
        ),
        t.jsx("input", {
          type: "file",
          accept: "image/*",
          onChange: u,
          name: "hero_images",
          multiple: !0,
        }),
        t.jsx("img", {
          src: a.image_about,
          alt: "image",
          height: "100px",
          width: "100px",
        }),
        t.jsx("input", {
          type: "file",
          accept: "image/*",
          onChange: n,
          name: "image_about",
        }),
        t.jsx(b, { variant: "contained", onClick: o, children: "Update" }),
      ],
    })
  );
}
function L() {
  const [a, l] = d.useState(null),
    h = w(),
    r = v((s) => s.utils.certificates),
    [p, m] = d.useState({ text: "", image: null, image_alt: "" });
  d.useEffect(() => {
    h(I());
  }, [h]),
    d.useEffect(() => {
      r && l(r);
    }, [r]);
  const f = (s) => {
      const { name: g, value: e } = s.target;
      m((i) => ({ ...i, [g]: e }));
    },
    n = (s) => {
      const { name: g, files: e } = s.target;
      e && m((i) => ({ ...i, [g]: e[0] }));
    },
    u = () => {
      const s = new FormData();
      ["text", "image_alt"].forEach((e) => {
        s.append(e, p[e]);
      }),
        s.append("image", p.image),
        h(J(s)),
        m({ text: "", image: null, image_alt: "" });
    },
    o = (s) => {
      h(M(s));
    };
  return (
    a &&
    t.jsxs(y, {
      direction: "column",
      spacing: 2,
      children: [
        ["text", "image_alt"].map((s) =>
          t.jsx(j, { name: s, value: a[s], onChange: f, label: s }, s)
        ),
        t.jsx("input", {
          type: "file",
          accept: "image/*",
          onChange: n,
          name: "image",
        }),
        a &&
          a.map((s) =>
            t.jsxs(t.Fragment, {
              children: [
                t.jsxs(
                  _,
                  {
                    children: [t.jsx("b", { children: "Text:" }), " ", s.text],
                  },
                  s._id
                ),
                t.jsxs(_, {
                  children: [
                    t.jsx("b", { children: "Image Alt:" }),
                    " ",
                    s.image_alt,
                  ],
                }),
                t.jsx("img", {
                  src: s.image,
                  alt: "image",
                  width: "100px",
                  height: "100px",
                }),
                t.jsx(b, { onClick: () => o(s._id), children: "Delete" }),
              ],
            })
          ),
        t.jsx(b, { variant: "contained", onClick: u, children: "Add" }),
      ],
    })
  );
}
function tt() {
  return t.jsxs("div", {
    children: [
      t.jsx(_, { variant: "h4", sx: { mb: 4 }, children: "Edit Content" }),
      t.jsxs(C, {
        sx: { p: 5, background: "white" },
        children: [
          t.jsx(_, {
            variant: "h5",
            sx: { fontWeight: "bold", pb: 3 },
            children: "Home Utils",
          }),
          t.jsx(Z, {}),
        ],
      }),
      t.jsxs(C, {
        sx: { p: 5, background: "white" },
        children: [
          t.jsx(_, {
            variant: "h5",
            sx: { fontWeight: "bold", pb: 3 },
            children: "PCD Utils",
          }),
          t.jsx(Y, {}),
        ],
      }),
      t.jsxs(C, {
        sx: { p: 5, background: "white" },
        children: [
          t.jsx(_, {
            variant: "h5",
            sx: { fontWeight: "bold", pb: 3 },
            children: "PVT Utils",
          }),
          t.jsx(X, {}),
        ],
      }),
      t.jsxs(C, {
        sx: { p: 5, background: "white" },
        children: [
          t.jsx(_, {
            variant: "h5",
            sx: { fontWeight: "bold", pb: 3 },
            children: "Custom Formulation Utils",
          }),
          t.jsx(q, {}),
        ],
      }),
      t.jsxs(C, {
        sx: { p: 5, background: "white" },
        children: [
          t.jsx(_, {
            variant: "h5",
            sx: { fontWeight: "bold", pb: 3 },
            children: "About Utils",
          }),
          t.jsx(z, {}),
        ],
      }),
      t.jsxs(C, {
        sx: { p: 5, background: "white" },
        children: [
          t.jsx(_, {
            variant: "h5",
            sx: { fontWeight: "bold", pb: 3 },
            children: "Certificates Utils",
          }),
          t.jsx(L, {}),
        ],
      }),
    ],
  });
}
function it() {
  return t.jsxs(t.Fragment, {
    children: [
      t.jsx(O, {
        children: t.jsx("title", { children: " Edit Content | Minimal UI " }),
      }),
      t.jsx(tt, {}),
    ],
  });
}
export { it as default };
