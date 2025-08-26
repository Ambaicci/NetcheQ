import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for history - we'll replace with real data later
const historyData = [
  {
    id: 1034,
    type: "issued",
    to: "client@example.com",
    amount: 1000,
    status: "cleared",
    date: "2025-01-10"
  },
  {
    id: 1033,
    type: "received", 
    from: "supplier@example.com",
    amount: 500,
    status: "accepted",
    date: "2025-01-09"
  },
  {
    id: 1032,
    type: "issued",
    to: "vendor@example.com", 
    amount: 850,
    status: "pending",
    date: "2025-01-09"
  },
  {
    id: 1031,
    type: "received",
    from: "partner@example.com",
    amount: 1200,
    status: "cleared",
    date: "2025-01-09"
  }
];

export default function HistoryPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <Button variant="outline">Export CSV</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Your complete cheque history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">ID</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Party</th>
                  <th className="text-right p-4 font-medium">Amount</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4">{item.id}</td>
                    <td className="p-4 capitalize">{item.type}</td>
                    <td className="p-4">
                      {item.type === "issued" ? item.to : item.from}
                    </td>
                    <td className="p-4 text-right">${item.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`text-xs rounded-full px-2 py-1 ${
                        item.status === 'cleared' ? 'bg-green-100 text-green-800' :
                        item.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}