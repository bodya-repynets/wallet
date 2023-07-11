"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";
import { useSelector } from "react-redux";

const PieChart = () => {
  const { categories } = useSelector((store) => store.categories);
  return (
    <>
      {categories && (
        <Pie
          data={{
            labels: categories.names,
            datasets: [
              {
                label: "Money wasted",
                data: categories.sums,
                backgroundColor: [
                  "red",
                  "green",
                  "blue",
                  "yellow",
                  "purple",
                  "orange",
                ],
                borderColor: "black",
                borderWidth: 2,
              },
            ],
          }}
        />
      )}
    </>
  );
};
export default PieChart;
