
import { Link } from "react-router-dom";
import { ArrowRight, Search, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-600 to-medical-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Feel Better, Faster
              </h1>
              <p className="text-xl mb-8">
                Enter your symptoms, get medicine recommendations, and have them delivered to your door in minutes.
              </p>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-white text-medical-700 hover:bg-gray-100">
                  <Link to="/symptoms">
                    Check Symptoms
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-medical-700">
                  <Link to="/medicines">
                    Browse Medicines
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/placeholder.svg" 
                alt="Healthcare illustration" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-medical-100 rounded-full p-4 inline-flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Describe Your Symptoms</h3>
              <p className="text-gray-600">
                Tell us how you're feeling and we'll help identify what might be causing your symptoms.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-medical-100 rounded-full p-4 inline-flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Medicine Recommendations</h3>
              <p className="text-gray-600">
                We'll suggest the right over-the-counter medicines based on your symptoms.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-medical-100 rounded-full p-4 inline-flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat with Our Doctor Bot</h3>
              <p className="text-gray-600">
                Have questions? Chat with our AI doctor for additional guidance and information.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Medicines Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Medicines</h2>
            <Button asChild variant="outline">
              <Link to="/medicines">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder cards for popular medicines */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div className="h-48 bg-gray-200">
                  <img 
                    src="/placeholder.svg" 
                    alt="Medicine" 
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">Popular Medicine {item}</h3>
                  <p className="text-gray-600 text-sm mb-3">Description of the medicine goes here.</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-medical-600">$9.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-medical-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Not feeling well?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Check your symptoms, get medicine recommendations, and feel better faster.
          </p>
          <Button asChild size="lg" className="bg-white text-medical-700 hover:bg-gray-100">
            <Link to="/symptoms">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
