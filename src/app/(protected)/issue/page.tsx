'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function IssuePage() {
  const [payeeEmail, setPayeeEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!payeeEmail || !amount) {
      alert("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call and processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success message and redirect
    alert('✅ Cheque issued successfully!\n\n' +
          `To: ${payeeEmail}\n` +
          `Amount: $${amount}\n` +
          `Memo: ${memo || 'None'}`);
    
    router.push('/dashboard');
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Issue a New Cheque</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="payee">
            Payee Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="payee"
            type="email"
            placeholder="recipient@example.com"
            value={payeeEmail}
            onChange={(e) => setPayeeEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="memo">Memo (Optional)</Label>
          <Textarea
            id="memo"
            placeholder="What is this cheque for? e.g., 'Website design services'"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            disabled={loading}
            rows={3}
          />
        </div>

        <div className="flex gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </div>
            ) : (
              "Issue Cheque"
            )}
          </Button>
        </div>

        {/* Demo note for investors */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Demo Feature:</strong> This simulates cheque issuance. 
            In production, this would securely process digital cheques with 
            bank-grade encryption and real-time validation.
          </p>
        </div>
      </form>
    </div>
  );
}