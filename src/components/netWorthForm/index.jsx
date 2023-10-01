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

const NetWorthForm = ({ onNext, saveFormData, onBack }) => {
  const formik = useFormik({
    initialValues: {
      valueOfResidence: "",
      valueOfVehicle: "",
      currentSavings: "",
      valueOfFixedDeposit: "",
      anyInvestments: "No",
      bonds: "",
      unitTrusts: "",
      stocks: "",
      insurancePolicy: "",
      realEstate: "",
      commodities: "",
      equities: "",
      properties: "",
      currentValueOfOrdinaryCPF: "",
      currentValueOfSpecialCPF: "",
      currentValueOfMedisaveCPF: "",
      currentValueOfOtherCPF: "",
      anyLongTermLoans: "No",
      remainingLoan: "",
      remainingRenovationLoan: "",
      remainingVehicleLoan: "",
      remainingStudyLoan: "",
      anyShortTermLoan: "No",
      remainingCreditCardsLoan: "",
      remainingPersonalDebitLoan: "",
    },
    validationSchema: Yup.object({
      valueOfResidence: Yup.number().optional(),
      valueOfVehicle: Yup.number().optional(),
      currentSavings: Yup.number().required("Current Savings is required"),
      valueOfFixedDeposit: Yup.number().optional(),
      anyInvestments: Yup.string().required("Any Investments is required"),
      bonds: Yup.number().optional(),
      unitTrusts: Yup.number().optional(),
      stocks: Yup.number().required("Stocks is required"),
      insurancePolicy: Yup.number().optional(),
      realEstate: Yup.number().optional(),
      commodities: Yup.number().optional(),
      equities: Yup.number().optional(),
      properties: Yup.number().optional(),
      currentValueOfOrdinaryCPF: Yup.number().optional(),
      currentValueOfSpecialCPF: Yup.number().optional(),
      currentValueOfMedisaveCPF: Yup.number().optional(),
      currentValueOfOtherCPF: Yup.number().optional(),
      anyLongTermLoans: Yup.string().required(
        "Any Long Term Loans is required"
      ),
      remainingLoan: Yup.number().optional(),
      remainingRenovationLoan: Yup.number().optional(),
      remainingVehicleLoan: Yup.number().optional(),
      remainingStudyLoan: Yup.number().optional(),
      anyShortTermLoan: Yup.string().required(
        "Any Short Term Loans is required"
      ),
      remainingCreditCardsLoan: Yup.number().optional(),
      remainingPersonalDebitLoan: Yup.number().optional(),
    }),
    onSubmit: (values) => {
      // Save form data to cookies
      console.log("786 submit working 786");
      Cookies.set("netWorthFormData", JSON.stringify(values), { expires: 7 });
      onNext();
    },
  });

  // Load saved form data from cookies
  useEffect(() => {
    const formDataFromCookies = Cookies.get("netWorthFormData");
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      formik.setValues(parsedData);
    }
  }, []);

  // Function to handle field changes and save to cookies
  // const handleFieldChange = (fieldName, value) => {
  //   formik.setFieldValue(fieldName, value);
  //   const updatedValues = { ...formik.values, [fieldName]: value };
  //   Cookies.set("netWorthFormData", JSON.stringify(updatedValues), {
  //     expires: 7,
  //   });
  // };

  const handleFieldChange = async (fieldName, value) => {
    const updatedValues = { ...formik.values, [fieldName]: value };
    await formik.setValues(updatedValues); // Update formik values
    // formik.validateForm().then((errors) => {
    //   setIsFormValid(Object.keys(errors).length === 0);
    // });
    console.log("786 savign", formik.values);

    setTimeout(() => {
      Cookies.set("netWorthFormData", JSON.stringify(updatedValues), {
        expires: 7,
      }); // Save the form data to cookies as JSON
    }, 100);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" sx={{ color: "#ffb942" }}>
        Net Worth Form
      </Typography>
      <Grid container spacing={2}>
        {/* Value of Residence */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="valueOfResidence"
            label="Value of Residence"
            type="number"
            value={formik.values.valueOfResidence}
            onChange={(e) =>
              handleFieldChange("valueOfResidence", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Value of Vehicle */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="valueOfVehicle"
            label="Value of Vehicle"
            type="number"
            value={formik.values.valueOfVehicle}
            onChange={(e) =>
              handleFieldChange("valueOfVehicle", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Current Savings */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentSavings"
            label="Current Savings"
            type="number"
            value={formik.values.currentSavings}
            onChange={(e) =>
              handleFieldChange("currentSavings", e.target.value)
            }
            error={
              formik.touched.currentSavings &&
              Boolean(formik.errors.currentSavings)
            }
            helperText={
              formik.touched.currentSavings && formik.errors.currentSavings
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
            required
          />
        </Grid>

        {/* Value of Fixed Deposit */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="valueOfFixedDeposit"
            label="Value of Fixed Deposit"
            type="number"
            value={formik.values.valueOfFixedDeposit}
            onChange={(e) =>
              handleFieldChange("valueOfFixedDeposit", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Any Investments */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <CustomInputLabel>Any Investments</CustomInputLabel>
            <CustomSelect
              name="anyInvestments"
              label="Any Investments"
              value={formik.values.anyInvestments}
              onChange={(e) =>
                handleFieldChange("anyInvestments", e.target.value)
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
        </Grid>

        {/* Bonds */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="bonds"
            label="Bonds"
            type="number"
            value={formik.values.bonds}
            onChange={(e) => handleFieldChange("bonds", e.target.value)}
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Add similar fields for unitTrusts, stocks, insurancePolicy, and others */}
        {/* ... */}

        {/* Any Long Term Loans */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <CustomInputLabel>Any Long Term Loans</CustomInputLabel>
            <CustomSelect
              name="anyLongTermLoans"
              label="Any Long Term Loans"
              value={formik.values.anyLongTermLoans}
              onChange={(e) =>
                handleFieldChange("anyLongTermLoans", e.target.value)
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
        </Grid>

        {/* Remaining Loan */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingLoan"
            label="Remaining Loan"
            type="number"
            value={formik.values.remainingLoan}
            onChange={(e) => handleFieldChange("remainingLoan", e.target.value)}
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Remaining Renovation Loan */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingRenovationLoan"
            label="Remaining Renovation Loan"
            type="number"
            value={formik.values.remainingRenovationLoan}
            onChange={(e) =>
              handleFieldChange("remainingRenovationLoan", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Remaining Vehicle Loan */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingVehicleLoan"
            label="Remaining Vehicle Loan"
            type="number"
            value={formik.values.remainingVehicleLoan}
            onChange={(e) =>
              handleFieldChange("remainingVehicleLoan", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Remaining Study Loan */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingStudyLoan"
            label="Remaining Study Loan"
            type="number"
            value={formik.values.remainingStudyLoan}
            onChange={(e) =>
              handleFieldChange("remainingStudyLoan", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Any Short Term Loans */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <CustomInputLabel>Any Short Term Loans</CustomInputLabel>
            <CustomSelect
              name="anyShortTermLoan"
              label="Any Short Term Loans"
              value={formik.values.anyShortTermLoan}
              onChange={(e) =>
                handleFieldChange("anyShortTermLoan", e.target.value)
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
        </Grid>

        {/* Remaining Credit Cards Loan */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingCreditCardsLoan"
            label="Remaining Credit Cards Loan"
            type="number"
            value={formik.values.remainingCreditCardsLoan}
            onChange={(e) =>
              handleFieldChange("remainingCreditCardsLoan", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Remaining Personal Debit Loan */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="remainingPersonalDebitLoan"
            label="Remaining Personal Debit Loan"
            type="number"
            value={formik.values.remainingPersonalDebitLoan}
            onChange={(e) =>
              handleFieldChange("remainingPersonalDebitLoan", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="equities"
            label="Equities"
            type="number"
            value={formik.values.equities}
            onChange={(e) => handleFieldChange("equities", e.target.value)}
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* Properties */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="properties"
            label="Properties"
            type="number"
            value={formik.values.properties}
            onChange={(e) => handleFieldChange("properties", e.target.value)}
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* currentValueOfOrdinaryCPF */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfOrdinaryCPF"
            label="Current Value of Ordinary CPF"
            type="number"
            value={formik.values.currentValueOfOrdinaryCPF}
            onChange={(e) =>
              handleFieldChange("currentValueOfOrdinaryCPF", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* currentValueOfSpecialCPF */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfSpecialCPF"
            label="Current Value of Special CPF"
            type="number"
            value={formik.values.currentValueOfSpecialCPF}
            onChange={(e) =>
              handleFieldChange("currentValueOfSpecialCPF", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* currentValueOfMedisaveCPF */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfMedisaveCPF"
            label="Current Value of Medisave CPF"
            type="number"
            value={formik.values.currentValueOfMedisaveCPF}
            onChange={(e) =>
              handleFieldChange("currentValueOfMedisaveCPF", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>

        {/* currentValueOfOtherCPF */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="currentValueOfOtherCPF"
            label="Current Value of Other CPF"
            type="number"
            value={formik.values.currentValueOfOtherCPF}
            onChange={(e) =>
              handleFieldChange("currentValueOfOtherCPF", e.target.value)
            }
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="stocks"
            label="Stocks"
            type="number"
            value={formik.values.stocks}
            onChange={(e) => handleFieldChange("stocks", e.target.value)}
            InputProps={{
              style: { color: "#ffb942" },
            }}
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
          // disabled={!formik.isValid}
          variant="contained"
          sx={{
            mt: 3.5, // Set margin-top
            backgroundColor: "#ffb942", // Set the background color to golden
            "&:hover": {
              backgroundColor: "#ffcc00", // Change background color on hover
            },
          }}
        >
          Next
        </Button>
      </Box>
    </form>
  );
};

export default NetWorthForm;
