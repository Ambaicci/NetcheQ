'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Interface definitions for type safety
interface Bank {
  id: number;
  name: string;
  accounts: Account[];
}

interface Account {
  id: number;
  name: string;
  number: string;
}

// Mock data for a single received cheque
const mockChequeDetails = {
  netcheqId: "7546W426",
  payee: "Ambaicci BrianBabar",
  issuer: "Stanley & Co.",
  issuerBank: "JP Morgan",  
  amount: 2632000,
  amountInWords: "Two million Six hundred thirty-two thousand only",
  status: "Pending",
  issueDate: "2025-06-25",
  receivedDate: "2025-01-27",
  purpose: "Investment, State purchase OZ",
};

// Mock user banks and accounts
const userBanks: Bank[] = [
  {
    id: 1,
    name: "KCB",
    accounts: [
      { id: 101, name: "Current Account", number: "XXXX-7890" },
      { id: 102, name: "Savings Account", number: "XXXX-1234" },
      { id: 103, name: "Joint Account", number: "XXXX-5678" }
    ]
  },
  {
    id: 2, 
    name: "Equity Bank",
    accounts: [
      { id: 201, name: "Premium Account", number: "XXXX-9012" }
    ]
  },
  {
    id: 3,
    name: "Cooperative Bank",
    accounts: [
      { id: 301, name: "Business Account", number: "XXXX-3456" },
      { id: 302, name: "Personal Savings", number: "XXXX-7890" }
    ]
  }
];

