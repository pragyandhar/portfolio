export default function FeaturedProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:shadow-lg transition">
        <h3 className="text-2xl font-bold mb-2">Loan Default Predictor</h3>
        <p className="text-gray-400">A project to predict loan defaulters using ML and dashboards.</p>
      </div>
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:shadow-lg transition">
        <h3 className="text-2xl font-bold mb-2">Sales Dashboard</h3>
        <p className="text-gray-400">Visualized sales trends and forecasts using Power BI.</p>
      </div>
    </div>
  );
}
