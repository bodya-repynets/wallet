"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PieChart = () => {
  const { categories } = useSelector((store) => store.categories);
  const chartData = {
    labels: categories.names,
    datasets: [
      {
        label: "Money wasted",
        data: categories.sums,
        backgroundColor: [
          "#7986cb",
          "#d4e157",
          "#1976d2",
          "#c2185b",
          "#673ab7",
          "#3f51b5",
          "#c62828",
          "#f48fb1",
          "#ba68c8",
          "#1a237e",
          "#00bcd4",
          "#009688",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };
  return <>{categories && <Pie data={chartData} options={chartOptions} />}</>;
};
export default PieChart;
