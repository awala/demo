import React, { useState } from 'react';
import { ArrowLeft, Paperclip, Send } from 'lucide-react';
import { cn, formatTimestamp } from '../lib/utils';

// Mock data for demo
const mockTicket = {
  ticketId: "TKT-001",
  orderId: "ORD-12345",
  receiptNumber: "RCP-789",
  customer: {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 555-0123"
  },
  createdAt: "2025-03-20T14:30:00Z",
  description: "I received my order but the color of the sweater doesn't match what was shown on the website. I'd like to return it for a refund.",
  attachments: ["receipt.pdf", "product_photo.jpg"]
};

const mockEmailDraft = {
  to: mockTicket.customer.email,
  subject: `Re: Order #${mockTicket.orderId} - Return Request`,
  body: `Dear ${mockTicket.customer.name},

Thank you for bringing this to our attention. I understand that the sweater color doesn't match your expectations.

I've reviewed your return request and I'm happy to help process this for you. I've attached a prepaid return label for your convenience.

Once we receive the item back, we'll process your refund within 2-3 business days.

Please let me know if you have any questions.

Best regards,
Customer Support Team`
};

const HumanTicketsPage: React.FC = () => {
  const [emailDraft, setEmailDraft] = useState(mockEmailDraft);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);
    alert('Email sent successfully!');
  };

  return (
    <div className="flex h-full">
      {/* Left column - Ticket details */}
      <div className="w-1/2 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Ticket #{mockTicket.ticketId}
            </h2>
            <p className="text-sm text-gray-500">
              Created {formatTimestamp(mockTicket.createdAt)}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Order Details</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm mb-1">Order ID: {mockTicket.orderId}</p>
                <p className="text-sm">Receipt: {mockTicket.receiptNumber}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Customer Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm mb-1">{mockTicket.customer.name}</p>
                <p className="text-sm mb-1">{mockTicket.customer.email}</p>
                <p className="text-sm">{mockTicket.customer.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm">{mockTicket.description}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Attachments</h3>
              <div className="space-y-2">
                {mockTicket.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <Paperclip className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{attachment}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column - Email draft */}
      <div className="w-1/2 bg-white overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Draft Response
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="email"
                value={emailDraft.to}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={emailDraft.subject}
                onChange={(e) => setEmailDraft(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={emailDraft.body}
                onChange={(e) => setEmailDraft(prev => ({ ...prev, body: e.target.value }))}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Save Draft
              </button>
              <button
                onClick={handleSend}
                disabled={isSending}
                className={cn(
                  "px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center gap-2",
                  isSending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700"
                )}
              >
                <Send className="w-4 h-4" />
                {isSending ? "Sending..." : "Send Response"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanTicketsPage