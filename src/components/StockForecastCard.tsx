import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from 'lucide-react';
import stock3 from '../assets/stocks4.jpg';
import stock2 from '../assets/stock5.jpg';
import stock1 from '../assets/stock2.jpg';

const StockForecastCard = () => {
  return (
    <>
      {/* Elite Investments Section */}
      <div className="flex flex-col items-center px-4 md:px-12 lg:px-24 mt-6">
        <div className="w-full mb-8">
          <p className="text-center text-lg font-normal capitalize text-white bg-gradient-to-r from-black via-blue-500 to-purple-500 p-4 rounded-lg shadow-md">
            Elite Investments
          </p>
        </div>

        {/* Card Section */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {/* Card 1 */}
          <Card className="w-full shadow-lg rounded-lg border border-gray-300 shadow-indigo-600">
            <CardHeader>
              <CardTitle>StockForecast</CardTitle>
              <CardDescription>Get to know about the forecast on stocks.</CardDescription>
              <div className="relative w-full h-[200px] lg:h-[250px]">
                <img src={stock3} className="w-full h-full object-cover" alt="Stock Forecast" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="flex h-3 w-2 translate-y-1 rounded-full bg-sky-500" />
                <p className="text-sm font-medium leading-loose line-clamp-3">
                  StockForecast leverages data analysis and predictive algorithms to provide accurate projections of stock performance, empowering investors with actionable insights.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Check /> Forecast in Hand
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2 */}
          <Card className="w-full shadow-lg rounded-lg border border-gray-300 shadow-indigo-600">
            <CardHeader>
              <CardTitle>Ticker Insight</CardTitle>
              <CardDescription>Explore deep insights into top investments.</CardDescription>
              <div className="relative w-full h-[200px] lg:h-[250px]">
                <img src={stock2} className="w-full h-full object-cover" alt="Ticker Insight" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="flex h-3 w-2 translate-y-1 rounded-full bg-green-500" />
                <p className="text-sm font-medium leading-loose line-clamp-3">
                  Ticker Insight offers in-depth analysis and real-time updates on stock ticker data, helping users make informed trading decisions based on market trends.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Check /> View Insights
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3 */}
          <Card className="w-full shadow-lg rounded-lg border border-gray-300 shadow-indigo-600">
            <CardHeader>
              <CardTitle>Investment Bids</CardTitle>
              <CardDescription>Track market trends to make investments.</CardDescription>
              <div className="relative w-full h-[200px] lg:h-[250px]">
                <img src={stock1} className="w-full h-full object-cover" alt="Investment Bids" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="flex h-3 w-2 translate-y-1 rounded-full bg-yellow-500" />
                <p className="text-sm font-medium leading-loose line-clamp-3">
                  Invest Bid is a platform for dynamic investment opportunities, enabling users to place competitive bids and maximize their returns in a diverse marketplace.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Check /> Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StockForecastCard;
