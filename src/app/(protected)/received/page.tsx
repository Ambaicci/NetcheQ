import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Mock data for demonstration - we'll replace with real data later
const mockReceivedCheques = [
  {
    id: "7546W426",
    from: "alice@example.com",
    issuer: "Stanley & Co.",
    amount: 250.00,
    memo: "Website design fee",
    status: "pending",
    date: "2025-01-15"
  },
  {
    id: "8921X357",
    from: "bob@example.com",
    issuer: "JP Morgan",
    amount: 125.50,
    memo: "Consulting services",
    status: "accepted",
    date: "2025-01-10"
  }
];

export default function ReceivedPage() {   
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Received Cheques</h1>
          <p className="text-blue-700">Cheques sent to you will appear here</p>      
        </div>
      </div>

      <div className="grid gap-6">
        {mockReceivedCheques.length === 0 ? (
          <Card className="border-blue-200">
            <CardContent className="pt-6"> 
              <p className="text-center text-blue-600">
                No cheques received yet. Cheques sent to your email will appear here. 
              </p>
            </CardContent>
          </Card>
        ) : (
          mockReceivedCheques.map((cheque) => (
            <Card key={cheque.id} className="hover:shadow-md transition-shadow border-blue-200 hover:border-blue-300">      
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-50">
                <div>
                  <CardTitle className="text-sm font-medium text-blue-900">
                    From: {cheque.issuer}  
                  </CardTitle>
                  <CardDescription className="text-blue-700">        
                    {cheque.from}  {new Date(cheque.date).toLocaleDateString()}    
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
                <div className="text-2xl font-bold text-blue-900">${cheque.amount.toFixed(2)}</div> 
                {cheque.memo && <p className="mt-2 text-sm text-blue-700">Memo: {cheque.memo}</p>}  

                <div className="flex gap-2 mt-4">
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/received/${cheque.id}`}>
                      View Details
                    </Link>
                  </Button>
                  {cheque.status === 'pending' && (
                    <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                      Decline
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
