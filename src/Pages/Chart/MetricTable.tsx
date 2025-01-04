// src/components/Chart/MetricTable.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MetricTable = ({ title, metrics }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <tbody>
            {metrics.map(({ label, value }) => (
              <tr key={label} className="border-b">
                <td className="py-2 text-gray-600">{label}</td>
                <td className="py-2 text-right">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default MetricTable;