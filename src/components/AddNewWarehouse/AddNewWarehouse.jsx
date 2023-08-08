import "./AddNewWarehouse.scss";
import { Link, useNavigate } from "react-router-dom";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";

/* 
 * Add New Warehouse Component
 * - Represents the warehouse form for adding a new warehouse 
 */

const AddNewWarehouse = ({ onCancelAddWarehouse }) => {
    const navigate = useNavigate();

    //States
    const [warehouseState, setWarehouseState] = useState({
        warehouse_name: "",
        address: "",
        city: "",
        country: "",
        contact_name: "",
        contact_position: "",
        contact_phone: "",
        contact_email: "",
    });

    // Destructuring states
    const {
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
    } = warehouseState;

    //Function to add dashes to phone number

    //onChange handle
    const handleOnChange = (event) => {
        const value = event.target.value;
        const nameForm = event.target.name;
        const valuePhoneDash = value.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

        //If the state change is contact_phone, it will modify the phone number by adding dashes, so the server can accept it
        if (nameForm === "contact_phone") {
            return setWarehouseState({
                ...warehouseState,
                [nameForm]: valuePhoneDash,
            });
        }

        setWarehouseState({
            ...warehouseState,
            [nameForm]: value,
        });
    };

    //Form Validation

    //Empty Fields
    const isFieldsValid = () => {
        if (
        !warehouse_name ||
        !address ||
        !city ||
        !country ||
        !contact_name ||
        !contact_position ||
        !contact_phone ||
        !contact_email
        ) {
        return false;
        } else {
        return true;
        }
    };

    //Phone Number validation
    const isPhoneValid = () => {
        const phoneValidator = /1?-?\(?[0-9]{3}[\-\)][0-9]{3}-[0-9]{4}/;

        if (!phoneValidator.test(contact_phone)) {
        return false;
        } else {
        return true;
        }
    };

    // Email Validation
    const isEmailValid = () => {
        if (!contact_email.includes("@")) {
        return false;
        } else {
        return true;
        }
    };

    // Final validation
    const isValidForm = () => {
        if (!isFieldsValid()) {
        return false;
        }
        // if (!isEmailValid()) {
        // return false;
        // }
        if (!isPhoneValid()) {
        return false;
        }
        if (!isEmailValid()) {
        return false;
        }
        return true;
    };

    //Error State
    const errorFieldRequiredHide = { display: "none" };

    const errorFieldRequiredShow = { display: "flex" };

    //Handle to submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        if (isValidForm()) {
            axios
                .post("http://localhost:5050/api/warehouses", warehouseState)
                .then((res) => {
                console.log(res);
                })
                .catch((err) => {
                console.log(err);
                });

            //Once form is submitted, re-direct to Warehouses List page
            navigate("/warehouses");

            // Close the AddNewWarehouse component
            onCancelAddWarehouse();
        } else {
            console.log("Form Invalid");
        }
    };

    return (
        <div className="add-warehouse">
            {/* header */}
            <div className="add-warehouse__heading">
                <img
                    className="add-warehouse__icon"
                    src={backArrowIcon}
                    alt="Back Arrow Icon"
                    // Call the onCancelAddWarehouse function when back arrow is clicked to return to see warehouse list
                    onClick={onCancelAddWarehouse} 
                />
                <h2 className="add-warehouse__title">Add New Warehouse</h2>
            </div>

            {/* Warehouse details */}
            <form className="add-warehouse__form" onSubmit={handleSubmit}>
                <div className="add-warehouse__content">
                    <div className="add-warehouse__section">
                        <h3 className="add-warehouse__subtitle">Warehouse Details</h3>
                        <label className="add-warehouse__label">Warehouse Name</label>
                        <input
                            className={`add-warehouse__input ${
                            !warehouse_name ? "add-warehouse__error" : ""
                            }`}
                            type="text"
                            name="warehouse_name"
                            placeholder="Warehouse Name"
                            onChange={handleOnChange}
                        ></input>

                        {/* Error state field required */}
                        <div
                            className="add-warehouse__error-message"
                            style={!warehouse_name && !isFieldsValid() ? errorFieldRequiredShow : errorFieldRequiredHide}
                        >
                            <p>This field is required</p>
                        </div>

                        <label className="add-warehouse__label">Street Address</label>
                        <input
                            className={`add-warehouse__input ${
                            !address ? "add-warehouse__input--error" : ""
                            }`}
                            type="text"
                            name="address"
                            placeholder="Address"
                            onChange={handleOnChange}
                        ></input>

                        {/* Error state field required */}
                        <div
                            className="add-warehouse__error-message"
                            style={address && !isValidForm() ? errorFieldRequiredShow : errorFieldRequiredHide}
                        >
                            <p>This field is required</p>
                        </div>

                        <label className="add-warehouse__label">City</label>
                        <input
                            className={`add-warehouse__input ${
                            !city ? "add-warehouse__input--error" : ""
                            }`}
                            type="text"
                            name="city"
                            placeholder="City"
                            onChange={handleOnChange}
                        ></input>

                        {/* Error state field required */}
                        <div
                            className="add-warehouse__error-message"
                            style={city && !isValidForm() ? errorFieldRequiredShow : errorFieldRequiredHide}
                        >
                            <p>This field is required</p>
                        </div>

                        <label className="add-warehouse__label">Country</label>
                        <input
                            className={`add-warehouse__input ${
                            !country ? "add-warehouse__input--error" : ""
                            }`}
                            type="text"
                            name="country"
                            placeholder="Country"
                            onChange={handleOnChange}
                        ></input>

                        {/* Error state field required */}
                        <div
                            className="add-warehouse__error-message"
                            style={country && !isValidForm() ? errorFieldRequiredShow : errorFieldRequiredHide}
                        >
                            <p>This field is required</p>
                        </div>
                    </div>

                    {/* Contact details */}
                    <div className="add-warehouse__section">
                        <h3 className="add-warehouse__subtitle">Contact Details</h3>
                        <label className="add-warehouse__label" htmlFor="contact_name">Contact Name</label>
                        <input
                            className={`add-warehouse__input ${
                            !contact_name ? "warehouse__input--error" : ""
                            }`}
                            type="text"
                            name="contact_name"
                            id="contact_name"
                            placeholder="Contact Name"
                            onChange={handleOnChange}
                        ></input>

                        {/* Error state field required */}
                        <div
                            className="add-warehouse__error-message"
                            style={!contact_name && !isValidForm() ? errorFieldRequiredShow : errorFieldRequiredHide}
                        >
                            <p>This field is required</p>
                        </div>

                        <label className="add-warehouse__label" htmlFor="contact_position">Position</label>
                        <input
                            className={`add-warehouse__input ${
                            !contact_position ? "add-warehouse__input--error" : ""
                            }`}
                            type="text"
                            name="contact_position"
                            id="contact_position"
                            placeholder="Position"
                            onChange={handleOnChange}
                        ></input>

                        {/* Error state field required */}
                        <div
                            className="add-warehouse__error-message"
                            style={!contact_position && !isValidForm() ? errorFieldRequiredShow : errorFieldRequiredHide}
                        >
                            <p>This field is required</p>
                        </div>

                        <label className="add-warehouse__label" htmlFor="contact_phone">Phone Number</label>
                        <input
                            className={`add-warehouse__input ${
                            !contact_phone ? "add-warehouse__input--error" : ""
                            }`}
                            type="text"
                            name="contact_phone"
                            id="contact_phone"
                            placeholder="Phone Number"
                            onChange={handleOnChange}
                        ></input>

                        {/* Error state field required */}
                        <div
                            className="add-warehouse__error-message"
                            style={!contact_phone && !isValidForm() ? errorFieldRequiredShow : errorFieldRequiredHide}
                        >
                            <p>This field is required</p>
                        </div>

                        <label className="add-warehouse__label" htmlFor="contact_email">Email</label>
                        <input
                            className={`add-warehouse__input ${
                            !contact_email ? "add-warehouse__input--error" : ""
                            }`}
                            type="text"
                            name="contact_email"
                            id="contact_email"
                            placeholder="Email"
                            onChange={handleOnChange}
                        ></input>

                        {/* Error state field required */}
                        <div
                            className="add-warehouse__error-message"
                            style={!contact_email && !isValidForm() ? errorFieldRequiredShow : errorFieldRequiredHide}
                        >
                            <p>This field is required</p>
                        </div>
                    </div>
                </div>

                {/* Form Buttons */}
                <div className="add-warehouse__buttons">
                    <Button variant="secondary" text="Cancel" onClick={onCancelAddWarehouse} />
                    <Button variant="primary" type="submit" text="+ Add Warehouse" />
                </div>
            </form>
        </div>
    );
};

export default AddNewWarehouse;