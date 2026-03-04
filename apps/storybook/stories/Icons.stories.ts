import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@minis/icons';
import '@minis/components'; // resolved to src via Vite alias in main.ts

const ALL_ICONS = [
  'airballoon', 'animation-program', 'apple-pay', 'arrival', 'arrow-classic', 'arrow-down',
  'arrow-left', 'arrow-right', 'arrow-up', 'avatar', 'babysitting', 'beauty',
  'bed', 'bell', 'benefits', 'bestseller', 'bike-cableway', 'bike-rental',
  'bike-room', 'bike-trails', 'bin', 'box', 'bubble', 'building',
  'bulb', 'bus', 'bus1', 'cake', 'calendar', 'calendar-upcoming',
  'calendar1', 'calendar2', 'camera', 'car', 'car1', 'car2',
  'card', 'cart-fill', 'cart-outline', 'cashback', 'categories', 'check',
  'checkbox', 'checkbox-partly', 'chest', 'children', 'children-lift', 'children-lift-poma',
  'children-pool', 'children1', 'childrens-cot', 'circle-arrow', 'circle-check', 'circle-check-fill',
  'circle-close', 'circle-close-fill', 'circle-dollar-fill', 'circle-info-fill', 'circle-plus', 'circle-plus-fill',
  'circle-question', 'clock', 'close', 'closed', 'club', 'contract-signing',
  'copy', 'countryside', 'credit-card', 'cross-country-trails', 'crossroads', 'czech',
  'default', 'departure', 'deposit', 'dislike', 'document', 'document1',
  'document2', 'download', 'edit', 'error', 'ev-charger', 'event-busy',
  'expand', 'eye', 'eye-off', 'eye1', 'feedback', 'file-text',
  'filters', 'fitness', 'fksp', 'flag', 'flake', 'food',
  'fun', 'game-room', 'gift', 'globus', 'golf', 'goods',
  'growth', 'handicap', 'heart', 'heart-fill', 'hearts', 'home',
  'home1', 'iceberg', 'indoor-pool', 'kids-corner', 'light', 'like',
  'like1', 'lock', 'mail', 'mail1', 'meal', 'meal1',
  'menu', 'menuburger', 'message', 'microfon', 'no', 'no-credit-card',
  'no-parking', 'no-signal', 'no-smoking', 'no-transfer', 'no-wifi', 'not-pet-friendly',
  'on-map', 'one-contract', 'other-services', 'outdoor-pool', 'outside', 'own-kitchen',
  'package', 'parking', 'partnership', 'paw', 'percentage', 'person-outline',
  'phone', 'photo-gallery', 'plane', 'plane1', 'plane2', 'playground',
  'position', 'position1', 'printer', 'qr-code', 'radio-checked', 'radio-unchecked',
  'refresh', 'reload', 'reservation', 'restaurant', 'sad', 'salt-cave',
  'sauna', 'scooter-rental', 'sea', 'search', 'settings', 'share',
  'share-ios', 'signal', 'single-image', 'ski-pass', 'ski-room', 'ski-school',
  'ski-slopes', 'skibus', 'slevomat', 'slovakia', 'smartphone', 'smile',
  'snowpark', 'sort', 'spa-procedures', 'star', 'star-fill', 'stay',
  'stick', 'stop', 'suitcase', 'suitcase-checked', 'surroundings', 'swimming-areas',
  'switch', 'team', 'term', 'thermal-pool', 'train', 'train1',
  'train2', 'travel', 'truck', 'tumblr', 'user', 'userpc',
  'users', 'verified', 'voucher-outline', 'walk', 'wallet', 'water-park',
  'wellness', 'wellness-procedures', 'wheelchair', 'wheelchair-not-accessible', 'whirlpool-bath', 'wifi',
  'wifi1', 'wine-cellar', 'wooden-soaking-tub',
] as const;

