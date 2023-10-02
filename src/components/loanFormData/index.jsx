import React, { useEffect, useState } from "react";
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

const LoanForm = ({ onNext, saveFormData, onBack }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const formik = useFormik({
    initialValues: {
      hasLongTermLoans: "No",
      remainingLoan: "",
      remainingRenovationLoan: "",
      remainingVehicleLoan: "",
      remainingStudyLoan: "",
      hasShortTermLoan: "No",
      remainingCreditCardsLoan: "",
      remainingPersonalDebitLoan: "",
      incomeTaxLastYear: "",
    },
    validationSchema: Yup.object({
      hasLongTermLoans: Yup.string().required("This field is required"),
      remainingLoan: Yup.number()
        .when("hasLongTermLoans", {
          is: "Yes",
          then: () => Yup.number().required("This field is required"),
        })
        .nullable(),
      remainingRenovationLoan: Yup.number()
        .when("hasLongTermLoans", {
          is: "Yes",
          then: () => Yup.number().required("This field is required"),
        })
        .nullable(),
      remainingVehicleLoan: Yup.number()
        .when("hasLongTermLoans", {
          is: "Yes",
          then: () => Yup.number().required("This field is required"),
        })
        .nullable(),
      remainingStudyLoan: Yup.number()
        .when("hasLongTermLoans", {
          is: "Yes",
          then: () => Yup.number().required("This field is required"),
        })
        .nullable(),
      hasShortTermLoan: Yup.string().required("This field is required"),
      remainingCreditCardsLoan: Yup.number()
        .when("hasShortTermLoan", {
          is: "Yes",
          then: () => Yup.number().required("This field is required"),
        })
        .nullable(),
      remainingPersonalDebitLoan: Yup.number()
        .when("hasShortTermLoan", {
          is: "Yes",
          then: () => Yup.number().required("This field is required"),
        })
        .nullable(),
      incomeTaxLastYear: Yup.number().nullable(),
    }),
    onSubmit: (values) => {
      console.log("Loan Form Values", values);
      // saveFormData(values);
      onNext();
    },
  });

  useEffect(() => {
    const formDataFromCookies = Cookies.get("loanFormData");
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      formik.setValues(parsedData);
    }
  }, []);

  const handleFieldChange = async (fieldName, value) => {
    const updatedValues = { ...formik.values, [fieldName]: value };
    await formik.setValues(updatedValues);

    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    });

    setTimeout(() => {
      Cookies.set("loanFormData", JSON.stringify(updatedValues), {
        expires: 7,
      });
    }, 100);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" sx={{ color: "#ffb942" }}>
        Loan Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            required
            error={
              formik.touched.hasLongTermLoans &&
              Boolean(formik.errors.hasLongTermLoans)
            }
          >
            <CustomInputLabel>Any long term loans?</CustomInputLabel>
            <CustomSelect
              name="hasLongTermLoans"
              label="Any long term loans?"
              value={formik.values.hasLongTermLoans}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("hasLongTermLoans", e.target.value);
              }}
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingLoan"
            label="Remaining Loan"
            value={formik.values.remainingLoan}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("remainingLoan", e.target.value);
            }}
            error={
              formik.touched.remainingLoan &&
              Boolean(formik.errors.remainingLoan)
            }
            helperText={
              formik.touched.remainingLoan && formik.errors.remainingLoan
            }
            required={formik.values.hasLongTermLoans === "Yes"}
            InputProps={{
              style: { color: "#ffb942" },
            }}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingRenovationLoan"
            label="Remaining Renovation Loan"
            value={formik.values.remainingRenovationLoan}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("remainingRenovationLoan", e.target.value);
            }}
            error={
              formik.touched.remainingRenovationLoan &&
              Boolean(formik.errors.remainingRenovationLoan)
            }
            helperText={
              formik.touched.remainingRenovationLoan &&
              formik.errors.remainingRenovationLoan
            }
            required={formik.values.hasLongTermLoans === "Yes"}
            InputProps={{
              style: { color: "#ffb942" },
            }}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingVehicleLoan"
            label="Remaining Vehicle Loan"
            value={formik.values.remainingVehicleLoan}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("remainingVehicleLoan", e.target.value);
            }}
            error={
              formik.touched.remainingVehicleLoan &&
              Boolean(formik.errors.remainingVehicleLoan)
            }
            helperText={
              formik.touched.remainingVehicleLoan &&
              formik.errors.remainingVehicleLoan
            }
            required={formik.values.hasLongTermLoans === "Yes"}
            InputProps={{
              style: { color: "#ffb942" },
            }}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingStudyLoan"
            label="Remaining Study Loan"
            value={formik.values.remainingStudyLoan}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("remainingStudyLoan", e.target.value);
            }}
            error={
              formik.touched.remainingStudyLoan &&
              Boolean(formik.errors.remainingStudyLoan)
            }
            helperText={
              formik.touched.remainingStudyLoan &&
              formik.errors.remainingStudyLoan
            }
            required={formik.values.hasLongTermLoans === "Yes"}
            InputProps={{
              style: { color: "#ffb942" },
            }}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            required
            error={
              formik.touched.hasShortTermLoan &&
              Boolean(formik.errors.hasShortTermLoan)
            }
          >
            <CustomInputLabel>Any short term loan?</CustomInputLabel>
            <CustomSelect
              name="hasShortTermLoan"
              label="Any short term loan?"
              value={formik.values.hasShortTermLoan}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("hasShortTermLoan", e.target.value);
              }}
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingCreditCardsLoan"
            label="Remaining Credit Cards Loan"
            value={formik.values.remainingCreditCardsLoan}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("remainingCreditCardsLoan", e.target.value);
            }}
            error={
              formik.touched.remainingCreditCardsLoan &&
              Boolean(formik.errors.remainingCreditCardsLoan)
            }
            helperText={
              formik.touched.remainingCreditCardsLoan &&
              formik.errors.remainingCreditCardsLoan
            }
            required={formik.values.hasShortTermLoan === "Yes"}
            InputProps={{
              style: { color: "#ffb942" },
            }}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingPersonalDebitLoan"
            label="Remaining Personal Debit Loan"
            value={formik.values.remainingPersonalDebitLoan}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("remainingPersonalDebitLoan", e.target.value);
            }}
            error={
              formik.touched.remainingPersonalDebitLoan &&
              Boolean(formik.errors.remainingPersonalDebitLoan)
            }
            helperText={
              formik.touched.remainingPersonalDebitLoan &&
              formik.errors.remainingPersonalDebitLoan
            }
            required={formik.values.hasShortTermLoan === "Yes"}
            InputProps={{
              style: { color: "#ffb942" },
            }}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="incomeTaxLastYear"
            label="Income Tax Last Year"
            value={formik.values.incomeTaxLastYear}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("incomeTaxLastYear", e.target.value);
            }}
            error={
              formik.touched.incomeTaxLastYear &&
              Boolean(formik.errors.incomeTaxLastYear)
            }
            helperText={
              formik.touched.incomeTaxLastYear &&
              formik.errors.incomeTaxLastYear
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
            type="number"
          />
        </Grid>
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
          // disabled={!isFormValid}
          variant="contained"
          sx={{
            mt: 3.5,
            backgroundColor: "#ffb942",
            "&:hover": {
              backgroundColor: "#ffcc00",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </form>
  );
};

export default LoanForm;
// Annual Salary (text field only numbers and optional), Annual Bonus (text field only numbers and optional), Investment Income Annual (text field only numbers and optional), Rental Income Annual (text field only numbers and optional), Other Income Annual (text field only numbers and optional),
