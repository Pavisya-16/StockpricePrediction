// src/components/Chart/MetricCard.jsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const MetricCard = ({ label, value, icon: Icon }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
              {label}
            </p>
            <p className="text-2xl font-bold group-hover:text-blue-700 transition-colors">
              {value}
            </p>
          </div>
          {Icon && (
            <div className="relative">
              <div className="absolute -inset-2 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Icon className="h-8 w-8 text-blue-600 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;