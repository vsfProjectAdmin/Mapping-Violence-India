import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import SuccessModal from "./SuccessModel";

import {
  new_states_api,
  category_Caste_Discrimination,
  category_Caste_based_violence,
  category_Hate,
  category_Vigilante_violence,
  category_Sexual_violence,
  category_State,
} from "../constants/Constants";
import { addIncident } from "../api/API";

export default function CreateReport() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getSubcategoryOptions = (category) => {
    switch (category) {
      case "Caste Discrimination":
        return category_Caste_Discrimination;
      case "Caste-based violence":
        return category_Caste_based_violence;
      case "Hate/Hate Crimes/ Hate Speech by the Majoritarian Community":
        return category_Hate;
      case "Vigilante violence":
        return category_Vigilante_violence;
      case "Sexual violence":
        return category_Sexual_violence;
      case "State / Police/ Judicial Violence": //Please do not change any spaces, it needs to be consistent with the database
        return category_State;
      default:
        return [];
    }
  };

  const initialValues = {
    INCI_DESCRIPTION: "",
    INCI_DATE: "",
    INCI_CATEGORY: "",
    INCI_SUB_CATEGORY: "",
    INCI_PLACE_CITY_DISTRICT: "",
    INCI_STATE_UT: "",
    INCI_SOURCE: "",
    SELF_REPORTING: false,
    INCI_NAME: "",
  };

  const validationSchema = Yup.object().shape({
    INCI_DESCRIPTION: Yup.string().required(),
    INCI_DATE: Yup.date()
      .max(
        new Date(),
        "The date of the incident must be less than or equal to the current date"
      ) //avoid users from filling in the wrong date
      .required(),
    INCI_CATEGORY: Yup.string().required(),
    INCI_SUB_CATEGORY: Yup.string().required(),
    INCI_PLACE_CITY_DISTRICT: Yup.string().required(),
    INCI_STATE_UT: Yup.string().required(),
    INCI_SOURCE: Yup.string().test({
      name: "conditionalValidation",
      test: function (value) {
        // Access the form values using `this.parent`
        const selfReporting = this.parent.SELF_REPORTING;

        // Apply the condition for validation
        if (selfReporting) {
          return (
            !!value ||
            this.createError({
              message: "Email is required when self-reporting",
            })
          );
        }

        return true;
      },
    }),
    INCI_NAME: Yup.string(),
  });

  const onSubmit = (data, { resetForm }) => {
    if (data.INCI_NAME === "") {
      data.INCI_NAME = "Anonymous";
    }
    if (data.INCI_SOURCE === "") {
      data.INCI_SOURCE = "Self Reported";
    }

    console.log(data);
    addIncident(data);
    // Set the state to open the modal
    setIsModalOpen(true);
    // Reset the form
    resetForm();
  };

  const closeModel = () => {
    // Close the modal and reset the state
    setIsModalOpen(false);
  };

  function SubcategoryDropdown() {
    const formik = useFormikContext();

    return (
      <div className="">
        <label
          htmlFor="inciCategory"
          className="block text-sm font-medium text-font"
        >
          Category:
        </label>
        <div className="relative rounded-md shadow-sm">
          <Field
            as="select"
            name="INCI_CATEGORY"
            id="inciCategory"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm p-3 border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            <option value="Caste Discrimination">Caste Discrimination</option>
            <option value="Caste-based violence">Caste-based violence</option>
            <option value="Hate/Hate Crimes/ Hate Speech by the Majoritarian Community">
              Hate/Hate Crimes/ Hate Speech by the Majoritarian Community
            </option>
            <option value="Vigilante violence">Vigilante violence</option>
            <option value="Sexual violence">Sexual violence</option>
            <option value="State / Police/ Judicial Violence">
              State / Police/ Judicial Violence
            </option>
            {/* Please do not change any spaces for value, it needs to be consistent with the database */}
          </Field>
        </div>
        <ErrorMessage
          name="INCI_CATEGORY"
          component="span"
          className="text-red-500 text-xs mt-1"
        />

        <label
          htmlFor="inciSubCategory"
          className="block text-sm font-medium text-font mt-4"
        >
          Subcategory:
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <Field
            as="select"
            name="INCI_SUB_CATEGORY"
            id="inciSubCategory"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md p-3"
          >
            <option value="">Select a subcategory</option>
            {getSubcategoryOptions(formik.values.INCI_CATEGORY).map(
              (INCI_SUB_CATEGORY, index) => (
                <option key={index} value={INCI_SUB_CATEGORY}>
                  {INCI_SUB_CATEGORY}
                </option>
              )
            )}
          </Field>
        </div>
        <ErrorMessage
          name="INCI_SUB_CATEGORY"
          component="span"
          className="text-red-500 text-xs mt-1"
        />
      </div>
    );
  }

  const SourceField = () => {
    const { values, setFieldValue } = useFormikContext();

    return (
      <div className="mb-4 flex items-center">
        <div className="flex-1">
          <label
            htmlFor="inciSource"
            className={`block text-sm font-medium text-font ${
              values.SELF_REPORTING ? "text-gray-700" : "text-font"
            }`}
          >
            Source: (Optional)
          </label>
          <Field
            id="inciSource"
            name="INCI_SOURCE"
            placeholder="Enter Source..."
            disabled={values.SELF_REPORTING}
            className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              values.SELF_REPORTING
                ? "bg-neutral-500 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }`}
          />
        </div>
        <div className="ml-4">
          <div className="flex flex-col items-center">
            <label
              htmlFor="selfReporting"
              className="mb-2 block text-sm font-medium text-font"
            >
              Self Reporting
            </label>
            <Field
              type="checkbox"
              id="selfReporting"
              name="SELF_REPORTING"
              className="h-7 w-7 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              onChange={(e) => {
                setFieldValue("SELF_REPORTING", e.target.checked);
                if (e.target.checked) {
                  setFieldValue("INCI_SOURCE", "");
                }
              }}
            />
          </div>
        </div>
        <div className="flex-1 ml-4">
          <label
            htmlFor="inciSourceEmail"
            className={`text-sm font-medium text-font ${
              values.SELF_REPORTING ? "block" : "hidden"
            }`}
          >
            Email:
          </label>
          <Field
            id="inciSourceEmail"
            name="INCI_SOURCE"
            placeholder="Enter Email..."
            className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              values.SELF_REPORTING ? "block" : "hidden"
            }`}
          />
          <ErrorMessage
            name="INCI_SOURCE"
            component="span"
            className="text-red-500 text-xs mt-1"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 bg-main my-24 w-1/2 rounded-lg items-center flex flex-col">
      <h1 className="text-secondary text-6xl mb-4">INCIDENT FORM</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer w-full rounded-lg shadow-md">
          <div className="mb-4">
            <label
              htmlFor="inciDescription"
              className="block text-sm font-medium text-font"
            >
              Description:
            </label>
            <Field
              id="inciDescription"
              name="INCI_DESCRIPTION"
              placeholder="Enter description..."
              className="mt-1 p-2 w-full border rounded-md"
            />
            <ErrorMessage
              name="INCI_DESCRIPTION"
              component="span"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="inciDate"
              className="block text-sm font-medium text-font"
            >
              Date:
            </label>
            <Field
              type="date"
              id="inciDate"
              name="INCI_DATE"
              className="mt-1 p-2 w-full border rounded-md"
            />
            <ErrorMessage
              name="INCI_DATE"
              component="span"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <SubcategoryDropdown />

          <div className="mb-4 mt-4">
            <label
              htmlFor="inciCity"
              className="block text-sm font-medium text-font"
            >
              City:
            </label>
            <Field
              id="inciCity"
              name="INCI_PLACE_CITY_DISTRICT"
              placeholder="Enter City..."
              className="mt-1 p-2 w-full border rounded-md"
            />
            <ErrorMessage
              name="INCI_PLACE_CITY_DISTRICT"
              component="span"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="inciState"
              className="block text-sm font-medium text-font"
            >
              State:
            </label>
            <Field
              as="select"
              id="inciState"
              name="INCI_STATE_UT"
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Select a state</option>
              {new_states_api.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="INCI_STATE_UT"
              component="span"
              className="text-red-500 text-xs mt-1"
            />
          </div>
          <SourceField />
          <div className="mb-4">
            <label
              htmlFor="inciName"
              className="block text-sm font-medium text-font"
            >
              Name: (Optional)
            </label>
            <Field
              id="inciName"
              name="INCI_NAME"
              placeholder="Enter Name..."
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-secondary text-white p-2 rounded-md hover:bg-yellow-800 focus:ring-opacity-50 mt-4 w-full"
          >
            Submit Incident Report
          </button>

          {isModalOpen && <SuccessModal closeModel={closeModel} />}
        </Form>
      </Formik>
    </div>
  );
}
