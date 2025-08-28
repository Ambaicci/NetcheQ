'use client';

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QRCode from "qrcode";

// Function to generate a random NetcheQ ID (for demo purposes)
function generateNetcheQId() {
  return 'NCQ-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export default function IssuePage() {
  const [formData, setFormData] = useState({
    netcheqId: generateNetcheQId(),
    payeeName: "",
    payeeId: "",
    payeeEmail: "",
    chequeNumber: "",
    amount: "",
    bank: "",
    expiryDate: "",
    memo: ""
  });
  const [loading, setLoading] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const router = useRouter();

  // Function to generate QR code data string
  const generateQrDataString = useMemo(() => {
    return JSON.stringify({
      id: formData.netcheqId,
      payee: formData.payeeName,
      payeeId: formData.payeeId,
      email: formData.payeeEmail,
      chequeNumber: formData.chequeNumber,
      amount: formData.amount,
      bank: formData.bank,
      expiry: formData.expiryDate,
      memo: formData.memo
    });
  }, [formData]);

  // Generate QR code when form data changes
  useEffect(() => {
    const generateQrCode = async () => {
      if (generateQrDataString !== '{"id":"","payee":"","payeeId":"","email":"","chequeNumber":"","amount":"","bank":"","expiry":"","memo":""}') {
        try {
          const url = await QRCode.toDataURL(generateQrDataString, {
            width: 200,
            margin: 2,
            color: {
              dark: '#0095fd', // Your brand blue
              light: '#ffffff'
            }
          });
          setQrCodeDataUrl(url);
        } catch (err) {
          console.error('Error generating QR code:', err);
        }
      }
    };
    generateQrCode();
  }, [generateQrDataString]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.payeeName || !formData.amount) {
      alert("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call and processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success message
    alert('✅ Cheque issued successfully!\n\n' +
          `NetcheQ ID: ${formData.netcheqId}\n` +
          `Payee: ${formData.payeeName}\n` +
          `Amount: $${formData.amount}`);
    
    router.push('/dashboard');
    setLoading(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Issue a New Cheque</h1>
          <p className="text-slate-600">Create and send a secure digital cheque</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cheque Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NetcheQ ID (Auto-generated, read-only) */}
              <div className="space-y-2">
                <Label htmlFor="netcheqId">NETCHEQ ID</Label>
                <Input
                  id="netcheqId"
                  value={formData.netcheqId}
                  readOnly
                  className="bg-slate-100 font-mono"
                />
                <p className="text-xs text-slate-500">Automatically generated unique identifier</p>
              </div>

              {/* Payee Name */}
              <div className="space-y-2">
                <Label htmlFor="payeeName">
                  Payee Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="payeeName"
                  placeholder="Enter payee's full name"
                  value={formData.payeeName}
                  onChange={(e) => handleInputChange('payeeName', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Payee ID */}
              <div className="space-y-2">
                <Label htmlFor="payeeId">Payee ID/Passport Number</Label>
                <Input
                  id="payeeId"
                  placeholder="Enter government ID number"
                  value={formData.payeeId}
                  onChange={(e) => handleInputChange('payeeId', e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Payee Email */}
              <div className="space-y-2">
                <Label htmlFor="payeeEmail">Payee Email</Label>
                <Input
                  id="payeeEmail"
                  type="email"
                  placeholder="recipient@example.com"
                  value={formData.payeeEmail}
                  onChange={(e) => handleInputChange('payeeEmail', e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Cheque Number */}
              <div className="space-y-2">
                <Label htmlFor="chequeNumber">Cheque Number</Label>
                <Input
                  id="chequeNumber"
                  placeholder="Optional cheque number"
                  value={formData.chequeNumber}
                  onChange={(e) => handleInputChange('chequeNumber', e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">
                  Amount (USD) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Bank */}
              <div className="space-y-2">
                <Label htmlFor="bank">Issuing Bank</Label>
                <Input
                  id="bank"
                  placeholder="Bank name"
                  value={formData.bank}
                  onChange={(e) => handleInputChange('bank', e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Memo */}
              <div className="space-y-2">
                <Label htmlFor="memo">Memo (Optional)</Label>
                <Textarea
                  id="memo"
                  placeholder="What is this cheque for? e.g., 'Website design services'"
                  value={formData.memo}
                  onChange={(e) => handleInputChange('memo', e.target.value)}
                  disabled={loading}
                  rows={2}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.back()}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-[#0095fd] hover:bg-[#0085e0]"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating...
                    </div>
                  ) : (
                    "Confirm & Send"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* QR Code Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code Preview</CardTitle>
            <p className="text-sm text-slate-600">This code contains all cheque details for verification</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
           {qrCodeDataUrl ? (
  <img 
    src={qrCodeDataUrl} 
    alt="Cheque QR Code" 
    width={192}
    height={192}
    className="w-48 h-48 transition-all duration-300 ease-in-out hover:scale-105"
  />
) : (
  <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded">
    <span className="text-gray-400 text-sm">Loading QR...</span>
  </div>
)}
            
            {/* Data Preview */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg w-full">
              <h4 className="font-medium mb-2">QR Code Contains:</h4>
              <pre className="text-xs text-slate-600 overflow-auto">
                {generateQrDataString}
              </pre>
            </div>

            {/* Demo note */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Security Feature:</strong> The QR code encodes all cheque details. 
                Banks can scan it to instantly verify authenticity and prevent fraud.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}