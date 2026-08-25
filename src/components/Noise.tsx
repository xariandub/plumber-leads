/**
 * Fixed-position grain overlay. CSS handles the actual texture (see
 * globals.css `.noise-overlay`). This component just renders the layer
 * so the texture sits above the background and below the content.
 */
export function Noise() {
  return <div className="noise-overlay" aria-hidden="true" />;
}
