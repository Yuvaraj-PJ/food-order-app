import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvaiableMeals from "./AvailableMeals";
const Meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvaiableMeals />
    </Fragment>
  );
};
export default Meals;
