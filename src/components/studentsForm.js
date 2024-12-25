import { Button, Input, Radio } from "antd"
import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup";
import TextArea from "antd/es/input/TextArea";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import moment from "moment";
import { Divider } from "antd";
import { studentsAdd, studentsUpdate } from "../reduxStore/reducers";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import toast from "react-hot-toast";

const Students = () => {
    const dispatch = useDispatch()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const location = useLocation()
    console.log("location", location)
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        fname: Yup.string().required("First Name is required").trim().transform(value => value.toLowerCase()),
        lname: Yup.string().required("Last Name is required").trim().transform(value => value.toLowerCase()),
        email: Yup.string().email('Invalid Email').required("Email is required").trim().transform(value => value.toLowerCase()),
        mobNo: Yup.string().required("Mobile Number is required").matches(phoneRegExp, 'Mobile Number is not valid').trim().length(10, "Mobile Number is not valid"),
        paddress: Yup.string().required("Permanent Address is required").trim(),
        dob: Yup.string().required("Date of Birth is required"),

    })


    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();

        // Calculate the difference in years
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // If the current month is before the birth month or the birth date hasn't passed yet in the current year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };


    const handleSubmit = async (values) => {
        if (location?.state?.isEditStudent) {
            const payload = {
                studentId: location?.state?.studentData?.studentId,
                ...values
            }

            dispatch(studentsUpdate(payload))
            toast.success('Details updated!',{
                position:"bottom-right"
            })
            navigate("/")


        } else {
            const studentId = uuidv4();
            const payload = {
                studentId,
                ...values
            }
            // alert()
            dispatch(studentsAdd(payload))
            toast.success('New Student Added!',{
                position:"bottom-right"
            })

            navigate("/")

        }



    }

    const formik = useFormik({
        initialValues: {
            fname: location?.state?.isEditStudent ? location?.state?.studentData?.fname : '',
            lname: location?.state?.isEditStudent ? location?.state?.studentData?.lname : '',
            email: location?.state?.isEditStudent ? location?.state?.studentData?.email : '',
            mobNo: location?.state?.isEditStudent ? location?.state?.studentData?.mobNo : '',
            paddress: location?.state?.isEditStudent ? location?.state?.studentData?.paddress : '',
            gender: location?.state?.isEditStudent ? location?.state?.studentData?.gender : 'Male',
            dob: location?.state?.isEditStudent ? location?.state?.studentData?.dob : ''
        },
        validationSchema,
        onSubmit: handleSubmit
    })




    console.log("Formik values", formik.values)
    console.log("Formik errors", formik.errors)
    console.log("Formik touched", formik.touched)
    const dateFormat = 'YYYY/MM/DD';
    return <React.Fragment>

        <div className="mt-4  d-flex justify-content-center">

            <div className=" shadow  ">
                <div className="text-center  container py-3 bg-success text-light h5">Student Registration Form</div>

                <div className="p-3 pt-0 mt-3">
                    <form onSubmit={formik.handleSubmit}>
                        <div>

                            <div className="my-3 ">
                                <div className="d-md-flex gap-3">
                                    <div>
                                        <label htmlFor="fname" className="mb-1" ><small>
                                            First Name <span className="text-danger">*</span>
                                        </small></label>
                                        <Input placeholder="First Name" type="text" className="" id="fname" name="fname" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fname} />
                                        {formik.touched.fname && formik.errors.fname && (
                                            <div className="text-danger" >
                                                <small>
                                                    {formik.errors.fname}
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="lname" className="mb-1" ><small>
                                            Last Name <span className="text-danger">*</span>
                                        </small></label>
                                        <Input placeholder="Last Name" type="text" className="" id="lname" name="lname" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lname} />
                                        {formik.touched.lname && formik.errors.lname && (
                                            <div className="text-danger text-small" ><small>
                                                {formik.errors.lname}
                                            </small> </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                            <div className="my-3 ">
                                <div className="">
                                    <div>
                                        <label htmlFor="gender" className="mb-1" ><small>
                                            Gender <span className="text-danger">*</span>
                                        </small></label><br />

                                        <Radio.Group id="gender" name="gender" onChange={formik.handleChange} value={formik.values.gender}>
                                            <Radio className="fw-normal" value={"Male"}>Male</Radio>
                                            <Radio className="fw-normal" value={"Female"}>Female</Radio>
                                            <Radio className="fw-normal" value={"Others"}>Others</Radio>
                                        </Radio.Group>

                                        {formik.touched.gender && formik.errors.gender && (
                                            <div className="text-danger" >
                                                <small>
                                                    {formik.errors.gender}
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="my-3 ">
                                <div className="d-md-flex gap-3">
                                    <div className="flex-grow-1">
                                        <label htmlFor="dob" className="mb-1" ><small>
                                            Date of Birth <span className="text-danger">*</span>
                                        </small></label><br />
                                        <DatePicker type="date" placeholder="Date of birth"
                                            maxDate={dayjs(moment(new Date()).format('L'))}
                                            className="w-100" id="dob" name="dob"
                                            //  onChange={formik.handleChange}
                                            onChange={(date, dateString) => {
                                                return formik.setFieldValue('dob', dateString)

                                            }}
                                            onBlur={formik.handleBlur} defaultValue={formik?.values?.dob ? dayjs(formik?.values?.dob, dateFormat) : null} />
                                        {formik.touched.dob && formik.errors.dob && (
                                            <div className="text-danger text-small" >
                                                <small>
                                                    {formik.errors.dob}
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                    <div className=" flex-grow-1">
                                        <label htmlFor="dob" className="mb-1" ><small>
                                            Age(in years) <span className="text-danger">*</span>
                                        </small></label><br />
                                        <Input readOnly disabled placeholder="Age" className="w-100" id="dob" name="dob" value={isNaN(calculateAge(new Date(formik.values.dob))) ? "" : calculateAge(new Date(formik.values.dob))} />

                                    </div>
                                </div>
                            </div>
                            <div className="my-3 ">
                                <div className="">
                                    <div>
                                        <label htmlFor="email" className="mb-1" ><small>
                                            Email <span className="text-danger">*</span>
                                        </small></label>
                                        <Input placeholder="Email Address" type="text" className="" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="text-danger" >
                                                <small>
                                                    {formik.errors.email}
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="my-3 ">
                                <div className="">
                                    <div>
                                        <label htmlFor="mobNo" className="mb-1" ><small>
                                            Mobile <span className="text-danger">*</span>
                                        </small></label>
                                        <Input placeholder="Mobile Number" type="text" className="" id="mobNo" name="mobNo" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobNo} />
                                        {formik.touched.mobNo && formik.errors.mobNo && (
                                            <div className="text-danger" >
                                                <small>
                                                    {formik.errors.mobNo}
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="my-3 ">
                                <div className="">
                                    <div>
                                        <label htmlFor="paddress" className="mb-1" ><small>
                                            Permanent Address <span className="text-danger">*</span>
                                        </small></label>
                                        <TextArea
                                            autoSize={{ minRows: 3, maxRows: 5 }}

                                            placeholder="Permanent Address" className="" id="paddress" name="paddress" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.paddress} />


                                        {formik.touched.paddress && formik.errors.paddress && (
                                            <div className="text-danger" >
                                                <small>
                                                    {formik.errors.paddress}
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="d-flex justify-content-between gap-2 my-3">
                        <button className="btn btn-secondary mx-2 w-25" onClick={()=>{
                            navigate("/")
                        }} >
                                { "Back"}
                            </button>
                            <button className="btn btn-success w-50  " type="submit" >
                                {location?.state?.isEditStudent ? "Update" : "Submit"}
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    </React.Fragment>

}

export default Students