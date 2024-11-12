export default function Home() {
  let googoo = ["G", "O", "O", "G", "O", "O"];
  let googooColor = [
    "#4086f4", 
    "#eb4132", 
    "#fbbd01", 
    "#4086f4", 
    "#31aa52", 
    "#fbbd01", 
  ];

  return (
    <div className="flex flex-col justify-center space-y-8 items-center h-screen">
      <div className="flex flex-row">
        {googoo.map((letter, index) => (
          <p
            key={index}
            className="text-7xl p-2" // Keep common styles here
            style={{ color: googooColor[index] }} // Apply dynamic background color
          >
            {letter}
          </p>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="rounded-full border border-gray-300 w-96 px-4 py-2 text-black"
        />
      </div>
    </div>
  );
}
