
import { useState } from "react";
import { Calendar, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { users, medicines } from "@/data/db";

const Profile = () => {
  const [user, setUser] = useState(users[0]); // In a real app, this would come from authentication
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: "555-123-4567", // Sample data
    address: "123 Main St, City, Country", // Sample data
  });
  
  const [medicalHistory, setMedicalHistory] = useState({
    conditions: user.medicalHistory.join(", "),
    allergies: "None", // Sample data
    medications: "None", // Sample data
  });
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile in the database
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleMedicalHistorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the medical history in the database
    toast({
      title: "Medical History Updated",
      description: "Your medical history has been updated successfully.",
    });
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-medium">
                        Default Delivery Address
                      </label>
                      <Input
                        id="address"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders and their status.</CardDescription>
              </CardHeader>
              <CardContent>
                {user.orders.length === 0 ? (
                  <div className="text-center py-10">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-1">No orders yet</h3>
                    <p className="text-gray-600">When you place orders, they will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Calendar className="mr-1 h-4 w-4" />
                              {order.date}
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium mb-2">Items:</h4>
                          <ul className="space-y-2">
                            {order.items.map((item, index) => {
                              const medicine = medicines.find(m => m.id === item.medicineId);
                              return medicine ? (
                                <li key={index} className="flex justify-between text-sm">
                                  <span>{medicine.name} ({item.quantity}x)</span>
                                  <span>${(medicine.price * item.quantity).toFixed(2)}</span>
                                </li>
                              ) : null;
                            })}
                          </ul>
                          
                          <div className="flex justify-between font-medium mt-4 pt-4 border-t border-gray-200">
                            <span>Total</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
                <CardDescription>Update your medical information for better recommendations.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMedicalHistorySubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="conditions" className="text-sm font-medium">
                        Medical Conditions
                      </label>
                      <Textarea
                        id="conditions"
                        value={medicalHistory.conditions}
                        onChange={(e) => setMedicalHistory({ ...medicalHistory, conditions: e.target.value })}
                        placeholder="List any chronic conditions, separated by commas"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="allergies" className="text-sm font-medium">
                        Allergies
                      </label>
                      <Textarea
                        id="allergies"
                        value={medicalHistory.allergies}
                        onChange={(e) => setMedicalHistory({ ...medicalHistory, allergies: e.target.value })}
                        placeholder="List any allergies, separated by commas"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="medications" className="text-sm font-medium">
                        Current Medications
                      </label>
                      <Textarea
                        id="medications"
                        value={medicalHistory.medications}
                        onChange={(e) => setMedicalHistory({ ...medicalHistory, medications: e.target.value })}
                        placeholder="List any medications you're currently taking"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Medical History</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
