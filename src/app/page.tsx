"use client"

import axiosInstance from "@/utils/axios";
import { useEffect } from "react";

const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/events');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default function Home() {

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div >
      {process.env.NEXT_APP_API_URL}
    </div>
  )
}
