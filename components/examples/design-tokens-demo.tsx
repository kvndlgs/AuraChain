/**
 * Design Tokens Demo Component
 * Demonstrates how to use Figma design tokens in AuraChain
 */

export function DesignTokensDemo() {
  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold text-brand-700">
        Figma Design Tokens Demo
      </h2>

      {/* Brand Colors */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-neutral-800">
          Brand Colors
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div key={shade} className="text-center">
              <div
                className={`h-16 rounded-lg bg-brand-${shade} border border-neutral-200`}
              />
              <p className="text-sm mt-2 text-neutral-600">brand-{shade}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary Colors */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-neutral-800">
          Secondary Colors
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div key={shade} className="text-center">
              <div
                className={`h-16 rounded-lg bg-secondary-${shade} border border-neutral-200`}
              />
              <p className="text-sm mt-2 text-neutral-600">secondary-{shade}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Status Colors */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-neutral-800">
          Status Colors
        </h3>
        <div className="flex gap-4">
          <div className="flex-1 p-6 bg-success-100 border border-success-600 rounded-lg">
            <p className="text-success-800 font-semibold">Success</p>
            <p className="text-success-700 text-sm">Operation completed</p>
          </div>
          <div className="flex-1 p-6 bg-error-100 border border-error-600 rounded-lg">
            <p className="text-error-800 font-semibold">Error</p>
            <p className="text-error-700 text-sm">Something went wrong</p>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-neutral-800">
          Spacing (from Figma)
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-neutral-600">spacing-xs</div>
            <div className="p-spacing-xs bg-brand-500 rounded"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-neutral-600">spacing-sm</div>
            <div className="p-spacing-sm bg-brand-500 rounded"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-neutral-600">spacing-md</div>
            <div className="p-spacing-md bg-brand-500 rounded"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-neutral-600">spacing-lg</div>
            <div className="p-spacing-lg bg-brand-500 rounded"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-neutral-600">spacing-1xl</div>
            <div className="p-spacing-1xl bg-brand-500 rounded"></div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-neutral-800">
          Component Examples
        </h3>
        <div className="space-y-4">
          <button className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-semibold transition-colors">
            Primary Button
          </button>
          <button className="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg font-semibold transition-colors">
            Secondary Button
          </button>
          <div className="p-spacing-lg bg-neutral-100 border border-neutral-300 rounded-lg">
            <p className="text-neutral-800 font-semibold mb-2">Card with Figma spacing</p>
            <p className="text-neutral-600 text-sm">
              This card uses p-spacing-lg for padding
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
