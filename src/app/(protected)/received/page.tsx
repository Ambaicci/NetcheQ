import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for demonstration - we'll replace with real data later
const mockReceivedCheques = [
  {
    id: 1,
    from: "alice@example.com",
    amount: 250.00,
    memo: "Website design fee",
    status: "pending",
    date: "2025-01-15"
  },
  {
    id: 2, 
    from: "bob@example.com",
    amount: 125.50,
    memo: "Consulting services",
    status: "accepted",
    date: "2025-01-10"
  }
];

export default function ReceivedPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Received Cheques</h1>

      <div className="grid gap-6">
        {mockReceivedCheques.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-slate-600">
                No cheques received yet. Cheques sent to your email will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          mockReceivedCheques.map((cheque) => (
            <Card key={cheque.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-sm font-medium">
                    From: {cheque.from}
                  </CardTitle>
                  <CardDescription>
                    {new Date(cheque.date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <span className={`text-xs rounded-full px-2 py-1 ${
                  cheque.status === 'accepted' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {cheque.status}
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${cheque.amount.toFixed(2)}</div>
                {cheque.memo && <p className="mt-2 text-sm">Memo: {cheque.memo}</p>}
                
                {cheque.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Accept</Button>
                    <Button size="sm" variant="outline">Decline</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}