export default function SkillsPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
      <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition">
        <h3 className="text-xl font-semibold">Power BI</h3>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition">
        <h3 className="text-xl font-semibold">Excel</h3>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition">
        <h3 className="text-xl font-semibold">SQL</h3>
      </div>
    </div>
  );
}
