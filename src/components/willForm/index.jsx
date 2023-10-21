import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, Button, Grid, Box, FormControl } from "@mui/material";
import {
  CustomTextField,
  CustomDivider,
  CustomInputLabel,
  CustomSelect,
  CustomMenuItem,
} from "../Fields"; // You can customize this import as needed
import Cookies from "js-cookie";
import AddIcon from "@mui/icons-material/Add";

const WillForm = ({ onNext, onBack }) => {
  const [executorsCount, setExecutorsCount] = useState([0]);
  const [beneficiariesCount, setBeneficiariesCount] = useState([0]);

  const formik = useFormik({
    initialValues: {
      leaveWill: "Yes",
      nric: "",
      executors: executorsCount.map(() => ({
        name: "",
        nric: "",
        address: "",
      })),
      beneficiaries: beneficiariesCount.map(() => ({
        name: "",
        nric: "",
        address: "",
        percentOfAsset: "",
      })),
    },
    validationSchema: Yup.object().shape({
      leaveWill: Yup.string(),
      nric: Yup.string().when("leaveWill", {
        is: "Yes",
        then: () => Yup.string().required("NRIC is required"),
      }),
      executors: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().when("leaveWill", {
            is: "Yes",
            then: () => Yup.string().required("Name is required"),
          }),
          nric: Yup.string().when("leaveWill", {
            is: "Yes",
            then: () => Yup.string().required("NRIC is required"),
          }),
          address: Yup.string().when("leaveWill", {
            is: "Yes",
            then: () => Yup.string().required("Address is required"),
          }),
        })
      ),
      beneficiaries: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().when("leaveWill", {
            is: "Yes",
            then: () => Yup.string().required("Name is required"),
          }),
          nric: Yup.string().when("leaveWill", {
            is: "Yes",
            then: () => Yup.string().required("NRIC is required"),
          }),
          address: Yup.string().when("leaveWill", {
            is: "Yes",
            then: () => Yup.string().required("Address is required"),
          }),
          percentOfAsset: Yup.number().when("leaveWill", {
            is: "Yes",
            then: () =>
              Yup.number()
                .required("Percent of Asset is required")
                .positive("Percent of Asset must be positive"),
          }),
        })
      ),
    }),
    // validationSchema: Yup.object().shape({
    //   leaveWill: Yup.string(),
    //   nric: Yup.string().when("leaveWill", {
    //     is: "Yes",
    //     then: () => Yup.string().required("NRIC is required"),
    //     // otherwise: () => Yup.string(),
    //   }),
    //   executors: Yup.array().of(
    //     Yup.object().shape({
    //       //   name: Yup.string().required("Name is required"),
    //       name: () =>
    //         Yup.string().when("leaveWill", {
    //           is: "Yes",
    //           then: () => Yup.string().required("Name is required"),
    //           // otherwise: () => Yup.string(),
    //         }),
    //       nric: Yup.string().when("leaveWill", {
    //         is: "Yes",
    //         then: () => Yup.string().required("NRIC is required"),
    //         // otherwise: () => Yup.string(),
    //       }),
    //       address: Yup.string().when("leaveWill", {
    //         is: "Yes",
    //         then: () => Yup.string().required("Address is required"),
    //         // otherwise: () => Yup.string(),
    //       }),
    //     })
    //   ),
    //   beneficiaries: Yup.array().of(
    //     Yup.object().shape({
    //       name: Yup.string().when("leaveWill", {
    //         is: "Yes",
    //         then: () => Yup.string().required("Name is required"),
    //         // otherwise: () => Yup.string(),
    //       }),
    //       nric: Yup.string().when("leaveWill", {
    //         is: "Yes",
    //         then: () => Yup.string().required("NRIC is required"),
    //         // otherwise: () => Yup.string(),
    //       }),
    //       address: Yup.string().when("leaveWill", {
    //         is: "Yes",
    //         then: () => Yup.string().required("Address is required"),
    //         // otherwise: () => Yup.string(),
    //       }),
    //       percentOfAsset: Yup.number().when("leaveWill", {
    //         is: "Yes",
    //         then: () =>
    //           Yup.number()
    //             .required("Percent of Asset is required")
    //             .positive("Percent of Asset must be positive"),
    //         // otherwise: () => Yup.number(),
    //       }),
    //     })
    //   ),
    // }),
    onSubmit: (values) => {
      // Save form data to cookies
      Cookies.set("WillFormData", JSON.stringify(values), {
        expires: 7,
      });
      onNext();
    },
  });

  // Load saved form data from cookies
  useEffect(() => {
    // Cookies.remove("WillFormData");
    const formDataFromCookies = Cookies.get("WillFormData");
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      formik.setValues(parsedData);

      let arr = [0],
        mid = [0];

      for (let index = 0; index < parsedData["executors"].length - 1; index++) {
        handleAddGoal("executors");
        arr.push(index + 1);
      }

      for (
        let index = 0;
        index < parsedData["beneficiaries"].length - 1;
        index++
      ) {
        handleAddGoal("beneficiaries");
        mid.push(index + 1);
      }

      setExecutorsCount(arr);
      setBeneficiariesCount(mid);
    }
  }, []);

  const handleFieldChange = async (fieldName, value, goalType, index) => {
    const updatedValues = { ...formik.values };
    updatedValues[goalType][index][fieldName] = value;

    await formik.setValues(updatedValues);
    setTimeout(() => {
      Cookies.set("WillFormData", JSON.stringify(updatedValues), {
        expires: 7,
      });
    }, 100);
  };

  const handleFieldChangeSimple = async (fieldName, value) => {
    const updatedValues = { ...formik.values, [fieldName]: value };
    await formik.setValues(updatedValues); // Update formik values

    setTimeout(() => {
      Cookies.set("WillFormData", JSON.stringify(updatedValues), {
        expires: 7,
      }); // Save the form data to cookies as JSON
    }, 100);
  };

  const handleAddGoal = (type) => {
    if (type === "executors" && executorsCount.length < 2) {
      const newGoal = {
        description: "",
        targetDate: "",
        amount: "",
      };

      setExecutorsCount((prevCounts) => [...prevCounts, prevCounts.length]);

      const formDataFromCookies = Cookies.get("WillFormData");
      if (
        formDataFromCookies &&
        JSON.parse(formDataFromCookies)[type][formik.values[type].length] !=
          undefined
      ) {
        const parsedData = JSON.parse(formDataFromCookies);
        formik.setValues(parsedData);
      } else {
        formik.setFieldValue(type, [...formik.values[type], newGoal]);
      }
    } else if (type === "beneficiaries" && beneficiariesCount.length < 2) {
      const newGoal = {
        description: "",
        targetDate: "",
        amount: "",
      };

      setBeneficiariesCount((prevCounts) => [...prevCounts, prevCounts.length]);

      const formDataFromCookies = Cookies.get("WillFormData");
      if (
        formDataFromCookies &&
        JSON.parse(formDataFromCookies)[type][formik.values[type].length] !=
          undefined
      ) {
        const parsedData = JSON.parse(formDataFromCookies);
        formik.setValues(parsedData);
      } else {
        formik.setFieldValue(type, [...formik.values[type], newGoal]);
      }
    }
  };

  const handleRemoveGoal = (type, index) => {
    const goals = [...formik.values[type]];
    goals.splice(index, 1);
    formik.setFieldValue(type, goals);

    const formDataFromCookies = Cookies.get("WillFormData");
    if (formDataFromCookies) {
      const parsedData = JSON.parse(formDataFromCookies);
      if (parsedData[type]) {
        parsedData[type].splice(index, 1);
        setTimeout(() => {
          Cookies.set("WillFormData", JSON.stringify(parsedData), {
            expires: 7,
          });
        }, 101);
        formik.setValues(parsedData);
      }
    }

    if (type === "executors") {
      let temp = [];

      executorsCount.map((d) => {
        if (d !== index) {
          if (d > index) {
            temp.push(d - 1);
          } else {
            temp.push(d);
          }
        }
      });

      setExecutorsCount(temp);
    } else if (type === "beneficiaries") {
      let temp = [];

      beneficiariesCount.map((d) => {
        if (d !== index) {
          if (d > index) {
            temp.push(d - 1);
          } else {
            temp.push(d);
          }
        }
      });

      setBeneficiariesCount(temp);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" sx={{ color: "#ffb942", mb: 2.51 }}>
        Will
      </Typography>

      {/* Short-term Goals */}

      <Grid container spacing={2} mt={0.5}>
        <Grid item xs={12} sm={12}>
          <FormControl
            fullWidth
            required
            error={formik.touched.leaveWill && Boolean(formik.errors.leaveWill)}
          >
            <CustomInputLabel>Would you like to leave a will?</CustomInputLabel>
            <CustomSelect
              name="leaveWill"
              label="Would you like to leave a will?"
              value={formik.values.leaveWill}
              onChange={(e) => {
                formik.handleChange(e);
                handleFieldChangeSimple("leaveWill", e.target.value);
              }}
              error={
                formik.touched.leaveWill && Boolean(formik.errors.leaveWill)
              }
              helperText={formik.touched.leaveWill && formik.errors.leaveWill}
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
        {/* <Grid item xs={12} sm={12}>
          <CustomTextField
            fullWidth
            name={"nric"}
            label="What is your NRIC"
            value={formik.values.nric}
            onChange={(e) => handleFieldChangeSimple("nric", e.target.value)}
            error={formik.touched.nric && Boolean(formik.errors.nric)}
            helperText={formik.touched.nric && formik.errors.nric}
            InputProps={{
              style: { color: "#ffb942" },
            }}
          />
        </Grid> */}
      </Grid>
      {formik.values.leaveWill === "Yes" && (
        <>
          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={12} sm={12}>
              <CustomTextField
                fullWidth
                name={"nric"}
                label="What is your NRIC"
                value={formik.values.nric}
                onChange={(e) =>
                  handleFieldChangeSimple("nric", e.target.value)
                }
                error={formik.touched.nric && Boolean(formik.errors.nric)}
                helperText={formik.touched.nric && formik.errors.nric}
                InputProps={{
                  style: { color: "#ffb942" },
                }}
              />
            </Grid>
          </Grid>
          <CustomDivider />
          <Typography variant="h5" sx={{ color: "#ffb942" }}>
            Executors
          </Typography>
          {executorsCount.map((index) => {
            return (
              <Grid container spacing={2} key={index} mt={0.5}>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    fullWidth
                    name={`executors[${index}].name`}
                    label="Name"
                    value={formik.values.executors[index].name}
                    onChange={(e) =>
                      handleFieldChange(
                        "name",
                        e.target.value,
                        "executors",
                        index
                      )
                    }
                    error={
                      formik.touched.executors &&
                      formik.touched.executors[index] &&
                      Boolean(
                        formik.errors.executors &&
                          formik.errors.executors[index]?.name
                      )
                    }
                    helperText={
                      formik.touched.executors &&
                      formik.touched.executors[index] &&
                      formik.errors.executors &&
                      formik.errors.executors[index]?.name
                    }
                    InputProps={{
                      style: { color: "#ffb942" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    fullWidth
                    name={`executors[${index}].nric`}
                    label="NRIC"
                    value={formik.values.executors[index].nric}
                    onChange={(e) =>
                      handleFieldChange(
                        "nric",
                        e.target.value,
                        "executors",
                        index
                      )
                    }
                    error={
                      formik.touched.executors &&
                      formik.touched.executors[index] &&
                      Boolean(
                        formik.errors.executors &&
                          formik.errors.executors[index]?.nric
                      )
                    }
                    helperText={
                      formik.touched.executors &&
                      formik.touched.executors[index] &&
                      formik.errors.executors &&
                      formik.errors.executors[index]?.nric
                    }
                    InputProps={{
                      style: { color: "#ffb942" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    name={`executors[${index}].address`}
                    label="Address"
                    value={formik.values.executors[index].address}
                    onChange={(e) =>
                      handleFieldChange(
                        "address",
                        e.target.value,
                        "executors",
                        index
                      )
                    }
                    error={
                      formik.touched.executors &&
                      formik.touched.executors[index] &&
                      Boolean(
                        formik.errors.executors &&
                          formik.errors.executors[index]?.address
                      )
                    }
                    helperText={
                      formik.touched.executors &&
                      formik.touched.executors[index] &&
                      formik.errors.executors &&
                      formik.errors.executors[index]?.address
                    }
                    InputProps={{
                      style: { color: "#ffb942" },
                    }}
                  />
                </Grid>
                {index > 0 && (
                  <Grid item xs={12} sm={1}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleRemoveGoal("executors", index)}
                        sx={{
                          mt: 1,
                          backgroundColor: "#ffb942",
                          "&:hover": {
                            backgroundColor: "#ffcc00",
                          },
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            );
          })}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            <Button
              variant="contained"
              onClick={() => handleAddGoal("executors")}
              sx={{
                mt: 1,
                backgroundColor: "#ffb942",
                "&:hover": {
                  backgroundColor: "#ffcc00",
                },
              }}
            >
              <AddIcon />
              Add Executor
            </Button>
          </Box>
          <CustomDivider />
          {/*Beneficiaries*/}
          <Typography variant="h5" sx={{ color: "#ffb942" }}>
            Beneficiaries
          </Typography>
          {beneficiariesCount.map((index) => (
            <Grid container spacing={2} key={index} mt={0.5}>
              <Grid item xs={12} sm={2.5}>
                <CustomTextField
                  fullWidth
                  name={`beneficiaries[${index}].name`}
                  label="Name"
                  value={formik.values.beneficiaries[index].name}
                  onChange={(e) =>
                    handleFieldChange(
                      "name",
                      e.target.value,
                      "beneficiaries",
                      index
                    )
                  }
                  error={
                    formik.touched.beneficiaries &&
                    formik.touched.beneficiaries[index] &&
                    Boolean(
                      formik.errors.beneficiaries &&
                        formik.errors.beneficiaries[index]?.name
                    )
                  }
                  helperText={
                    formik.touched.beneficiaries &&
                    formik.touched.beneficiaries[index] &&
                    formik.errors.beneficiaries &&
                    formik.errors.beneficiaries[index]?.name
                  }
                  InputProps={{
                    style: { color: "#ffb942" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2.5}>
                <CustomTextField
                  fullWidth
                  name={`beneficiaries[${index}].nric`}
                  label="NRIC"
                  value={formik.values.beneficiaries[index].nric}
                  onChange={(e) =>
                    handleFieldChange(
                      "nric",
                      e.target.value,
                      "beneficiaries",
                      index
                    )
                  }
                  error={
                    formik.touched.beneficiaries &&
                    formik.touched.beneficiaries[index] &&
                    Boolean(
                      formik.errors.beneficiaries &&
                        formik.errors.beneficiaries[index]?.nric
                    )
                  }
                  helperText={
                    formik.touched.beneficiaries &&
                    formik.touched.beneficiaries[index] &&
                    formik.errors.beneficiaries &&
                    formik.errors.beneficiaries[index]?.nric
                  }
                  InputProps={{
                    style: { color: "#ffb942" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2.5}>
                <CustomTextField
                  fullWidth
                  name={`beneficiaries[${index}].address`}
                  label="Address"
                  value={formik.values.beneficiaries[index].address}
                  onChange={(e) =>
                    handleFieldChange(
                      "address",
                      e.target.value,
                      "beneficiaries",
                      index
                    )
                  }
                  error={
                    formik.touched.beneficiaries &&
                    formik.touched.beneficiaries[index] &&
                    Boolean(
                      formik.errors.beneficiaries &&
                        formik.errors.beneficiaries[index]?.address
                    )
                  }
                  helperText={
                    formik.touched.beneficiaries &&
                    formik.touched.beneficiaries[index] &&
                    formik.errors.beneficiaries &&
                    formik.errors.beneficiaries[index]?.address
                  }
                  InputProps={{
                    style: { color: "#ffb942" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2.5}>
                <CustomTextField
                  fullWidth
                  name={`beneficiaries[${index}].percentOfAsset`}
                  label="Percent Of Asset"
                  type="number"
                  value={formik.values.beneficiaries[index].percentOfAsset}
                  onChange={(e) =>
                    handleFieldChange(
                      "percentOfAsset",
                      e.target.value,
                      "beneficiaries",
                      index
                    )
                  }
                  error={
                    formik.touched.beneficiaries &&
                    formik.touched.beneficiaries[index] &&
                    Boolean(
                      formik.errors.beneficiaries &&
                        formik.errors.beneficiaries[index]?.percentOfAsset
                    )
                  }
                  helperText={
                    formik.touched.beneficiaries &&
                    formik.touched.beneficiaries[index] &&
                    formik.errors.beneficiaries &&
                    formik.errors.beneficiaries[index]?.percentOfAsset
                  }
                  InputProps={{
                    style: { color: "#ffb942" },
                  }}
                />
              </Grid>
              {index > 0 && (
                <Grid item xs={12} sm={1}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleRemoveGoal("beneficiaries", index)}
                      sx={{
                        mt: 1,
                        backgroundColor: "#ffb942",
                        "&:hover": {
                          backgroundColor: "#ffcc00",
                        },
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleAddGoal("beneficiaries")}
              sx={{
                mt: 1,
                backgroundColor: "#ffb942",
                "&:hover": {
                  backgroundColor: "#ffcc00",
                },
              }}
            >
              <AddIcon />
              Add Beneficiary
            </Button>
          </Box>
        </>
      )}
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

export default WillForm;
