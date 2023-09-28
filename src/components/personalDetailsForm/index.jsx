import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material";
import Cookies from "js-cookie"; // Import js-cookie
import dayjs from "dayjs";

import {
  CustomInputLabel,
  CustomMenuItem,
  CustomSelect,
  CustomTextField,
} from "../Fields";

const PersonalDetailForm = ({ onNext, saveFormData, onBack }) => {
  const customTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffb942", // Set the primary color to golden
      },
      background: {
        default: "black !important", // Set the background color to black
      },
      text: {
        primary: "#ffb942", // Set the text color to golden
        secondary: "#ffb942",
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: "#ffb942", // Set the text color to golden for input base
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderColor: "#ffb942 !important", // Set the border color to #ffb942
          },
          notchedOutline: {
            borderColor: "#ffb942 !important", // Set the border color to #ffb942
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#ffb942 !important", // Set the icon color to #ffb942
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          daySelected: {
            backgroundColor: "#ffb942 !important", // Set the background color for selected days to #ffb942
            "&:hover": {
              backgroundColor: "#ffb942 !important", // Set the background color on hover to #ffb942
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          paper: {
            background: "#ffb942 !important", // Set the background color of the popover to black
            color: "#ffb942 !important", // Set the text color of the popover to #ffb942
          },
        },
      },

      MuiPopper: {
        styleOverrides: {
          paper: {
            background: "#ffb942 !important", // Set the background color of the popover to black
            color: "#ffb942 !important", // Set the text color of the popover to #ffb942
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#ffb942 !important", // Set the text color to #ffb942 for input labels
          },
        },
      },
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      contactNumber: "",
      dateOfBirth: null, // Use null for dateOfBirth
      gender: "",
      address: "",
      maritalStatus: "",
      nationality: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contactNumber: Yup.string().required("Contact Number is required"),
      dateOfBirth: Yup.date().nullable().required("Date of Birth is required"), // Use Yup.date() for dateOfBirth
      gender: Yup.string().required("Gender is required"),
      address: Yup.string().required("Address is required"),
      maritalStatus: Yup.string().required("Marital Status is required"),
      nationality: Yup.string().required("Nationality is required"),
    }),
    onSubmit: (values) => {
      console.log("786 values", values);
      // saveFormData(values);
      onNext();
    },
  });

  // function formatDateToYYYYMMDD(date) {
  //   console.log("786 date", date, typeof date);
  //   if (typeof date === "string") {
  //     console.log("786 date string", date.split("T")[0]);
  //     return date.split("T")[0];
  //   }
  //   date = date.$d;
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  //   const day = String(date.getDate()).padStart(2, "0");
  //   console.log("786 `${year}-${month}-${day}`;", `${year}-${month}-${day}`);
  //   return `${year}-${month}-${day}`;
  // }

  useEffect(() => {
    // Cookies.remove("personalFormData");
    const formDataFromCookies = Cookies.get("personalFormData"); // Get the saved form data
    console.log("786 formDataFromCookies", formDataFromCookies);
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      formik.setValues(parsedData); // Set the formik values from the cookie data
    }
  }, []);

  // Function to save form data to cookies whenever a field changes
  const handleFieldChange = async (fieldName, value) => {
    // await formik.setFieldValue(fieldName, value);
    const updatedValues = { ...formik.values, [fieldName]: value };
    await formik.setValues(updatedValues); // Update formik values
    console.log("786 savign", formik.values);
    // Cookies.set("personalFormData", JSON.stringify(formik.values), {
    //   expires: 7,
    // }); // Save the form data to cookies as JSON
    setTimeout(() => {
      Cookies.set("personalFormData", JSON.stringify(updatedValues), {
        expires: 7,
      }); // Save the form data to cookies as JSON
    }, 100);
  };

  // useEffect(() => {
  //   const formDataFromCookies = Cookies.get("personalFormData"); // Get the saved form data
  //   if (formDataFromCookies) {
  //     formik.setValues(formDataFromCookies); // Set the formik values from the cookie data
  //   }
  // }, []);

  // // Function to save form data to cookies whenever a field changes
  // const handleFieldChange = (fieldName, value) => {
  //   console.log("786 fieldName value", fieldName, value);
  //   formik.setFieldValue(fieldName, value);
  //   Cookies.set("personalFormData", formik.values); // Save the form data to cookies
  // };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" sx={{ color: "#ffb942" }}>
        Personal Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="name"
            label="Name"
            value={formik.values.name}
            // onChange={formik.handleChange}
            onChange={async (e) => {
              console.log("786 e", e.target.value);
              await formik.handleChange(e);
              handleFieldChange("name", e.target.value);
            }}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            required
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="contactNumber"
            label="Contact Number"
            value={formik.values.contactNumber}
            // onChange={formik.handleChange}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("contactNumber", e.target.value);
            }}
            error={
              formik.touched.contactNumber &&
              Boolean(formik.errors.contactNumber)
            }
            helperText={
              formik.touched.contactNumber && formik.errors.contactNumber
            }
            required
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ThemeProvider theme={customTheme}>
            <DatePicker
              fullWidth
              sx={{
                width: "100%",
                "& .MuiPickersLayout-root": {
                  backgroundColor: "black !important", // Set the background color of the popover to black
                  color: "goldenrod !important", // Set the text color of the popover to goldenrod
                },
              }}
              name="dateOfBirth"
              label="Date of Birth"
              // value={
              //   formik.values.dateOfBirth != null
              //     ? dayjs(formatDateToYYYYMMDD(formik.values.dateOfBirth))
              //     : null
              // }
              // // onChange={(date) => formik.setFieldValue("dateOfBirth", date)}
              // onChange={(date) => {
              //   formik.setFieldValue("dateOfBirth", date);
              //   handleFieldChange("dateOfBirth", date);
              // }}
              value={
                formik.values.dateOfBirth != null
                  ? dayjs(formik.values.dateOfBirth)
                  : null
              }
              onChange={(date) => {
                formik.setFieldValue("dateOfBirth", date.toDate());
                handleFieldChange("dateOfBirth", date.toDate());
              }}
              PopOverProps={{
                style: { backgroundColor: "black !important" }, // Set the background color of the popover to black
              }}
              renderInput={(params) => (
                <CustomTextField
                  fullWidth
                  {...params}
                  error={
                    formik.touched.dateOfBirth &&
                    Boolean(formik.errors.dateOfBirth)
                  }
                  helperText={
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  }
                  required
                  InputProps={{
                    style: { color: "#ffb942" }, // Change text color to golden
                  }}
                />
              )}
            />
          </ThemeProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            required
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
            <CustomInputLabel>Gender</CustomInputLabel>
            <CustomSelect
              name="gender"
              label="Gender"
              value={formik.values.gender}
              // onChange={formik.handleChange}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("gender", e.target.value);
              }}
              MenuProps={{
                PaperProps: {
                  style: { background: "#292829" },
                },
              }}
            >
              <CustomMenuItem value="Male">Male</CustomMenuItem>
              <CustomMenuItem value="Female">Female</CustomMenuItem>
              <CustomMenuItem value="Other">Other</CustomMenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            name="address"
            label="Address"
            value={formik.values.address}
            // onChange={formik.handleChange}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("address", e.target.value);
            }}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            required
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            required
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
            <CustomInputLabel>Marital Status</CustomInputLabel>
            <CustomSelect
              name="maritalStatus"
              label="Marital Status"
              value={formik.values.maritalStatus}
              // onChange={formik.handleChange}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChange("maritalStatus", e.target.value);
              }}
              error={
                formik.touched.maritalStatus &&
                Boolean(formik.errors.maritalStatus)
              }
              helperText={
                formik.touched.maritalStatus && formik.errors.maritalStatus
              }
              MenuProps={{
                PaperProps: {
                  style: { background: "#292829" },
                },
              }}
            >
              <CustomMenuItem value="Male">Married</CustomMenuItem>
              <CustomMenuItem value="Female">Unmarried</CustomMenuItem>
            </CustomSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            name="nationality"
            label="Nationality"
            value={formik.values.nationality}
            // onChange={formik.handleChange}
            onChange={(e) => {
              formik.handleChange(e);
              handleFieldChange("nationality", e.target.value);
            }}
            error={
              formik.touched.nationality && Boolean(formik.errors.nationality)
            }
            helperText={formik.touched.nationality && formik.errors.nationality}
            required
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
            mt: 3.5, // Set margin-top
            mr: 1,
            backgroundColor: "#ffb942", // Set the background color to golden
            "&:hover": {
              backgroundColor: "#ffcc00", // Change background color on hover
            },
          }}
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={!formik.isValid}
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

export default PersonalDetailForm;
