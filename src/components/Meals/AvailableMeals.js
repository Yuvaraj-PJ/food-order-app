import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MeaIItem";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";

const AvaiableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error: hasError, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const trasformData = (dataobj) => {
      const loadMeals = [];
      for (const key in dataobj) {
        loadMeals.push({
          id: key,
          ...dataobj[key],
        });
      }
      setMeals(loadMeals);
    };
    // meals.push(meals)
    fetchMeals(
      {
        url: "https://react-http-95190-default-rtdb.firebaseio.com/meals.json",
      },
      trasformData
    );
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  let content = <p className="align-text">Meals not found</p>;
  if (isLoading) {
    content = <p className="align-text">Loading.....</p>;
  }
  if (hasError) {
    content = <p className="align-text">{hasError} </p>;
  }
  if (meals.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvaiableMeals;
