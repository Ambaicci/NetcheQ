"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonCard } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

// Enhanced mock data with trends
const stats = {
  totalIssued: 24650,
  totalReceived: 17850,
  pendingCheques: 4,
  monthlyVolume: 34250,
  trends: {
    issued: "+12%",
    received: "+8%",
    volume: "+15%"
  }
};

const recentCheques = [
  { id: 1034, date: "2025-01-10", amount: 1000, status: "cleared", to: "Client Co." },
  { id: 1033, date: "2025-01-09", amount: 500, status: "pending", to: "Supplier Inc." },
  { id: 1032, date: "2025-01-09", amount: 850, status: "cleared", to: "Vendor Ltd." },
  { id: 1031, date: "2025-01-08", amount: 1200, status: "cleared", to: "Partner LLC" }
];

export default function DashboardPage() {  
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
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Stats Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-gray-200 rounded-lg p-6 animate-pulse mb-8">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-300 rounded"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here is your financial overview.</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/issue">Issue New Cheque</Link>
        </Button>
      </div>

      {/* Stats Grid with Trends - UPDATED COLORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">     
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issued</CardTitle>       
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {stats.trends.issued}        
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalIssued.toLocaleString()}</div>
            <p className="text-xs text-slate-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>     
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {stats.trends.received}      
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalReceived.toLocaleString()}</div>
            <p className="text-xs text-slate-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Cheques</CardTitle>    
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingCheques}</div>
            <p className="text-xs text-slate-600">Awaiting action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Volume</CardTitle>     
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {stats.trends.volume}        
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyVolume.toLocaleString()}</div>
            <p className="text-xs text-slate-600">All transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cheques Table - UPDATED COLORS */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Cheques</CardTitle>
          <CardDescription>Your most recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">     
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left p-4 font-medium">Cheque #</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Recipient</th>
                  <th className="text-right p-4 font-medium">Amount</th>
                  <th className="text-left p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCheques.map((cheque) => (
                  <tr key={cheque.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-mono">{cheque.id}</td>
                    <td className="p-4">{new Date(cheque.date).toLocaleDateString()}</td>
                    <td className="p-4">{cheque.to}</td>
                    <td className="p-4 text-right font-mono">${cheque.amount.toLocaleString()}</td>
                    <td className="p-4">   
                      <span className={`text-xs rounded-full px-2 py-1 ${
                        cheque.status === 'cleared' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cheque.status}    
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - UPDATED COLORS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" asChild className="border-blue-300 text-blue-700 hover:bg-blue-50">
          <Link href="/received">View Received Cheques</Link>
        </Button>
        <Button variant="outline" asChild className="border-blue-300 text-blue-700 hover:bg-blue-50">
          <Link href="/history">View Full History</Link>
        </Button>
        <Button variant="outline" asChild className="border-blue-300 text-blue-700 hover:bg-blue-50">
          <Link href="/settings">Account Settings</Link>
        </Button>
      </div>
    </div>
  );
}
