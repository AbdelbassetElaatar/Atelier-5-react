import React, { useEffect, useState } from "react";
import MealItem from "./Mealitem";

const rawBackend = import.meta.env.VITE_BACKEND_URL;
const BACKEND_URL =
  rawBackend && /^https?:\/\//i.test(rawBackend) ? rawBackend : "/api";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BACKEND_URL}/meals`);
        if (!response.ok) throw new Error("Failed to fetch meals");

        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (isLoading)
    return (
      <p className="text-center text-lg font-semibold">Loading meals...</p>
    );
  if (error)
    return <p className="text-center text-red-600 font-semibold">{error}</p>;

  const displayMeals = () => {
    if (meals.length > 0) {
      return meals.map((meal) => <MealItem key={meal.id} meal={meal} />);
    } else {
      return <div>No items</div>;
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our Delicious Meals
      </h2>
      <ul className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {displayMeals()}
      </ul>
    </section>
  );
}

export default Meals;
