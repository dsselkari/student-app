import React from "react"
import { Button, Input } from 'antd';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {

    const students = useSelector(state => state?.students?.studentsData
    )
    const navigate = useNavigate()

    console.log("students,students", students)

    return <React.Fragment>
        <div className="container">
            <div className="text-center mt-2 mb-2 bg-success text-light py-3">
                <h5>Students Management system</h5>
            </div>
            <div className="container">
                <div className="d-flex justify-content-end " >
                    <div>

                        <Button
                        className="bg-black text-light"
                            onClick={() => {
                                navigate("/students", { state: { isEditStudent: false, studentData: {} } })
                            }}
                        >
                            Add New Student

                        </Button>
                    </div>

                </div>
                <div className="table-responsive mt-3">
                    <table className="table table-striped border">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Mobile</th>
                                <th>Email </th>
                                <th>DOB </th>
                                <th>Address </th>
                                <th>Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => {

                                return <tr>
                                    <td>{index + 1}</td>
                                    <td>{student.fname + " " + student?.lname}</td>
                                    <td>{student?.gender}</td>
                                    <td>{student?.mobNo}</td>
                                    <td>{student?.email}</td>
                                    <td>{student?.dob}</td>
                                    <td>{student?.paddress}</td>
                                    <td><Button
                                        onClick={() => {
                                            navigate("/students", { state: { isEditStudent: true, studentData: student } })
                                        }}
                                    >
                                        Edit
                                    </Button></td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </React.Fragment>

}

export default Dashboard