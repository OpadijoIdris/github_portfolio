const CompletedList = ({ completed }) => (
  <div className="bg-white p-4 rounded shadow-md">
    <h2 className="text-xl font-bold mb-4">✅ Completed Collections</h2>
    <ul>
      {completed.map(item => (
        <li key={item.id} className="mb-2 border-b pb-2">
          {item.wasteType} at {item.location} on {item.date}
        </li>
      ))}
    </ul>
  </div>
);

export default CompletedList;