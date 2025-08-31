"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Table Skeleton */}
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Transaction History</h1>
        <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
          Export CSV
        </Button>
      </div>

      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-blue-900">All Transactions</CardTitle>
          <CardDescription className="text-blue-700">Your complete cheque history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-blue-200">
            <table className="w-full">     
              <thead>
                <tr className="border-b bg-blue-50">  
                  <th className="text-left p-4 font-medium text-blue-900">ID</th>
                  <th className="text-left p-4 font-medium text-blue-900">Type</th>
                  <th className="text-left p-4 font-medium text-blue-900">Party</th>
                  <th className="text-right p-4 font-medium text-blue-900">Amount</th>
                  <th className="text-left p-4 font-medium text-blue-900">Status</th>
                  <th className="text-left p-4 font-medium text-blue-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-blue-50">
                    <td className="p-4">{item.id}</td>
                    <td className="p-4 capitalize">{item.type}</td>
                    <td className="p-4">   
                      {item.type === "issued" ? item.to : item.from}
                    </td>
                    <td className="p-4 text-right font-mono">${item.amount.toLocaleString()}</td>
                    <td className="p-4">   
                      <span className={`text-xs rounded-full px-2 py-1 ${
                        item.status === 'cleared' ? 'bg-green-100 text-green-800' :   
                        item.status === 'accepted' ? 'bg-blue-100 text-blue-800' :    
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}      
                      </span>
                    </td>
                    <td className="p-4 text-blue-700">{new Date(item.date).toLocaleDateString()}</td>
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



