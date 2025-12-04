import Map from "@/components/Map";
import { locations } from "@/data/locations";

export default function Home() {
  return (
    <main>
      <Map mapImageUrl="/images/map.webp" locations={locations} />
    </main>
  );
}
