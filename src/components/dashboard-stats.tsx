"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, PlusCircle, Download } from "lucide-react"

// Placeholder data
const getDashboardData = () => {
  return {
    balance: 14500,
    pendingCheques: 2,
    notifications: [
      { id: 1, message: "Cheque from John Doe of $2,500 received", read: false },
      { id: 2, message: "Cheque #123 cleared", read: true },
    ]
  };
};

export function DashboardStats() {
  const data = getDashboardData();

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Balance Summary */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <CardContent className="p-6">
          <div className="text-2xl font-semibold mb-2">Balance</div>
          <div className="text-4xl font-bold">${data.balance.toLocaleString()}</div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 text-lg gap-2">
          <PlusCircle className="h-5 w-5" />
          Issue Cheque
        </Button>
        <Button variant="outline" className="h-16 text-lg gap-2">
          <Download className="h-5 w-5" />
          Received Cheques
        </Button>
      </div>

      {/* Stats and Notifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Cheques Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Cheques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.pendingCheques}</div>
            <p className="text-sm text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-2 text-sm ${notification.read ? "opacity-70" : "font-semibold"}`}
                >
                  <div className={`h-2 w-2 rounded-full mt-2 ${notification.read ? "bg-gray-300" : "bg-blue-500"}`} />
                  <span>{notification.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}