import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Contributing',
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;
type Story = StoryObj;

export const Guide: Story = {
  name: 'Guide',
  render: () => html`
    <div style="max-width:860px;font-family:inherit;line-height:1.6;color:var(--color-text-primary,#000)">
      <h1>Contributing to Mini*S</h1>
      <p>While design systems define standards and rules, they must remain <strong>open to evolution</strong>. Your feedback and contributions are essential for keeping the system aligned with real-world product needs.</p>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Before Proposing Changes</h2>
      <ol>
        <li><strong>Audit the System</strong> — Review existing components, patterns, and tokens to ensure a solution doesn't already exist</li>
        <li><strong>Validate the Need</strong> — Check if your use case is a recurring pattern or a one-off edge case</li>
        <li><strong>Team Sync</strong> — Discuss the requirement with your team to confirm its broader utility</li>
      </ol>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Proposing Improvements or New Elements</h2>
      <ol>
        <li><strong>Define the Rationale</strong> — Document the use case and why the current system doesn't meet it</li>
        <li><strong>Provide Context</strong> — Include examples of the intended usage (e.g., a Figma link or screenshot)</li>
        <li><strong>Technical Feasibility</strong> — For changes affecting the codebase, consult with developers early</li>
        <li><strong>Consult Design Leadership</strong> — Contact the Head of Design to review the proposal</li>
        <li><strong>Maintain Consistency</strong> — Ensure your proposal follows established naming conventions and visual patterns</li>
      </ol>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <h2>Contribution Checklist</h2>
      <table style="border-collapse:collapse;width:100%;margin:1rem 0">
        <thead><tr style="background:var(--color-surface-faded,#f1f3f5)">
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Item</th>
          <th style="padding:.75rem 1rem;text-align:left;border:1px solid var(--color-border,#cbccce)">Question</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">☐ <strong>Naming</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Does it follow the system's naming conventions and semantic meaning?</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">☐ <strong>Adaptability</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Does it work across different themes (Light/Dark mode) and platforms?</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">☐ <strong>Redundancy</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Does it avoid duplicating existing components or styles?</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">☐ <strong>Implementation Ready</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Is the logic behind the change clear for both design and code?</td></tr>
          <tr><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">☐ <strong>Documentation</strong></td><td style="padding:.75rem 1rem;border:1px solid var(--color-border,#cbccce)">Is it accompanied by clear usage guidelines?</td></tr>
        </tbody>
      </table>

      <hr style="border:none;border-top:1px solid var(--color-border,#cbccce);margin:2rem 0"/>

      <p><strong>Head of Design:</strong> Michal — michal.strnadel@slevomat.cz</p>
      <p>For questions, proposals, or feedback regarding Mini*S, reach out directly or through your design team lead.</p>
    </div>
  `,
};