export default function ReceivedDetailPage() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [isForwardModalOpen, setIsForwardModalOpen] = useState(false);
  const [redeemStep, setRedeemStep] = useState<'bank' | 'account' | 'confirm'>('bank');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [forwardData, setForwardData] = useState({
    recipientName: "",
    recipientId: "",
    recipientEmail: ""
  });
  const [isForwarding, setIsForwarding] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();
  const chequeRef = useRef<HTMLDivElement>(null);
  
  // Generate QR code for display
  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const qrData = JSON.stringify(mockChequeDetails);
        const url = await QRCode.toDataURL(qrData, {
          width: 128,
          margin: 1,
          color: {
            dark: '#000000',
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

  const openRedeemModal = () => {
    setIsRedeemModalOpen(true);
    setRedeemStep('bank');
    setSelectedBank(null);
    setSelectedAccount(null);
  };

  const openForwardModal = () => {
    setIsForwardModalOpen(true);
    setForwardData({ recipientName: "", recipientId: "", recipientEmail: "" });
  };

  const handleRedeemConfirmation = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(`✅ Success! $${mockChequeDetails.amount.toLocaleString()} redeemed to your ${selectedAccount?.name} at ${selectedBank?.name}`);
    setIsRedeemModalOpen(false);
    router.push('/dashboard');
  };

  const handleForward = async () => {
    if (!forwardData.recipientName || !forwardData.recipientId) {
      alert("Please fill in recipient name and ID");
      return;
    }

    setIsForwarding(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`✅ Cheque forwarded successfully to ${forwardData.recipientName} (ID: ${forwardData.recipientId})`);
    setIsForwardModalOpen(false);
    setIsForwarding(false);
    setForwardData({ recipientName: "", recipientId: "", recipientEmail: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setForwardData(prev => ({ ...prev, [field]: value }));
  };
const downloadPDF = async () => {
  setIsDownloading(true);
  try {
    // Create PDF directly without html2canvas issues
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Add background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Add NetcheQ header
    pdf.setFontSize(20);
    pdf.setTextColor(0, 149, 253); // Blue color
    pdf.text('NETCHEQ', 20, 25);
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Digital Financial Instrument', 20, 32);
    
    // Add cheque details
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    
    // Left column
    pdf.text(`Payee: ${mockChequeDetails.payee}`, 20, 50);
    pdf.text(`Issuer: ${mockChequeDetails.issuer}`, 20, 60);
    pdf.text(`Bank: ${mockChequeDetails.issuerBank}`, 20, 70);
    
    // Right column  
    pdf.text(`Amount: $${mockChequeDetails.amount.toLocaleString()}`, 110, 50);
    pdf.text(`Status: ${mockChequeDetails.status}`, 110, 60);
    pdf.text(`NetcheQ ID: ${mockChequeDetails.netcheqId}`, 110, 70);
    
    // Amount in words
    pdf.text('Amount in Words:', 20, 85);
    pdf.text(mockChequeDetails.amountInWords, 20, 92);
    
    // Dates
    pdf.text(`Issue Date: ${new Date(mockChequeDetails.issueDate).toLocaleDateString()}`, 20, 105);
    pdf.text(`Received Date: ${new Date(mockChequeDetails.receivedDate).toLocaleDateString()}`, 110, 105);
    
    // Memo
    pdf.text('Memo/Purpose:', 20, 120);
    pdf.text(mockChequeDetails.purpose, 20, 127);
    
    // Add QR code if available
    if (qrCodeDataUrl) {
      pdf.addImage(qrCodeDataUrl, 'PNG', 140, 40, 40, 40);
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Scan QR to verify authenticity', 140, 85);
    }
    
    // Security footer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('Secured by NetcheQ • This document is digitally verified', 20, pageHeight - 10);
    
    // Download the PDF
    pdf.save(`NetcheQ-Cheque-${mockChequeDetails.netcheqId}.pdf`);
    
    alert('✅ PDF downloaded successfully! You can now present this to your bank.');
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('❌ Failed to generate PDF. Please try again.');
  }
  setIsDownloading(false);
};
  return (
    <div className="p-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.back()}
            className="border-[#0095fd] text-[#0095fd] hover:bg-[#e6f4ff]"
          >
            ← Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Received Cheque</h1>
            <p className="text-slate-600">Review and process the received cheque</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Professional Cheque Design - with ref for PDF capture */}
        <div ref={chequeRef}>
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardContent className="p-8">
              {/* Cheque Header */}
              <div className="flex justify-between items-start border-b-2 border-blue-200 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-800">NETCHEQ</h2>
                  <p className="text-sm text-slate-500">Digital Financial Instrument</p>
                </div>
                <div className="text-right">
                  <p className="text-md font-mono font-bold">{mockChequeDetails.netcheqId}</p>
                  <p className="text-xs text-slate-500 uppercase">Transaction ID</p>
                </div>
              </div>

              {/* Cheque Body - Organized Grid Layout */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Payee</label>
                    <p className="font-semibold text-lg border-b border-slate-200 pb-1">{mockChequeDetails.payee}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Issuer</label>
                    <p className="font-semibold border-b border-slate-200 pb-1">{mockChequeDetails.issuer}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Issuing Bank</label>
                    <p className="font-semibold border-b border-slate-200 pb-1">{mockChequeDetails.issuerBank}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Amount</label>
                    <p className="text-2xl font-bold text-green-700 border-b border-slate-200 pb-1">
                      ${mockChequeDetails.amount.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Amount in Words</label>
                    <p className="text-sm italic border-b border-slate-200 pb-1">{mockChequeDetails.amountInWords}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Status</label>
                    <p className="font-semibold text-amber-600 border-b border-slate-200 pb-1">{mockChequeDetails.status}</p>
                  </div>
                </div>
              </div>

              {/* Dates Section */}
              <div className="grid grid-cols-2 gap-6 border-t border-slate-200 pt-4 mb-6">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Issue Date</label>
                  <p className="font-mono">{new Date(mockChequeDetails.issueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Received Date</label>
                  <p className="font-mono">{new Date(mockChequeDetails.receivedDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Memo Section */}
              <div className="border-t border-slate-200 pt-4 mb-6">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Memo/Purpose</label>
                <p className="text-sm bg-slate-50 p-3 rounded border border-slate-200 mt-1">
                  {mockChequeDetails.purpose}
                </p>
              </div>

              {/* QR Code & Security Section */}
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-xs text-slate-500">
                    This digital cheque is secured with QR code technology. 
                    Scan to verify authenticity and prevent fraud.
                  </p>
                </div>
                {qrCodeDataUrl && (
                  <div className="border-2 border-blue-200 p-2 bg-white rounded">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={qrCodeDataUrl} 
                      alt="Security QR Code" 
                      width={80}
                      height={80}
                      className="w-20 h-20"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button 
            className="bg-[#0095fd] hover:bg-[#0085e0]"
            onClick={openRedeemModal}
          >
            Redeem
          </Button>
          <Button 
            variant="outline" 
            className="border-[#0095fd] text-[#0095fd] hover:bg-[#e6f4ff]"
            onClick={openForwardModal}
          >
            Forward
          </Button>
          <Button 
            variant="outline" 
            className="border-[#0095fd] text-[#0095fd] hover:bg-[#e6f4ff]"
            onClick={downloadPDF}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0095fd]"></div>
                Generating PDF...
              </div>
            ) : (
              "Download PDF"
            )}
          </Button>
        </div>

        {/* Redeem Modal */}
        {isRedeemModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-96">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Redeem Cheque</h3>
                  <button onClick={() => {
                    setIsRedeemModalOpen(false);
                    setRedeemStep('bank');
                    setSelectedBank(null);
                    setSelectedAccount(null);
                  }} className="text-slate-500 hover:text-slate-700">
                    ✕
                  </button>
                </div>

                {redeemStep === 'bank' && (
                  <>
                    <p className="text-slate-600 mb-4">Select your bank:</p>
                    <div className="space-y-2">
                      {userBanks.map((bank) => (
                        <Button
                          key={bank.id}
                          className="w-full justify-start"
                          variant={selectedBank?.id === bank.id ? "default" : "outline"}
                          onClick={() => {
                            setSelectedBank(bank);
                            setRedeemStep('account');
                          }}
                        >
                          🏦 {bank.name}
                        </Button>
                      ))}
                    </div>
                  </>
                )}

                {redeemStep === 'account' && selectedBank && (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setRedeemStep('bank')} className="text-[#0095fd]">
                        ← Back
                      </button>
                      <p className="text-slate-600">Select account at {selectedBank.name}:</p>
                    </div>
                    <div className="space-y-2">
                      {selectedBank.accounts.map((account) => (
                        <Button
                          key={account.id}
                          className="w-full justify-start"
                          variant={selectedAccount?.id === account.id ? "default" : "outline"}
                          onClick={() => setSelectedAccount(account)}
                        >
                          💳 {account.name} ({account.number})
                        </Button>
                      ))}
                    </div>
                    {selectedAccount && (
                      <Button 
                        className="w-full mt-4 bg-[#0095fd] hover:bg-[#0085e0]"
                        onClick={() => setRedeemStep('confirm')}
                      >
                        Continue to Confirm
                      </Button>
                    )}
                  </>
                )}

                {redeemStep === 'confirm' && selectedBank && selectedAccount && (
                  <>
                    <p className="text-slate-600 mb-4">Confirm redemption details:</p>
                    <div className="bg-slate-50 p-4 rounded-lg mb-4">
                      <p><strong>Amount:</strong> ${mockChequeDetails.amount.toLocaleString()}</p>
                      <p><strong>Bank:</strong> {selectedBank.name}</p>
                      <p><strong>Account:</strong> {selectedAccount.name} ({selectedAccount.number})</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setRedeemStep('account')}>
                        ← Back
                      </Button>
                      <Button 
                        className="flex-1 bg-[#0095fd] hover:bg-[#0085e0]"
                        onClick={handleRedeemConfirmation}
                      >
                        ✅ Confirm Redeem
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Forward Modal */}
        {isForwardModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-96">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Forward Cheque</h3>
                  <button onClick={() => setIsForwardModalOpen(false)} className="text-slate-500 hover:text-slate-700">
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">
                      Recipient Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="recipientName"
                      placeholder="Enter recipient's full name"
                      value={forwardData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      disabled={isForwarding}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientId">
                      ID Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="recipientId"
                      placeholder="e.g., National ID, Passport, Driver's License"
                      value={forwardData.recipientId}
                      onChange={(e) => handleInputChange('recipientId', e.target.value)}
                      disabled={isForwarding}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientEmail">Email (Optional)</Label>
                    <Input
                      id="recipientEmail"
                      type="email"
                      placeholder="recipient@example.com"
                      value={forwardData.recipientEmail}
                      onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                      disabled={isForwarding}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      onClick={() => setIsForwardModalOpen(false)}
                      disabled={isForwarding}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-[#0095fd] hover:bg-[#0085e0]"
                      onClick={handleForward}
                      disabled={isForwarding}
                    >
                      {isForwarding ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Forwarding...
                        </div>
                      ) : (
                        "Confirm Forward"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}