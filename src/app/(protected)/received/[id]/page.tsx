'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

// Mock data for a single received cheque - In real app, this would come from QR scan or API
const mockChequeDetails = {
  netcheqId: "7546W426",
  payee: "Ambaicci BrianBabar",
  issuer: "Stanley & Co.", // Automatically from QR code
  issuerBank: "JP Morgan", // Automatically from QR code  
  amount: 2632000,
  amountInWords: "Two million Six hundred thirty-two thousand only",
  status: "Pending",
  issueDate: "2025-06-25",
  receivedDate: "2025-01-27",
  purpose: "Investment, State purchase OZ",
};

export default function ReceivedDetailPage() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  
  // Generate QR code for display
  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const qrData = JSON.stringify(mockChequeDetails);
        const url = await QRCode.toDataURL(qrData, {
          width: 200,
          margin: 2,
          color: {
            dark: '#0095fd',
            light: '#ffffff'
          }
        });
        setQrCodeDataUrl(url);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };
    generateQrCode();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Received Cheque</h1>
          <p className="text-slate-600">Review and process the received cheque</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Cheque Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Cheque Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">NETCHEQ ID</label>
                <p className="font-mono font-semibold">{mockChequeDetails.netcheqId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Status</label>
                <p className="font-semibold">{mockChequeDetails.status}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Payee</label>
              <p className="font-semibold">{mockChequeDetails.payee}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Issuer (From)</label>
              <p className="font-semibold">{mockChequeDetails.issuer}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Issuer Bank</label>
              <p className="font-semibold">{mockChequeDetails.issuerBank}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Amount</label>
                <p className="text-2xl font-bold">${mockChequeDetails.amount.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Amount in Words</label>
                <p className="text-sm">{mockChequeDetails.amountInWords}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Issue Date</label>
                <p>{new Date(mockChequeDetails.issueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Received Date</label>
                <p>{new Date(mockChequeDetails.receivedDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Purpose/Memo</label>
              <p>{mockChequeDetails.purpose}</p>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <p className="text-sm text-slate-600">Scanned code that provided the details above</p>
          </CardHeader>
          <CardContent className="flex justify-center">
            {qrCodeDataUrl ? (
              <div className="p-4 border rounded-lg bg-white">
                <img 
                  src={qrCodeDataUrl} 
                  alt="Received Cheque QR Code" 
                  width={200}
                  height={200}
                  className="w-50 h-50"
                />
              </div>
            ) : (
              <div className="w-50 h-50 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                <p className="text-slate-400 text-center text-sm">Loading QR code...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons - Matching your sketch */}
        <div className="flex gap-4 justify-center">
          <Button className="bg-[#0095fd] hover:bg-[#0085e0]">
            Redeem
          </Button>
          <Button variant="outline" className="border-[#0095fd] text-[#0095fd] hover:bg-[#e6f4ff]">
            Forward
          </Button>
          <Button variant="outline" className="border-[#0095fd] text-[#0095fd] hover:bg-[#e6f4ff]">
            Download PDF
          </Button>
        </div>

        {/* QR Code Note */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-blue-800">
              <strong>Automated Data:</strong> These details were automatically extracted from 
              the cheque's QR code. No manual entry required.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}