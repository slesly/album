
const JumpStart = ({ handleSearch }) => {
  return (
      <section className="py-0 container">
      <div className="row py-lg-5 justify-content-between">
        <div className="col-lg-6">
          <h1 className="fw-bold">Products List</h1>
        </div>
        <div className="col-lg-3 col-12">
          <div className="input-group">
            <input type="text" className="form-control border-end-0" onChange={handleSearch} placeholder="Search Product" aria-label="Search Product" />
            <span className="input-group-text bg-white border-start-0 ms-0"><i className="bi bi-search"></i></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JumpStart;