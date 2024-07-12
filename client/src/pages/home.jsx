import Dashboard from "../components/Dashboard/dashboard";
import "./home.css";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="con-pills col-auto col-md-4 col-lg-3 min-vh-100 d-flex flex-column justify-content-between">
          <div className="p-2">
            <a
              href=""
              className="d-flex text-decoration-none align-items-center text-black mt-1"
            >
              <span className="fs-4 d-none d-sm-inline">Blackoffer</span>
            </a>
            <ul className="nav nav-pills flex-column mt-4">
              <li className="nav-item py-2 py-sm-0">
                <a href="" className="nav-link text-white" aria-current="page">
                  <i class="bi bi-speedometer"></i>
                  <span className="fs-5 ms-3 d-none d-sm-inline">
                    Dashboard
                  </span>
                </a>
              </li>
              <li className="nav-item  py-2 py-sm-0">
                <a href="" className="nav-link text-white" aria-current="page">
                  <i class="bi bi-sd-card-fill"></i>
                  <span className="fs-5 ms-3 d-none d-sm-inline">Storage</span>
                </a>
              </li>
              <li className="nav-item  py-2 py-sm-0">
                <a href="" className="nav-link text-white" aria-current="page">
                  <i class="bi bi-inbox"></i>
                  <span className="fs-5 ms-3 d-none d-sm-inline">Inbox</span>
                </a>
              </li>
              <li className="nav-item  py-2 py-sm-0">
                <a href="" className="nav-link text-white" aria-current="page">
                  <i class="bi bi-yelp"></i>
                  <span className="fs-5 ms-3 d-none d-sm-inline">Review</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown open p-5">
            <button
              class="btn border-none text-white dropdown-toggle"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle"></i>
              <span className="ms-2">Arjun</span>
            </button>
            <div class="dropdown-menu" aria-labelledby="triggerId">
              <button class="dropdown-item" href="#">
                Settings
              </button>
              <button class="dropdown-item" href="#">
                Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col p-0 flex-grow-1">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
