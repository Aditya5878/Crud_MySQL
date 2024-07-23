import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { adddata, deldata } from "./context/ContextProvider";
import { updatedata } from "./context/ContextProvider";

const Home = () => {


    // const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page



  
  const [searchTerm, setSearchTerm] = useState("");

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata); // Here we are using the adddata context to get the data from the Register.js component

  const { updata, setUPdata } = useContext(updatedata); // Here we are using the updatedata context to get the data from the Edit.js component

  const { dltdata, setDLTdata } = useContext(deldata); // Here we are using the deldata context to get the data from the Home.js component



const getdata = async () => {
    const res = await fetch(`/getusers?searchTerm=${searchTerm}&limit=${itemsPerPage}&page=${currentPage}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
        console.log("Error");
    }
     else {
        setUserdata(data);
        console.log("get data");
    }
};

useEffect(() => {
    getdata();
}, [searchTerm, currentPage]); // Depend on searchTerm to refetch data when it changes

const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
};

  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDLTdata(deletedata);
      getdata();
    }
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              CRUD APP
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search by name..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
          </div>
        </nav>
      </header>

      {udata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{udata.name}</strong> added succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {updata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{updata.name}</strong> updated succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltdata ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{dltdata.name}</strong> deleted succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">
              Add data
            </NavLink>
          </div>

          <table class="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">Username</th>
                <th scope="col">email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.work}</td>
                      <td>{element.mobile}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element.id}`}>
                          {" "}
                          <button className="btn btn-success">
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${element.id}`}>
                          {" "}
                          <button className="btn btn-primary">
                            <CreateIcon />
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(element.id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{textAlign: 'center', marginTop: '80px'}}>
                <button disabled={currentPage === 1} onClick={() => handleChangePage(currentPage - 1)}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={() => handleChangePage(currentPage + 1)}>Next</button>
            </div>
    </>
  );
};

export default Home;
