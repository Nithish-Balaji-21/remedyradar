
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";
import { getAllSymptoms, getMedicinesBySymptomId } from "@/data/db";
import { useCart, Medicine } from "@/hooks/use-cart";

const Symptoms = () => {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [recommendedMedicines, setRecommendedMedicines] = useState<Medicine[]>([]);
  const [hasCheckedSymptoms, setHasCheckedSymptoms] = useState(false);
  const { addItem } = useCart();
  
  const symptoms = getAllSymptoms();
  
  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomId)) {
        return prev.filter(id => id !== symptomId);
      } else {
        return [...prev, symptomId];
      }
    });
  };
  
  const handleCheckSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      return;
    }
    
    const allRecommendedMedicines: Medicine[] = [];
    
    selectedSymptoms.forEach(symptomId => {
      const medicines = getMedicinesBySymptomId(symptomId);
      medicines.forEach(medicine => {
        if (!allRecommendedMedicines.some(m => m.id === medicine.id)) {
          allRecommendedMedicines.push(medicine);
        }
      });
    });
    
    setRecommendedMedicines(allRecommendedMedicines);
    setHasCheckedSymptoms(true);
  };
  
  const handleClearSelection = () => {
    setSelectedSymptoms([]);
    setRecommendedMedicines([]);
    setHasCheckedSymptoms(false);
  };
  
  const handleAddToCart = (medicine: Medicine) => {
    addItem(medicine);
  };
  
  const handleViewCart = () => {
    navigate("/cart");
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Symptom Checker</h1>
          <p className="text-gray-600">
            Select your symptoms below to get personalized medicine recommendations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Symptoms</CardTitle>
                <CardDescription>Check all that apply</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {symptoms.map(symptom => (
                    <div key={symptom.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                      <Checkbox 
                        id={symptom.id} 
                        checked={selectedSymptoms.includes(symptom.id)}
                        onCheckedChange={() => handleSymptomToggle(symptom.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={symptom.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {symptom.name}
                        </label>
                        <p className="text-sm text-muted-foreground">
                          {symptom.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleClearSelection}>
                  Clear
                </Button>
                <Button onClick={handleCheckSymptoms}>
                  Check Symptoms
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Medicines</CardTitle>
                <CardDescription>
                  {hasCheckedSymptoms 
                    ? `Based on your symptoms, we recommend the following medicines.` 
                    : `Select your symptoms and click "Check Symptoms" to get recommendations.`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!hasCheckedSymptoms && (
                  <div className="text-center py-8 text-gray-500">
                    Your medicine recommendations will appear here
                  </div>
                )}
                
                {hasCheckedSymptoms && recommendedMedicines.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No specific medicines found for your symptoms. Please consult a doctor.
                  </div>
                )}
                
                {recommendedMedicines.length > 0 && (
                  <div className="space-y-4">
                    {recommendedMedicines.map(medicine => (
                      <div 
                        key={medicine.id} 
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                            <img 
                              src={medicine.image} 
                              alt={medicine.name}
                              className="w-12 h-12 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{medicine.name}</h3>
                            <p className="text-sm text-gray-600">{medicine.description}</p>
                            <p className="text-sm text-gray-600">Dosage: {medicine.dosage}</p>
                            <p className="font-medium text-medical-600 mt-1">${medicine.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <Button 
                          className="w-full sm:w-auto" 
                          onClick={() => handleAddToCart(medicine)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              {recommendedMedicines.length > 0 && (
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleViewCart}
                  >
                    View Cart
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Symptoms;