const meta: Meta = {
  title: 'Components/Icons',
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;
type Story = StoryObj;

// ─── All icons grid ───────────────────────────────────────────────────────────

export const AllIcons: Story = {
  name: 'All icons',
  render: () => html`
    <style>
      .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 8px;
        max-width: 900px;
      }
      .icon-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 12px 8px;
        border: 1px solid var(--color-border, #cbccce);
        border-radius: 4px;
        cursor: default;
      }
      .icon-cell:hover {
        background: var(--color-surface-faded, #f1f3f5);
      }
      .icon-name {
        font-family: monospace;
        font-size: 10px;
        color: var(--color-text-secondary, #666);
        text-align: center;
        word-break: break-all;
      }
    </style>
    <div class="icon-grid">
      ${ALL_ICONS.map(name => html`
        <div class="icon-cell" title="${name}">
          <minis-icon name="${name}" size="24"></minis-icon>
          <span class="icon-name">${name}</span>
        </div>
      `)}
    </div>
  `,
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    name: 'star',
    size: 24,
    label: '',
  },
  argTypes: {
    name: {
      control: 'select',
      options: ALL_ICONS,
      description: 'Icon name',
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
      description: 'Width and height in px',
    },
    label: {
      control: 'text',
      description: 'Accessible label (empty = decorative, aria-hidden)',
    },
  },
  render: (args) => html`
    <div style="display:flex;align-items:center;gap:16px;padding:16px;">
      <minis-icon
        name=${args.name}
        size=${args.size}
        label=${args.label || null}
      ></minis-icon>
      <span style="font-family:monospace;font-size:13px;color:var(--color-text-secondary,#666)">
        &lt;minis-icon name="${args.name}" size="${args.size}"${args.label ? ` label="${args.label}"` : ''}&gt;&lt;/minis-icon&gt;
      </span>
    </div>
  `,
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  render: () => html`
    <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;padding:16px;">
      ${([12, 16, 20, 24, 32, 48] as const).map(size => html`
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <minis-icon name="star-fill" size="${size}"></minis-icon>
          <span style="font-family:monospace;font-size:11px;color:var(--color-text-secondary,#666)">${size}px</span>
        </div>
      `)}
    </div>
  `,
};

// ─── Color inheritance ────────────────────────────────────────────────────────

export const ColorInheritance: Story = {
  name: 'Color inheritance',
  render: () => html`
    <div style="display:flex;gap:16px;flex-wrap:wrap;padding:16px;align-items:center;">
      <minis-icon name="heart-fill" size="32" style="color:var(--color-interaction-primary-surface,#006eb9)"></minis-icon>
      <minis-icon name="heart-fill" size="32" style="color:#e53935"></minis-icon>
      <minis-icon name="heart-fill" size="32" style="color:#43a047"></minis-icon>
      <minis-icon name="heart-fill" size="32" style="color:var(--color-text-secondary,#666)"></minis-icon>
      <div style="background:#222;padding:8px;border-radius:4px;">
        <minis-icon name="heart-fill" size="32" style="color:#fff"></minis-icon>
      </div>
    </div>
  `,
};

// ─── In button slot ───────────────────────────────────────────────────────────

export const InButtonSlot: Story = {
  name: 'In button slot',
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;padding:16px;">
      <minis-button variant="primary">
        <minis-icon slot="icon" name="cart-fill"></minis-icon>
        Add to cart
      </minis-button>
      <minis-button variant="secondary">
        <minis-icon slot="icon" name="heart"></minis-icon>
        Save
      </minis-button>
      <minis-button variant="danger">
        <minis-icon slot="icon" name="close"></minis-icon>
        Remove
      </minis-button>
      <minis-button variant="primary" icon-only>
        <minis-icon slot="icon" name="search"></minis-icon>
      </minis-button>
      <minis-button variant="secondary" icon-only>
        <minis-icon slot="icon" name="bell"></minis-icon>
      </minis-button>
    </div>
  `,
};
