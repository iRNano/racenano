import Navbar from "@repo/ui/Navbar";
export default function Home() {

  function getRaces() {
    return [
      {
        id: 1,
        name: "Race 1",
        date: "2026-01-01",
        location: "Location 1",
        organizer: "Organizer 1",
        status: "Draft",
        createdAt: "2026-01-01",
      },
      {
        id: 2,
        name: "Race 2",
        date: "2026-01-02",
        location: "Location 2",
        organizer: "Organizer 2",
        status: "Published",
        createdAt: "2026-01-02",
      },
    ];
  }

  const races = getRaces();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Navbar />
        <h1>Races</h1>
        <ul>
          {races.map((race) => (
            <li key={race.id}>{race.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
