import Navbar          from "../components/Navbar";
import Footer          from "../components/Footer";
import AnimatedOutlet  from "../components/AnimatedOutlet";

/**
 * MainLayout
 *
 * Shell layout used by every public route:
 *   ┌──────────────────────────────┐
 *   │  Navbar  (fixed, z-50)       │
 *   ├──────────────────────────────┤
 *   │  <page content>  (flex-grow) │
 *   ├──────────────────────────────┤
 *   │  Footer                      │
 *   └──────────────────────────────┘
 *
 * pt-16 on the content wrapper offsets the fixed 64px Navbar so
 * page content is never hidden behind it.
 */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* pt-16 = 64px to clear the fixed navbar height */}
      <main className="flex flex-1 flex-col pt-16">
        <AnimatedOutlet />
      </main>

      <Footer />
    </div>
  );
}
