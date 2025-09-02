function Sidebar() {
  return (
    <div className="w-56 bg-indigo-700 text-white p-6 space-y-4">
      <h2 className="text-xl font-bold">Menu</h2>
      <ul className="space-y-2">
        <li className="hover:underline cursor-pointer">Current</li>
        <li className="hover:underline cursor-pointer">Hourly</li>
        <li className="hover:underline cursor-pointer">Details</li>
        <li className="hover:underline cursor-pointer">Maps</li>
        <li className="hover:underline cursor-pointer">Monthly Trends</li>
      </ul>
    </div>
  );
}

export default Sidebar;
