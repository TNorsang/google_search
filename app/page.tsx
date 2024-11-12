export default function Home() {
  return (
    <div className="flex flex-col justify-center space-y-8 items-center h-screen">
      <h1 className="text-black text-8xl">Google</h1>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="rounded-full border border-gray-300 w-96 px-4 py-2"
        />
      </div>
    </div>
  );
}
