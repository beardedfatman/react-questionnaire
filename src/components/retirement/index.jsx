import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {
  CustomInputLabel,
  CustomMenuItem,
  CustomSelect,
  CustomTextField,
} from "../Fields";
import Cookies from "js-cookie";
import axios from "axios";

const RetirementForm = ({ onBack }) => {
  const formik = useFormik({
    initialValues: {
      retirementAge: "",
      monthlyNeed: "",
      // needFinancialAdvisor: "No",
    },
    validationSchema: Yup.object({
      retirementAge: Yup.string().required("Retirement Age is required"),
      monthlyNeed: Yup.string().required("Monthly Need is required"),
      // needFinancialAdvisor: Yup.string().required("Value is required"),
    }),
    onSubmit: (values) => {
      // Save form data to cookies
      Cookies.set("retirementData", JSON.stringify(values), {
        expires: 7,
      });

      submitForm();
    },
  });

  const submitForm = () => {
    const personalData = JSON.parse(Cookies.get("personalFormData"));
    const employmentData = JSON.parse(Cookies.get("employmentStatusFormData"));
    const goalData = JSON.parse(Cookies.get("goalFormData"));
    const newWorthData = JSON.parse(Cookies.get("netWorthFormData"));
    const loansData = JSON.parse(Cookies.get("loanFormData"));
    const centralProvidentFundsData = JSON.parse(
      Cookies.get("centralProvidentFundsFormData")
    );
    const cashFlowData = JSON.parse(Cookies.get("cashFlowStatementFormData"));
    const insuranceData = JSON.parse(Cookies.get("insuranceFormData"));
    const dependentsData = JSON.parse(Cookies.get("dependentsFormData"));
    const retirementData = JSON.parse(Cookies.get("retirementData"));

    console.log(
      "786 data",
      personalData,
      employmentData,
      goalData,
      newWorthData,
      loansData,
      centralProvidentFundsData,
      cashFlowData,
      insuranceData,
      dependentsData,
      retirementData
    );

    let data = {
      personalData: personalData,
      employmentData: employmentData,
      goalData: goalData,
      newWorthData: newWorthData,
      loansData: loansData,
      centralProvidentFundsData: centralProvidentFundsData,
      cashFlowData: cashFlowData,
      insuranceData: insuranceData,
      dependentsData: dependentsData,
      retirementData: retirementData,
    };

    const apiUrl = `${process.env.REACT_APP_API_URL}/add-data`;

    // Make the POST request using Axios
    axios
      .post(apiUrl, data)
      .then((response) => {
        // Handle success
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error making POST request:", error);
      });
  };

  // Load saved form data from cookies
  useEffect(() => {
    const formDataFromCookies = Cookies.get("retirementData");
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      formik.setValues(parsedData);
    }
  }, []);

  const handleFieldChange = async (fieldName, value) => {
    const updatedValues = { ...formik.values, [fieldName]: value };
    await formik.setValues(updatedValues);
    setTimeout(() => {
      Cookies.set("retirementData", JSON.stringify(updatedValues), {
        expires: 7,
      });
    }, 100);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" sx={{ color: "#ffb942", mb: 2.51 }}>
        Retirement Planning
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            name="retirementAge"
            label="Retirement Age"
            type="number"
            value={formik.values.retirementAge}
            onChange={(e) => handleFieldChange("retirementAge", e.target.value)}
            InputProps={{
              style: { color: "#ffb942" },
            }}
            error={
              formik.touched.retirementAge &&
              Boolean(formik.errors.retirementAge)
            }
            helperText={
              formik.touched.retirementAge && formik.errors.retirementAge
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            name="monthlyNeed"
            label="Estimated Monthly Need"
            type="number"
            value={formik.values.monthlyNeed}
            onChange={(e) => handleFieldChange("monthlyNeed", e.target.value)}
            InputProps={{
              style: { color: "#ffb942" },
            }}
            error={
              formik.touched.monthlyNeed && Boolean(formik.errors.monthlyNeed)
            }
            helperText={formik.touched.monthlyNeed && formik.errors.monthlyNeed}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControl fullWidth required>
            <CustomInputLabel>Need Financial Advisor</CustomInputLabel>
            <CustomSelect
              name="needFinancialAdvisor"
              label="Need Financial Advisor"
              value={formik.values.needFinancialAdvisor}
              onChange={(e) =>
                handleFieldChange("needFinancialAdvisor", e.target.value)
              }
              MenuProps={{
                PaperProps: {
                  style: { background: "#292829" },
                },
              }}
            >
              <CustomMenuItem value="Yes">Yes</CustomMenuItem>
              <CustomMenuItem value="No">No</CustomMenuItem>
            </CustomSelect>
          </FormControl>
        </Grid> */}
      </Grid>
      <Box display="flex" justifyContent="center">
        <Button
          onClick={onBack}
          variant="contained"
          sx={{
            mt: 3.5,
            mr: 1,
            backgroundColor: "#ffb942",
            "&:hover": {
              backgroundColor: "#ffcc00",
            },
          }}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3.5,
            backgroundColor: "#ffb942",
            "&:hover": {
              backgroundColor: "#ffcc00",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};
export default RetirementForm;
