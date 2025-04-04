
import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { getAllMedicines, getCategories, Medicine } from "@/data/db";
import { useCart } from "@/hooks/use-cart";

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addItem } = useCart();
  
  const medicines = getAllMedicines();
  const categories = getCategories();
  
  const filteredMedicines = searchTerm
    ? medicines.filter(medicine => 
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : medicines;
  
  const handleAddToCart = (medicine: Medicine) => {
    addItem(medicine);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Medicines</h1>
          <p className="text-gray-600">
            Browse our range of over-the-counter medicines.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search medicines..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-500" />
            <span className="text-sm text-gray-600">Filter by:</span>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedicines.map(medicine => (
                <div 
                  key={medicine.id} 
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-shadow hover:shadow-md"
                >
                  <div className="h-40 bg-gray-50 p-4 flex items-center justify-center">
                    <img 
                      src={medicine.image} 
                      alt={medicine.name}
                      className="h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1">{medicine.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>
                    <p className="text-sm text-gray-600 mb-4">Dosage: {medicine.dosage}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-medical-600">${medicine.price.toFixed(2)}</span>
                      <Button onClick={() => handleAddToCart(medicine)}>Add to Cart</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredMedicines.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No medicines found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMedicines
                  .filter(medicine => medicine.category === category)
                  .map(medicine => (
                    <div 
                      key={medicine.id} 
                      className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-shadow hover:shadow-md"
                    >
                      <div className="h-40 bg-gray-50 p-4 flex items-center justify-center">
                        <img 
                          src={medicine.image} 
                          alt={medicine.name}
                          className="h-full object-contain"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg mb-1">{medicine.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>
                        <p className="text-sm text-gray-600 mb-4">Dosage: {medicine.dosage}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-medical-600">${medicine.price.toFixed(2)}</span>
                          <Button onClick={() => handleAddToCart(medicine)}>Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              
              {filteredMedicines.filter(medicine => medicine.category === category).length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">No medicines found in this category matching your search.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Medicines;
