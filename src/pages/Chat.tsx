
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/layout/Layout";
import { getChatbotResponse } from "@/data/db";

type Message = {
  id: string;
  text: string;
  sender: "user" | "doctor";
  timestamp: number;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Dr. Bot, your virtual health assistant. How can I help you today?",
      sender: "doctor",
      timestamp: Date.now(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: newMessage,
      sender: "user",
      timestamp: Date.now(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate doctor typing
    setIsTyping(true);
    
    // Get response after a short delay to simulate thinking
    setTimeout(() => {
      const botResponse = getChatbotResponse(newMessage);
      
      const doctorMessage: Message = {
        id: `doctor-${Date.now()}`,
        text: botResponse,
        sender: "doctor",
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, doctorMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4 bg-medical-50">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="/placeholder.svg" alt="Dr. Bot" />
                <AvatarFallback className="bg-medical-600 text-white">DB</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">Dr. Bot</h2>
                <p className="text-sm text-gray-600">AI Health Assistant</p>
              </div>
            </div>
          </div>
          
          <div className="h-[60vh] overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-medical-600 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-medical-100" : "text-gray-500"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-lg p-3 bg-white border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your symptoms or questions..."
                className="flex-grow"
              />
              <Button type="submit" className="bg-medical-600 hover:bg-medical-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-6 bg-medical-50 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">Important Note</h3>
          <p className="text-sm text-gray-600">
            This chat is powered by an AI assistant and is not a substitute for professional medical advice, 
            diagnosis, or treatment. Always seek the advice of your physician or other qualified health 
            provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
