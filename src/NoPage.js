import { Button } from "antd"
import React from "react"
const NoPage=()=>{
    return <React.Fragment>
        <div className="container d-flex h-100vh justify-content-center mt-5" >
            <div className="">
            <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <p>Go to Home page <a
      href="/"
      >
      click here
        </a> </p>
            </div>

        </div>

    </React.Fragment>
}

export default NoPage