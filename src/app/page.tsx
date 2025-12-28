import Hero from "@/components/sections/Hero";
import MemoryLane from "@/components/sections/MemoryLane";
// import YearOne from "@/components/sections/YearOne";
// import YearTwo from "@/components/sections/YearTwo";
// import YearThree from "@/components/sections/YearThree";
import LoveLetter from "@/components/sections/LoveLetter";
import Gallery from "@/components/sections/Gallery";
import TheFuture from "@/components/sections/TheFuture";
import Finale from "@/components/sections/Finale";
import StarField from "@/components/3d/StarField";

import FloatingElements from "@/components/ui/FloatingElements";
import FluidCursor from "@/components/interactive/FluidCursor";
import AudioReactiveWave from "@/components/visual/AudioReactiveWave";

import Footer from "@/components/layout/Footer";

export default function HomePage() {
    return (
        <main className="bg-black text-ivory relative">
            <StarField />
            <FloatingElements />
            <FluidCursor />
            <AudioReactiveWave />

            <Hero />
            <MemoryLane />
            <LoveLetter />
            <Gallery />
            <TheFuture />
            <Finale />
            <Footer />
        </main>
    );
}
