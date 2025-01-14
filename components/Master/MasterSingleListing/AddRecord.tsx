import { useRouter } from 'next/router';
import React from 'react';

const AddKarigar = ({
  inputValue,
  HandleInputValue,
  error,
  HandleSubmit,
  placeholder,
}: any) => {


  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];

  return (
    <div
      className="tab-pane fade w-75"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div className="container">
        <div className=" m-1">
          <label>{placeholder}</label>
          <span className="text-danger">*</span>
        </div>
        <div className="p-1">
          <input
            type="text"
            className="form-control w-50 border p-1 h-50"
            value={inputValue?.name}
            name='name'
            onChange={(e) => {
              HandleInputValue(e);
            }}
            required
          />
        </div>
        <div>{error && <p className="text-danger">{error}</p>}</div>

        {
          (key === "karigar" || key === "kundanKarigar") && (
            <>
              <div className="m-1">
                <label>Karigar Code</label>
                <span className="text-danger">*</span>
              </div>
              <div className="p-1">
                <input
                  type="text"
                  className="form-control w-50 border p-1 h-50"
                  name="karigar_code"
                  value={inputValue?.karigar_code}
                  onChange={(e: any) => {
                    HandleInputValue(e);
                  }}
                  required
                />
              </div>
              <div>{error && <p className="text-danger">{error}</p>}</div>
            </>
          )
        }
        <div className="d-flex justify-content-start">
          <button
            type="submit"
            className=" btn btn-outline-primary p-0 px-1  mt-2 form-submit-button"
            onClick={HandleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddKarigar;
