import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CustomInputLabel, CustomMenuItem, CustomSelect } from "../Fields";
import Cookies from "js-cookie";

const CentralProvidentFundsForm = ({ onNext, onBack }) => {
  const formik = useFormik({
    initialValues: {
      //   centralProvidentFund: "No",
      careShield: "No",
      doneYourNominations: "No",
    },
    validationSchema: Yup.object({
      //   centralProvidentFund: Yup.string().required(
      //     "Central Provident Fund is required"
      //   ),
      careShield: Yup.string().required("CareShield is required"),
      doneYourNominations: Yup.string().required(
        "Done Your Nominations is required"
      ),
    }),
    onSubmit: (values) => {
      // Save form data to cookies
      Cookies.set("centralProvidentFundsFormData", JSON.stringify(values), {
        expires: 7,
      });
      onNext();
    },
  });

  // Load saved form data from cookies
  useEffect(() => {
    const formDataFromCookies = Cookies.get("centralProvidentFundsFormData");
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      formik.setValues(parsedData);
    }
  }, []);

  const handleFieldChange = async (fieldName, value) => {
    const updatedValues = { ...formik.values, [fieldName]: value };
    await formik.setValues(updatedValues);
    setTimeout(() => {
      Cookies.set(
        "centralProvidentFundsFormData",
        JSON.stringify(updatedValues),
        {
          expires: 7,
        }
      );
    }, 100);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" sx={{ color: "#ffb942" }}>
        Central Provident Funds Details
      </Typography>
      <Grid container spacing={2}>
        {/* Central Provident Fund */}
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <CustomInputLabel>Central Provident Fund</CustomInputLabel>
            <CustomSelect
              name="centralProvidentFund"
              label="Central Provident Fund"
              value={formik.values.centralProvidentFund}
              onChange={(e) =>
                handleFieldChange("centralProvidentFund", e.target.value)
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

        {/* CareShield */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <CustomInputLabel>CareShield</CustomInputLabel>
            <CustomSelect
              name="careShield"
              label="CareShield"
              value={formik.values.careShield}
              onChange={(e) => handleFieldChange("careShield", e.target.value)}
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

        {/* Done Your Nominations */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <CustomInputLabel>Done Your Nominations</CustomInputLabel>
            <CustomSelect
              name="doneYourNominations"
              label="Done Your Nominations"
              value={formik.values.doneYourNominations}
              onChange={(e) =>
                handleFieldChange("doneYourNominations", e.target.value)
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

export default CentralProvidentFundsForm;
