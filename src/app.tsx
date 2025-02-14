import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import { VideoCarousel } from "./components/videocarousel";
import { PopularCourses } from "./components/PopularCourses";
import { CallToActionButtons } from "./components/calltoactionsbuttons";

export function App() {
  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Welcome to the Nivus</h1>
        <PopularCourses />
        <CallToActionButtons />
        <VideoCarousel />
      </div>
    </div>
  );
}
