import { FormRow, FormRowSelect } from "./ComponentIndex.js";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState, useMemo } from "react";

// TODO: Implement Optimized Search Features.

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    resetFilters,
  } = useAppContext();
  const handleSearch = (e) => {
    // if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    resetFilters();
  };

  const debounce = () => {
    let timeoutID;

    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };

  const cachedSearch = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <form className="form">
        <h5> Search </h5>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={cachedSearch}
          ></FormRow>

          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />

          <FormRowSelect
            labelText="Type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          {/* <FormRowSelect
            labelText="jobtype"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={jobTypesOptions}
          /> */}
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Reset
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
