import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardForm = ({ values, errors, touched, status }) => {
  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);

  const [userz, setUser] = useState([]);

  useEffect(() => {
    console.log("status has changed!", status);

    status && setUser(userz => [...userz, status]);
  }, [status]);

  return (
    <div className="newuser-form">
      <Form>
        <label htmlFor="username">
          Username
          <Field
            id="username"
            type="text"
            name="username"
            placeholder="Enter name"
          />
          {touched.username && errors.username && (
            <p className="errors">{errors.username}</p>
          )}
        </label>

        {/* EMAIL */}

        <label htmlFor="email">
          Email
          <Field
            id="email"
            type="text"
            name="email"
            placeholder="Enter email"
          />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>

        {/* PASSWORD */}

        <label htmlFor="password">
          Password
          <Field
            id="password"
            type="text"
            name="password"
            placeholder="Enter password"
          />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>

        {/* TERMS OF SERVICE */}

        <label className="checkbox-container">
          Terms of Service
          <Field type="checkbox" name="tos" checked={values.tos} />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit!</button>
      </Form>

      {/* END OF FORM */}

      {userz.map(item => {
        return (
          <ul key={item.id}>
            <li>Username: {item.username}</li>
            <li>Email: {item.email}</li>
            <li>Password: {item.password}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      tos: props.tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name."),
    email: Yup.string().required("Please enter your email address."),
    password: Yup.string().required("Please enter your password."),
    tos: Yup.bool().required("Please accept our Terms of Service.")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res.data);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(OnboardForm);
export default FormikForm;
