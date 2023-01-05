import "../App.css";
import { Questions } from "../helpers/Questions";
import { useState } from "react";

import { useContext, useEffect } from "react";
import { GameStateContext } from "../helpers/Contexts";
import { Button, Checkbox, Grid, Pagination, Stack } from "@mui/material";
import Charts from "../helpers/Chart";
import { Timer } from "../helpers/Timer";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [IsTimer, setIsTimer] = useState(false);

  const { score, setScore, gameState, setGameState } =
    useContext(GameStateContext);

  const chooseOption = (option) => {
    setOptionChosen(option);
  };
  useEffect(() => {
      setIsTimer(true);
    setTimeout(() => {
      if (currentQuestion < Questions.length && gameState !="finished")
      setIsTimer(false);
        setCurrentQuestion(currentQuestion + 1);
    }, 60000);
  }, [currentQuestion]);


  const nextQuestion = () => {
    if (Questions[currentQuestion].answer === optionChosen) {
      setScore(score + 1);
    }
    // setCurrentQuestion(currentQuestion + 1);
  };

  const pageNav = (e) => {
    setIsTimer(false);
    setCurrentQuestion(e.target.textContent - 1);
  };

  const navigate = (type) => {
    nextQuestion();
    if (type === "first") {
      setCurrentQuestion(0);
    } else if (type === "last") {
      setCurrentQuestion(Questions?.length - 1);
    } else if (type === "next") {
      setIsTimer(false);
      setCurrentQuestion(currentQuestion + 1);

    } else if (type === "prev" && Questions.length==1) {
      if (currentQuestion) setCurrentQuestion(currentQuestion - 1);
    }
  };
  const finishQuiz = () => {
    if (Questions[currentQuestion].answer === optionChosen) {
      setScore(score + 1);
    }
    setGameState("finished");
  };
  let ans,dis ;
  return Questions.length > currentQuestion ? (

    <>
    {IsTimer && <Timer />}
    <div style={{width:"800px",display:"flex",justifyContent: "flex-start"}}>
    <span className="QuizLabel" >Question {currentQuestion +1} of 10 </span>
    </div>
    <Grid container className="container">
      <Grid item xs={12}>
        
      
        <div className="Quiz">
          <h3>{currentQuestion + 1}. {Questions[currentQuestion]?.question}</h3>
          <div className="questions">
            {Questions[currentQuestion]?.option.map((opt, index) => {
               ans = opt === optionChosen ? true : false;
               if(Questions.length == 1){
                dis=true
               }
               console.log(ans);
              return (
                <button
                  onClick={() => {
                    chooseOption(opt);
                  }}
                  key={`list-option-${index}`}
                  className={
                    opt === optionChosen ? "selected options" : "options"
                  }
                >
                  <Checkbox
                    checked={opt === optionChosen ? true : false}
                  ></Checkbox>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Grid>
      <Grid item xs={12} className="btn-grp">
        <Button variant="outlined" onClick={() => navigate("first")}>
          First
        </Button>
        <Button
          variant="outlined"
          disabled={dis}
          onClick={() => navigate("prev")}
        >
          Prev
        </Button>
        <Button variant="outlined" onClick={() => navigate("next")}>
          Next
        </Button>
        <Button variant="outlined" onClick={() => navigate("last")}>
          Last
        </Button>
      </Grid>
      <Grid item xs={12} className="btn-grp">
        <Stack spacing={2}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            onClick={(e) => {
              pageNav(e);
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} className="btn-grp">
        <Button variant="outlined" onClick={finishQuiz}>
          Quiz
        </Button>
        <Button variant="outlined">Review</Button>
        <Button variant="outlined">Submit</Button>
      </Grid>
    </Grid>
    </>
  ) : (
    <Charts />
  );
}

export default Quiz;
