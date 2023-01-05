import { Chart } from "react-google-charts";
import { GameStateContext } from "../helpers/Contexts";
import { useContext } from "react";
import { Questions } from "../helpers/Questions";



const Charts = () => {
    const { score, setScore, setGameState, userName } = useContext(
        GameStateContext
      );
      setGameState("finished");
      let value =score;
      const data = [
        ["Task", "Hours per Day"],
        ["Correct", value*100/10],
        ["Wrong",100-(value*100/10)]
      ];
    const options = {
        title: "Toatal Score You Scored",
      };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}
export default Charts