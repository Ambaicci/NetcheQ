"use client";

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
    alert(' Cheque issued successfully!\n\n' +
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
          <h1 className="text-3xl font-bold text-blue-900">Issue a New Cheque</h1>
          <p className="text-blue-700">Create and send a secure digital cheque</p>   
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">Cheque Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NetcheQ ID (Auto-generated, read-only) */}
              <div className="space-y-2">  
                <Label htmlFor="netcheqId" className="text-blue-800">NETCHEQ ID</Label>
                <Input
                  id="netcheqId"
                  value={formData.netcheqId}
                  readOnly
                  className="bg-blue-100 font-mono border-blue-300 text-blue-900"
                />
                <p className="text-xs text-blue-600">Automatically generated unique identifier</p>
              </div>

              {/* Payee Name */}
              <div className="space-y-2">  
                <Label htmlFor="payeeName" className="text-blue-800">
                  Payee Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="payeeName"
                  placeholder="Enter payee's full name"
                  value={formData.payeeName}
                  onChange={(e) => handleInputChange('payeeName', e.target.value)}    
                  required
                  disabled={loading}
                  className="border-blue-300 focus:border-blue-500"       
                />
              </div>

              {/* Payee ID */}
              <div className="space-y-2">  
                <Label htmlFor="payeeId" className="text-blue-800">Payee ID/Passport Number</Label>
                <Input
                  id="payeeId"
                  placeholder="Enter government ID number"
                  value={formData.payeeId} 
                  onChange={(e) => handleInputChange('payeeId', e.target.value)}      
                  disabled={loading}
                  className="border-blue-300 focus:border-blue-500"       
                />
              </div>

              {/* Payee Email */}
              <div className="space-y-2">  
                <Label htmlFor="payeeEmail" className="text-blue-800">Payee Email</Label>
                <Input
                  id="payeeEmail"
                  type="email"
                  placeholder="recipient@example.com"
                  value={formData.payeeEmail}
                  onChange={(e) => handleInputChange('payeeEmail', e.target.value)}   
                  disabled={loading}
                  className="border-blue-300 focus:border-blue-500"       
                />
              </div>

              {/* Cheque Number */}        
              <div className="space-y-2">  
                <Label htmlFor="chequeNumber" className="text-blue-800">Cheque Number</Label>
                <Input
                  id="chequeNumber"        
                  placeholder="Optional cheque number"
                  value={formData.chequeNumber}
                  onChange={(e) => handleInputChange('chequeNumber', e.target.value)} 
                  disabled={loading}
                  className="border-blue-300 focus:border-blue-500"       
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">  
                <Label htmlFor="amount" className="text-blue-800">   
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
                  className="border-blue-300 focus:border-blue-500"       
                />
              </div>

              {/* Bank */}
              <div className="space-y-2">  
                <Label htmlFor="bank" className="text-blue-800">Issuing Bank</Label>
                <Input
                  id="bank"
                  placeholder="Bank name"  
                  value={formData.bank}    
                  onChange={(e) => handleInputChange('bank', e.target.value)}
                  disabled={loading}
                  className="border-blue-300 focus:border-blue-500"       
                />
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">  
                <Label htmlFor="expiryDate" className="text-blue-800">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}   
                  disabled={loading}
                  className="border-blue-300 focus:border-blue-500"       
                />
              </div>

              {/* Memo */}
              <div className="space-y-2">  
                <Label htmlFor="memo" className="text-blue-800">Memo (Optional)</Label>
                <Textarea
                  id="memo"
                  placeholder="What is this cheque for? e.g., 'Website design services'"
                  value={formData.memo}    
                  onChange={(e) => handleInputChange('memo', e.target.value)}
                  disabled={loading}
                  className="border-blue-300 focus:border-blue-500"       
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
                  className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"       
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">QR Code Preview</CardTitle>
            <p className="text-sm text-blue-700">This code contains all cheque details for verification</p>
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
              <div className="w-48 h-48 flex items-center justify-center bg-blue-100 rounded border border-blue-300">    
                <span className="text-blue-600 text-sm">Loading QR...</span>
              </div>
            )}

            {/* Data Preview */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg w-full border border-blue-200">
              <h4 className="font-medium mb-2 text-blue-900">QR Code Contains:</h4>
              <pre className="text-xs text-blue-700 overflow-auto">
                {generateQrDataString}     
              </pre>
            </div>

            {/* Demo note */}
            <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg">   
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
