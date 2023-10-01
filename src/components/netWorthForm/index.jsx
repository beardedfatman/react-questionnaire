import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";
import Cookies from "js-cookie"; // Import js-cookie
import { CustomInputLabel, CustomMenuItem, CustomSelect } from "../Fields";

const NetWorthForm = ({ onNext, onBack }) => {
  const formik = useFormik({
    initialValues: {
      fixedAssets: "",
      cashAssets: "",
      investments: "",
    },
    validationSchema: Yup.object({
      fixedAssets: Yup.string().required("Value of Fixed Assets is required"),
      cashAssets: Yup.string().required("Cash Assets is required"),
      investments: Yup.string().required("Investments is required"),
    }),
    onSubmit: (values) => {
      console.log("Net Worth Form Values", values);
      onNext();
    },
  });

  useEffect(() => {
    const formDataFromCookies = Cookies.get("netWorthFormData"); // Get the saved form data
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      formik.setValues(parsedData); // Set the formik values from the cookie data
    }
  }, []);

  // Function to save form data to cookies whenever a field changes
  const handleFieldChange = async (fieldName, value) => {
    const updatedValues = { ...formik.values, [fieldName]: value };
    await formik.setValues(updatedValues); // Update formik values

    setTimeout(() => {
      Cookies.set("netWorthFormData", JSON.stringify(updatedValues), {
        expires: 7,
      }); // Save the form data to cookies as JSON
    }, 100);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" sx={{ color: "#ffb942" }}>
        Net Worth
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            required
            error={
              formik.touched.fixedAssets && Boolean(formik.errors.fixedAssets)
            }
          >
            <CustomInputLabel>Value of Fixed Assets</CustomInputLabel>
            <CustomSelect
              name="fixedAssets"
              label="Value of Fixed Assets"
              value={formik.values.fixedAssets}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("fixedAssets", e.target.value);
              }}
              MenuProps={{
                PaperProps: {
                  style: { background: "#292829" },
                },
              }}
            >
              <CustomMenuItem value="Residence">Residence</CustomMenuItem>
              <CustomMenuItem value="Vehicle">Vehicle</CustomMenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            required
            error={
              formik.touched.cashAssets && Boolean(formik.errors.cashAssets)
            }
          >
            <CustomInputLabel>Cash Assets</CustomInputLabel>
            <CustomSelect
              name="cashAssets"
              label="Cash Assets"
              value={formik.values.cashAssets}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("cashAssets", e.target.value);
              }}
              MenuProps={{
                PaperProps: {
                  style: { background: "#292829" },
                },
              }}
            >
              <CustomMenuItem value="Savings">Savings</CustomMenuItem>
              <CustomMenuItem value="Fixed Deposits">
                Fixed Deposits
              </CustomMenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            required
            error={
              formik.touched.investments && Boolean(formik.errors.investments)
            }
          >
            <CustomInputLabel>Investments</CustomInputLabel>
            <CustomSelect
              name="investments"
              label="Investments"
              value={formik.values.investments}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("investments", e.target.value);
              }}
              MenuProps={{
                PaperProps: {
                  style: { background: "#292829" },
                },
              }}
            >
              <CustomMenuItem value="Bonds">Bonds</CustomMenuItem>
              <CustomMenuItem value="Unit Trusts">Unit Trusts</CustomMenuItem>
              <CustomMenuItem value="Stocks">Stocks</CustomMenuItem>
              <CustomMenuItem value="Insurance Policies">
                Insurance Policies
              </CustomMenuItem>
              <CustomMenuItem value="Real Estate">Real Estate</CustomMenuItem>
              <CustomMenuItem value="Commodities">Commodities</CustomMenuItem>
              <CustomMenuItem value="Cryptocurrencies">
                Cryptocurrencies
              </CustomMenuItem>
              <CustomMenuItem value="Other">Other</CustomMenuItem>
            </CustomSelect>
          </FormControl>
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

export default NetWorthForm;
