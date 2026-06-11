import { css } from 'lit';

export const pageHeaderStyles = css`
  /* ──────────────────────────────────────────────────────────
     THEME TOKENS
     All theme-specific values flow through CSS custom props
     so consumers can override them per-scope if needed.
  ────────────────────────────────────────────────────────── */
  :host {
    display: block;
    container-type: inline-size;
    container-name: page-header;

    /* surface = brand (cyan) by default */
    --page-header-surface: var(--color-branding-brand);
    /* heading / body text color — dark blue on light backgrounds */
    --page-header-text: var(--color-blue-25);
  }

  :host([theme='blue']) {
    --page-header-surface: var(--color-branding-blue);
    --page-header-text: var(--color-blue-95);
  }

  :host([theme='yellow']) {
    --page-header-surface: var(--color-branding-yellow);
    --page-header-text: var(--color-blue-25);
  }

  :host([theme='pink']) {
    --page-header-surface: var(--color-branding-pink);
    --page-header-text: var(--color-pink-95);
  }

  :host([theme='green']) {
    --page-header-surface: var(--color-branding-green);
    --page-header-text: var(--color-green-95);
  }

  /* ──────────────────────────────────────────────────────────
     ROOT — full-width background strip
  ────────────────────────────────────────────────────────── */

  .root {
    background: var(--page-header-surface);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 40px var(--container-padding, 14px);
    box-sizing: border-box;
  }

  /* ──────────────────────────────────────────────────────────
     CONTAINER — max-width 1240 px, responsive flex direction
  ────────────────────────────────────────────────────────── */

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
    max-width: 1240px;
  }

  /* ──────────────────────────────────────────────────────────
     CONTENT column (tag, heading row, description, button)
  ────────────────────────────────────────────────────────── */

  .content {
    order: 2; /* below image on mobile */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-layout-sm, 12px);
    width: 100%;
  }

  /* ──────────────────────────────────────────────────────────
     TAG pill
  ────────────────────────────────────────────────────────── */

  .tag {
    display: inline-flex;
    align-items: center;
    height: 32px;
    padding: 0 var(--tag-padding-x-noicon, 16px);
    background: var(--color-interaction-secondary-hover-surface, #e6f7fc);
    border: 1px solid var(--color-interaction-secondary-hover-surface, #e6f7fc);
    border-radius: 9999px;
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
    font-size: var(--typography-size-sm, 14px);
    font-weight: var(--typography-weight-regular, 400);
    line-height: 1.33;
    color: var(--color-interaction-secondary-default-accent, #000);
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ──────────────────────────────────────────────────────────
     HEADING ROW (heading text + badge)
  ────────────────────────────────────────────────────────── */

  .heading-row {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 16px;
    position: relative;
    width: 100%;
  }

  /* ──────────────────────────────────────────────────────────
     HEADING — Kensington Bold brand typography
  ────────────────────────────────────────────────────────── */

  .heading {
    font-family: var(--typography-font-family-brand, 'Kensington', serif);
    font-weight: var(--typography-weight-bold, 700);
    /* responsive token: 32px at base → 56px at xl+ breakpoint */
    font-size: var(--typography-brand-xl-size, 32px);
    line-height: var(--typography-brand-xl-line-height, 1.1);
    letter-spacing: var(--typography-spacing-extra-wide, 1px);
    text-transform: uppercase;
    color: var(--page-header-text);
    text-align: center;
    margin: 0;
    flex: 1 0 0;
    min-width: 0;
  }

  /* ──────────────────────────────────────────────────────────
     BADGE variants — mobile sm, desktop md
  ────────────────────────────────────────────────────────── */

  .badge-desktop {
    display: none;
    flex-shrink: 0;
    align-self: flex-end;
    margin-bottom: 10px;
  }

  .badge-mobile {
    display: block;
    position: absolute;
    top: 0;
    right: 8px;
    flex-shrink: 0;
  }

  /* ──────────────────────────────────────────────────────────
     DESCRIPTION
  ────────────────────────────────────────────────────────── */

  .description {
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
    font-size: var(--typography-size-md, 16px);
    font-weight: var(--typography-weight-regular, 400);
    line-height: 1.5;
    letter-spacing: -0.003em;
    color: var(--page-header-text);
    text-align: center;
    margin: 0;
    width: 100%;
  }

  /* ──────────────────────────────────────────────────────────
     BUTTON slot
  ────────────────────────────────────────────────────────── */

  .button-slot {
    display: contents;
  }

  /* ──────────────────────────────────────────────────────────
     IMAGE AREA — decorative photo container
     Blob mask is the scalloped organic shape from Figma (Path 1443).
     Mobile: 160×160, Desktop: 290×280.
  ────────────────────────────────────────────────────────── */

  .image-area {
    order: 1; /* above content on mobile */
    flex-shrink: 0;
    width: 160px;
    height: 160px;
    position: relative;
    -webkit-mask-image: url('data:image/png;base64,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');
    mask-image: url('data:image/png;base64,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');
    -webkit-mask-size: 160px 160px;
    mask-size: 160px 160px;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    mask-mode: luminance;
  }

  .image-area ::slotted(*) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ──────────────────────────────────────────────────────────
     DESKTOP BREAKPOINT ≥ 768 px
  ────────────────────────────────────────────────────────── */

  @container page-header (min-width: 768px) {
    .root {
      padding: 0 var(--container-padding, 32px);
      min-height: 328px;
    }

    .container {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 0;
      padding: 70px 0;
    }

    .content {
      order: 1;
      align-items: flex-start;
      max-width: 560px;
    }

    .heading-row {
      width: auto;
      justify-content: flex-start;
    }

    .heading {
      text-align: left;
      flex: none;
      white-space: nowrap;
    }

    .badge-desktop {
      display: block;
    }

    .badge-mobile {
      display: none;
    }

    .description {
      text-align: left;
      max-width: 507px;
    }

    .image-area {
      order: 2;
      width: 290px;
      height: 280px;
      -webkit-mask-image: url('data:image/png;base64,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');
      mask-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAAEYCAAAAADdNKShAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAAXNSR0IB2cksfwAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABGdBTUEAALGPC/xhBQAAEABJREFUeJztnXlcVUX/x8+FCyLGIi4JiAurAUbqz7R8UJBwq9SyzMz0UdRcMcUeRSQhxY00EzV8FBSXRC13DXHpcUnUitxQAVkUDBRTdi6b/ABZ7r2cZeacmcPcc3z/IffO+c7cr5/XuffMfOc7MwqqOTCwsLWxte5g3bp1SxMFVVVQXPhPVlZ6xr3U/PJm8YcVpeifaNa9p6ubvYlBY4nC1JSyr3lRVnDvRsLV23mi+8SKuBLpOXv3e9OS8TMN27TpQ5VnXzp/7s5zMd1iR0SJ9NyGDutlxGlmYPPJJ6rLvxxPEMElIESTyHL42L6GoMZGHh7B/4uOLsXpEDAiSeQ2bbgVXA2jIUMSL+NxBhJRJBo8YwjwDaSGq2wk8lgwhF9FZ7R+8AW7RK4LxurxrOqA1BHeYJbIdL6vGe/KLq2KELrCG7wSDf/GTUDtDh0TkXkiAJwSWaycIqi+kYPUJRqw/nVhDSjcjoGYGVbg7Yrjk2jespZCm7AHMVo4KjfvSc7D9LSsQjxS4ZKoVfg44Y04G3AP/AcHv+hyVZXkJt64Fp9cIvxjtcAkkeP2txC0Yt/6MZdJx011nVKFsbGVJ6VKvxh3+gGCj1YDj0SdjjqiaMbUjlOi72w13hp16zY572rMkXsoPr4OPBKZ2nLbAKB0ieOwmPVR0zIzb++gs7tjkUWd8EiUltEVSTtcQ5C+y+nLTUaMuLcvMgWJD5gkKkpAIxHHEMRkownjNftF06Ij4lE4gennOhlNMxxDkBU92a5azPDZvf66cCcwSXQbTTPsQ5Cx0zmqt5j0UcQ6wc83TBIlVCBpmHUI4riWO4RgOnfk6sgyYU5gkig13wJFM2xDEP2wV0Ga6PrD537CQnOYJHp6700k7bAMQQIHAbbx9qlvV6kE+IBJovLbaCRiHoIMWgDcyCtBXtMFzKfgGqMh6t4yDkHar+eebmrE/fzcHbx9wCXR9SoFimYYhyBrnKDasYhyW8R3ygmXRMkqwaGQGpiGIDOh4wjznKZk8fSBXzVOMrPR9K9n2Px9P/GxdgeyB8PAg413T4+6y8sFXBKhGoL06EFVFT+6k3jzVmJBQ2GrTaY8mnI+No7X0x9b1BHREKQaRStb23epsuz467//mV1bsrwvr4bsjo05zaMaNokQDUEaMOzUaST15K8L5//K/3gWzzba7P2Eh0bYJLqFZgiiSVtv78qMM4P4zl1SFns/+hW6Er4vWl4bLO3qd/ERUNtixxDoTiQ2ifKSUESvkdPx56FpkFWwSVSRSKRElFPUUMhpcHzzaKh/r1HhvmkCXAWMEqEZgqBn/PW1UPYYJSp6BVvbwlj2x3kYc3wSpWV2w9a2MFpuGPAMwhybRJbTIJMbRaT7apiUFUwSGU+dZ4OnZSRMOnEQ3BiLRIpx897A0S4y9JafyQc2xiFR/8B3MLSKlG7+/sC26CWyDPThk0EsMr4/3gQ1RS7RhKAuqJvEgfGiT0FNoSTSb2FooqCKVWWMk3d2qz+EabAZ+XhbLKAlsETmbm6uDtYWLaoUlfl/p6T8GZ9BY+Sz1BK0veZG3w+tROZeIzwt9evfmdn0oajc32MOa2Wn2Ibqyi1UwzuDADUCkch2woTOTQrNvb2/PrlOfX5i1Hckd4WaoDcFmURWfv9mmJ83Gz3q4Jr6iHnLFXPAPpEY3uv1J5Adp0Q+QR2ZL+p/NHJzcE7NK5fN/QA9I4byKjA7Dom6rOH4eVHO9JxbfcOO2tAB7PMIwh8wh41dooGbubPDnY8GrlkUxDvi3mxEbwQ0ZJVo9FbmXMJGDFd+JnAlQ3OQNBfUkk2isRFg2RcKHVSodHY2qCmLRKMAFdJJQkE7jmwSDdwmYYVil4DbMkrUeQvI75CO8mg2xKIjRok2oVmjQCZfJUEYM0k0fRgKVwhl804YawaJrMGTLXWP+K+gzBkk8ms6bpUMBTMLuI3UoJfI9t8IXCGVQMhcNXqJxrRG4AqhHPwesgKtREbAcV3dI80XtgatRG8TslsHBipmZ8JWoZVoiO6N20FZdRy6Cp1Ehl7CXSGUc0vh69BJZA23eECHeDaDxyoHOomcjQX7QialvnxS5+gksiM0vUwwqfv51KKTiNzEIIF0W/ANj1p0EuFJmCYARcC1I/C16CSS6k9R9bM67EY6dCXah75gV4il0/qR0Dv40EmEfn8bcnjfLxS2Cp1EMOmkOkfguauQNWQnkcl6LwQLHNJRuEIsfRYGwlWgk+g2jqVk5DDv2BUoezoxknN0JteMD8arvSpg7Gl/i+J0KdsMnv4z1sOY036lLkpbImrRUfple0qTTt3bRWgnrdNK9EuwhGdiq3k1YLJWSbU4Tg72jnZmRpT7GK18YFqJ7p7+AJNzhDB257n6l3rG1g4u9i625i3qCj7YMFXTmP7ZFSFxiVoGnHshjqO9g2NbrTHplNSVGu/pJYq5zG+zAJ3hncWPXZybiFNHcNIB9bf0ElWuOCTVsNoLFGwxbMPwRPWV6gydxCOHJP5VY6XdVq/ixndM/Wj//pINrAHQN1gtM4JJosSAcFGcIZQvLzSGJxlHY5v7TBTFGTJRrrn4tOE1o9UsS55nU0gC+8Xz6l8yS1Q8PoZ1f1KJM/3n3+pesYQ9cobv8hDDGTIxCq5f4MsWGXr47i4ZP/q9xtftc8gaPCv++Bt/aXch2Zi//8U8B3t8sTLgQqirGO6QSPdPI2v/coVgY+L8fdrid4dIvoyu7WNzRqnzFh48K93pWVa6fxpR8wcgkO8oU4UoauK2mqlbAInGYHeFVPp4naJAJOrmid8XQlF+DibRCCT76eomwztmAkikJ+X1MlyYDfsvgETOaLY/11HeB5FoiITXNnLTv0s6t0Ty/bGuwdQrglMiG4lPhXAxmFsiDyTneegufc3yuCTSuZ1AEGP9+gUOiYzkLpFeby6J7Ag5Abj5eIPrt+itFuzXpU9PIw6J/k8cPwimc3t2iZQ9RHKEXIwd2CWyek0kR8hFrxO7RN1J3bJaRDqzS+Qs3/mPBjjuIsmuAIXAilUiA9lOEKnxKqtEZrLvOFbTllUi61Zi+UEwr7BKZCv7vjXFJVEnsdwgGeVLiThhlUj3NkXFAZtE+pJdsA9DEZtESqATkKVOAYtECjM5p143wCCRsVMvO9sOFu1E9oZIHtNIZOb5rofNyx5RPZlNJHL8bJyU9wWFJ0tLoi4Lx0p7QSM86RoSGfj6SXptNS8eqEvkGubRXH6QiypJTaJPNsg1NZaNrPuNEi3+5mUUlobbhQ0SBUHsIy4nbjSM0Za8VIieK/USzQhqVj/IJS++TqKBq5rZE2L5I+OFRO03vpxSZODXunjRUlIPwW12KmJfSOQp54XC7CRcr5VIP8SguT0hliNltRKNJPPgexJQ7aNqJfJpbkfI5fwtqkaintLdAFww22r+UVIfS3i/VAGU5qYk3Tla80ppOLi5nSGN8oKU5DtJSfcL6vbtUzq+zNVroLzwflJyclLq03L1UmVvWa8Uqud58f3ku4mJqbk0e/O/zImlqMz9ifeSH6uYLivtxHSGTA7PY72sdBTJD4JJZb+slPABTaCks19Wvpy3VyWyX5f0ts1gZN1nv66U9t7WICRx7KKuzJX95FkCx4noymzZS/QHx3Vlitwz9FU3OAyUCSNEcYRc0um3B29EeVMUPwjm92IOA+WVApknFHEekaq8f81dDEeIpYxboudH5S1RMufBe0rqSKCsv2mXGIMg9SipxIPjxXCFVE5zWlQPP8LHyngM8s8FTpNqdeJ+ku+ee9SZLE6TmhsoZJgpfl8IJZfbpEaiW6E8zuSVCFPb/ieFw6T2Z2i1lwd+Zwjlw74Ld7Jb1EpUNu18ezHcIRKrHYMCHrAZvHiYJU6KlnGe2rh+gbtZLtc9749PjZTxlGPXXUNYbqT6LtEe6r8yvo+qb6RF0UzXGnqNe0oi5Txf1HWPV8Bj+kuNHetDD6JkHYCc7P5lDO0FtbFH/L+WzpLzMhCnExsC82jK1Ydneb7Hl8g571Ex23P+yabFmiPYk+cnTpfzt831F5obSWuQX7Jp59DxA+W7CXj1jeQXq1XWJA5SsG+fy6ABvdup5WKr0uI8u2L2jRhcj61dVqhRQhcqSkj4rrXja50tTU0MSgufZKfcTimZs04cBwnAYME7nyarFzBE055dqT3nWVE/lxvlK6OV6b08QSSqo2G2OzfsO0z+kMhTjXegMdnts+ST8Vf5ROMtqES5K7ai94VQyrI13gJH9n+c0x25L4RSnKPxFliikqV75TI6ydLMyQKfH9o/SS7HW2Zq5qdDTKEFDJBJrztJM20NQqL48LmIfSEUrXwimInYFcNl8eCv0EqEgJEoZ/EepL4QSs4dzfdQ0/nRo+VwSOr1Z5rv4TIevnpLBrthXtJ6DydRSuAWdK4QStVvWgWQeTNbvUcj84VQMv7UKoBNLZrdS+pPtVPakVlYiR77HpD4lo9HtQugE9ROhC5G4wqhZDZJW4PP4Qt+cxASXwjlyFPtEniJKr44I+EgbdX+JkU8MkHTpxyWbobEpabpoXySZc8u3CDcF0KJrGxSxCufeGOX+YJ9IZPUg03L+KVc+ztIdIlW2LOmZfwkqhh78l8CnSGS1O00hTwT99uYC/GEWMLo0rD5SdRyuyTzR1K205Xyk+jbgUI8IZbltLn8vCQaM02YK4RyaQdtMR+JLEL0hPlCJkV+FbTlfCRaJM0ByEaGJaA8JLKV5i6H15jWCvGQaJYkH/hFcwoZrsBLZP2ZMF8IZcV5pivwEr0nyUVHh0MYL8FLNFyIJ6Ryl6UbAy2RTT8hrhBK/sRs5ovQEvU1E+ILmagmsG35AC2RFPeBXHSI7Sq0RBLcgz6YPRsYViIj6aXxBwexX4eVyFA38h42530Jukc1l0LQEpnowpnNWQt2UrHrwEJaQcFcFrASKXUgbfawXwpFnQFagFg6n3syR3o7quQsDav9m+d7IpTrRvpn6gHuBmElquDYBLHZOejfsB9qTBzHjXRzEteGhTXASlRYQvSGUOlBUWrvqm+kNc7Mxj/NZFhTrQmsRKVZBI9iS7eEaA0kYuJDJjMY5y/9FqxVWIlUGW6QNcTjZHBck7LHU2JX0Xbl4mdy7jNXB/TP9a33YGuIxLWVe2nL918JGdeksGhtaAFow9ASxcNWEIfk0F0lDJcefB6zVOtGigmA+G9AS3Q5l8C4bOaGcLpNCOrZfUHjRroW+iNM49ASZVwlLkktKTyaY0e0B5/Hrqo/NDh5fSTXlqmawHcdD5IlUfmtDfuYAvNq7Ly0+sOavzcjogC2T9MAXqLDXxN1iPOeyeXcRtWkjJoW0vpC1F6OLdJpgJco6zBR09U2YApVE/5bh7NNc9C44TFG+2G8MY8PwkUPq79BTW/y27iah0Q3NsMv3ftnyQAvC/iPAsC8B7BEPOEz0uexdO/7jRttBr3njuPQEafjGBpVh49EOQF7IKNGcQ+++OsAAALQSURBVNXDoYyIiA5vDx3QBfXZmR0Rt9cEXvGivZ5fQNnnz3zR880+cMD4dfd+vdujjFK9irAtWvg56+cClQ06+6+Gl8WXL4eau/bp6dYZVXo79kgxP4mKxp+AmCwK0sr+yr14kTKy7P6a02udLITvJmmkwBzl43nLp4044gRqG0wXQFelpR2hDFra2Nl0tLRq187EhHdM/DnfiqDw/VVIGn4Y8D5imYQpL09IqP6jZ6jX7pQDT0eoPNyhYt4/nElDt4IcOFvkH8Zp81xF3c/iLRHskAsa/s+W9PeXz+H8diTOPAPWGktmBgcZvGsCIuDxWzL3JMcsTFXE4keAjSVzmzDAcYygcAT1UGJ++2oWy8a0vy47C9xUAl8fVNhPDBLWiSv4OmrGaPrubeWpLYcgHjZ/FPMcG6eQfRdVk+K38v0P3LXTsiqTfjnEfXqEOqnXeW7dGscUskaG8KFATmRkp/6937A3b6Ff87as9O87Vy9cAwgEalB5jKdEx/hVgwDJaOnBrl36rawsW7fUUxXnPHwGFxqu49gSXieyp5zjUwsKVAPKyvz8u4IauPErryPZ92HvFhGUGbLWm8fim2cR6B3RhhyJYk/zmFqJ4jrnBAHkSESt8ISOtj0UY3dggiT637apsFVCOA4ORgJBElFfe0Aey378BzyOaEKSRI+mHocKIabNxOWJBiRJRJ3zXw9hXfCFGF8zwiSiwiyCgG1VE0/hc0QdsiSighVLAC1VPj9j9aQRwiSigqqCgOzyRFOIOImo4LR1AGcjJflcxO9KHcRJRO24uZFz0P/THNwT+WqQJxH1l9d/5rDeSPeWRbFdRg2BElElwbsXjGY8hPThlnDQgDgaSJSo+j6Z8v1E+oBvwt4IEb9jtZApEUXd8lsxbLC7lb56WdmDMzGnYcOZwiFVIop6smOHuVsPF3ubtqaKisJHaYm3rt2BT1REwP8Dqh9j830+ivYAAAAASUVORK5CYII=');
      -webkit-mask-size: 290px 280px;
      mask-size: 290px 280px;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: 0 0;
      mask-position: 0 0;
      mask-mode: luminance;
    }
  }
`;
