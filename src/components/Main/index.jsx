import { useState, useEffect } from "react";
import { Box, useMediaQuery, Stepper, Step, StepLabel } from "@mui/material";
import Cookies from "js-cookie"; // Import js-cookie
import PersonalDetailForm from "../personalDetailsForm";
import EmploymentStatusForm from "../EmploymentStatusForm";
import NetWorthForm from "../netWorthForm";
import LoanForm from "../loanFormData";
import CentralProvidentFundsForm from "../centralProvidentFundsForm";
import CashFlowStatementForm from "../cashFlowStatementForm";
import RetirementForm from "../retirement";

const steps = [
  "Personal Details",
  "Employment Status",
  "Goal Setting",
  "Net Worth",
  "Loans",
  "Central Provident Funds",
  "Cashflow Statement",
  "Insurance Policies",
  "Dependents",
  "Retirement",
];

function Main() {
  const isMobile = useMediaQuery("(max-width: 701px)");
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Cookies.remove("stepCount");
    const formDataFromCookies = Cookies.get("stepCount"); // Get the saved form data
    console.log("786 formDataFromCookies", formDataFromCookies);
    if (formDataFromCookies) {
      // const parsedData = JSON.parse(formDataFromCookies);
      // console.log("786 stepcount",parsedData);
      setStep(parseInt(formDataFromCookies));
      // formik.setValues(parsedData); // Set the formik values from the cookie data
    }
    console.log("786 step change", step);
  }, []);

  const onNext = () => {
    setStep((step) => {
      // if (step < 5) {
      setTimeout(() => {
        Cookies.set("stepCount", step + 1, {
          expires: 7,
        }); // Save the form data to cookies as JSON
      }, 100);
      return step + 1;
      // }
      // setTimeout(() => {
      //   Cookies.set("stepCount", step, {
      //     expires: 7,
      //   }); // Save the form data to cookies as JSON
      // }, 100);
      return step;
    });
  };

  const onBack = () => {
    setStep((step) => {
      if (step >= 1) {
        setTimeout(() => {
          Cookies.set("stepCount", step - 1, {
            expires: 7,
          }); // Save the form data to cookies as JSON
        }, 100);
        return step - 1;
      }
      setTimeout(() => {
        Cookies.set("stepCount", step, {
          expires: 7,
        }); // Save the form data to cookies as JSON
      }, 100);
      return step;
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
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
        {step === 0 && <PersonalDetailForm onNext={onNext} onBack={onBack} />}
        {step === 1 && <EmploymentStatusForm onNext={onNext} onBack={onBack} />}
        {step === 2 && <NetWorthForm onNext={onNext} onBack={onBack} />}
        {step === 3 && <LoanForm onNext={onNext} onBack={onBack} />}
        {step === 4 && (
          <CentralProvidentFundsForm onNext={onNext} onBack={onBack} />
        )}
        {step === 5 && (
          <CashFlowStatementForm onNext={onNext} onBack={onBack} />
        )}
        {step === 6 && <RetirementForm onNext={onNext} onBack={onBack} />}
      </Box>
    </Box>
  );
}

export default Main;
