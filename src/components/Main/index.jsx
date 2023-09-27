import { useState } from "react";
import { Box, useMediaQuery, Stepper, Step, StepLabel } from "@mui/material";
import PersonalDetailForm from "../personalDetailsForm";

const steps = [
  "Personal Details",
  "Employment Status",
  "Goal Setting",
  "Net Worth",
  "Loans",
];

function Main() {
  const isMobile = useMediaQuery("(max-width: 701px)");
  const [step, setStep] = useState(0);

  const onNext = () => {
    setStep((step) => {
      if (step < 4) {
        return step + 1;
      }
      return step;
    });
  };

  const onBack = () => {
    setStep((step) => {
      if (step > 1) {
        return step - 1;
      }
      return step;
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          m: 3,
          p: 3,
          background: "#292829",
        }}
      >
        {" "}
        {!isMobile && (
          <Stepper activeStep={step} alternativeLabel sx={{ mb: 5 }}>
            {steps.map((label, index) => (
              <Step
                key={label}
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "#ffb942", // circle color (COMPLETED)
                  },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "grey.500", // Just text label (COMPLETED)
                    },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "#ffb942", // circle color (ACTIVE)
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: "common.white", // Just text label (ACTIVE)
                    },
                  "& .MuiStepLabel-label": {
                    color: "common.white", // Just text label (ACTIVE)
                  },
                  "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                    fill: "black", // circle's number (ACTIVE)
                  },
                }}
              >
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "white", // circle color (ACTIVE)
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
        <PersonalDetailForm onNext={onNext} onBack={onBack} />
      </Box>
    </Box>
  );
}

export default Main;
